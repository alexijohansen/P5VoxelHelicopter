/**
 * Voxel Helicopter Simulator - Consolidated Build
 * This version bundles all classes into a single file to eliminate loading issues.
 */

// --- CLASSES ---

class VoxelMap {
  constructor() {
    this.width = 1024;
    this.height = 1024;
    this.heightData = null;
    this.colorData = null;
    this.isLoaded = false;
  }

  init(colorImg, depthImg) {
    try {
      if (!colorImg || !depthImg) throw new Error("Images not loaded");
      colorImg.loadPixels();
      depthImg.loadPixels();

      this.heightData = new Uint8Array(this.width * this.height);
      for (let i = 0; i < this.width * this.height; i++) {
        this.heightData[i] = depthImg.pixels[i * 4];
      }

      this.colorData = new Uint32Array(this.width * this.height);
      for (let i = 0; i < this.width * this.height; i++) {
        const r = colorImg.pixels[i * 4];
        const g = colorImg.pixels[i * 4 + 1];
        const b = colorImg.pixels[i * 4 + 2];
        this.colorData[i] = (r << 16) | (g << 8) | b;
      }
      this.isLoaded = true;
      console.log("Map initialized.");
    } catch (e) {
      console.error("Map initialization failed:", e);
      document.getElementById('error-log').innerText = "Map Error: " + e.message;
    }
  }

  getHeight(x, y) {
    const ix = (Math.floor(x) % this.width + this.width) % this.width;
    const iy = (Math.floor(y) % this.height + this.height) % this.height;
    return this.heightData[iy * this.width + ix];
  }

  getColor(x, y) {
    const ix = (Math.floor(x) % this.width + this.width) % this.width;
    const iy = (Math.floor(y) % this.height + this.height) % this.height;
    return this.colorData[iy * this.width + ix];
  }
}

class Camera {
  constructor() {
    this.x = 800;
    this.y = 800;
    this.height = 120;
    this.angle = 0;
    this.horizon = 120;
    this.roll = 0;
    this.velocity = { x: 0, y: 0, h: 0, a: 0 };
    this.friction = 0.94;
    this.accel = 0.5;
    this.targetHorizon = 120;
    this.targetRoll = 0;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.height += this.velocity.h;
    this.angle += this.velocity.a;
    if (this.height < 5) this.height = 5;
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.h *= this.friction;
    this.velocity.a *= this.friction;
    this.horizon = lerp(this.horizon, this.targetHorizon, 0.1);
    this.roll = lerp(this.roll, this.targetRoll, 0.1);
    this.targetHorizon = 120;
    this.targetRoll = 0;
  }

  moveForward(amount) {
    this.velocity.x += Math.cos(this.angle) * amount * this.accel;
    this.velocity.y += Math.sin(this.angle) * amount * this.accel;
    this.targetHorizon = 120 + (amount * 45);
  }

  turn(amount) {
    this.velocity.a += amount * 0.04;
    this.targetRoll = amount * 35;
  }

  changeHeight(amount) {
    this.velocity.h += amount * 0.6;
  }
}

class Renderer {
  constructor(sw, sh) {
    this.width = sw;
    this.height = sh;
    this.buffer = createGraphics(this.width, this.height);
    this.buffer.pixelDensity(1);
    this.viewDistance = 600;
    this.scaleHeight = 120;
  }

  render(camera, map) {
    if (!map.isLoaded) return;
    this.buffer.loadPixels();
    const pixels = this.buffer.pixels;
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = 20; pixels[i+1] = 40; pixels[i+2] = 80; pixels[i+3] = 255;
    }
    const yBuffer = new Int32Array(this.width).fill(this.height);
    const cosP = Math.cos(camera.angle);
    const sinP = Math.sin(camera.angle);
    let dz = 1.0;
    for (let z = 1; z < this.viewDistance; z += dz) {
      dz += 0.005;
      const pLeftX = (cosP + sinP) * z;
      const pLeftY = (sinP - cosP) * z;
      const pRightX = (cosP - sinP) * z;
      const pRightY = (sinP + cosP) * z;
      const dx = (pRightX - pLeftX) / this.width;
      const dy = (pRightY - pLeftY) / this.width;
      let mapX = camera.x + pLeftX;
      let mapY = camera.y + pLeftY;
      for (let x = 0; x < this.width; x++) {
        const heightSample = map.getHeight(mapX, mapY);
        const rollOffset = (x - this.width / 2) * camera.roll * 0.01;
        const horizon = camera.horizon + rollOffset;
        let screenY = ((camera.height - heightSample) / z * this.scaleHeight + horizon) | 0;
        if (screenY < 0) screenY = 0;
        if (screenY > this.height) screenY = this.height;
        if (screenY < yBuffer[x]) {
          const color = map.getColor(mapX, mapY);
          const fog = Math.max(0, 1.0 - z / this.viewDistance);
          const r = ((color >> 16) & 0xFF) * fog;
          const g = ((color >> 8) & 0xFF) * fog;
          const b = (color & 0xFF) * fog;
          for (let y = screenY; y < yBuffer[x]; y++) {
            const idx = (y * this.width + x) * 4;
            pixels[idx] = r; pixels[idx+1] = g; pixels[idx+2] = b; pixels[idx+3] = 255;
          }
          yBuffer[x] = screenY;
        }
        mapX += dx; mapY += dy;
      }
    }
    this.buffer.updatePixels();
  }

  display() {
    image(this.buffer, 0, 0, width, height);
  }
}

// --- MAIN SKETCH ---

let voxelMap, camera, renderer, imgColor, imgDepth;

function preload() {
  console.log("Preloading...");
  imgColor = loadImage('maps/C1W.png', 
    () => console.log("Color loaded"), 
    (e) => { console.error("Color fail", e); document.getElementById('error-log').innerText += " Color Load Failed."; }
  );
  imgDepth = loadImage('maps/D1.png', 
    () => console.log("Depth loaded"), 
    (e) => { console.error("Depth fail", e); document.getElementById('error-log').innerText += " Depth Load Failed."; }
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  voxelMap = new VoxelMap();
  voxelMap.init(imgColor, imgDepth);
  camera = new Camera();
  renderer = new Renderer(400, 240);
  noSmooth();
  document.getElementById('status').innerText = "STATUS: RUNNING";
}

function draw() {
  background(0);
  handleInput();
  camera.update();
  if (voxelMap.isLoaded) {
    const th = voxelMap.getHeight(camera.x, camera.y);
    if (camera.height < th + 15) camera.height = th + 15;
  }
  renderer.render(camera, voxelMap);
  renderer.display();
  updateUI();
}

function handleInput() {
  if (keyIsDown(87) || keyIsDown(UP_ARROW)) camera.moveForward(1);
  else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) camera.moveForward(-1);
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) camera.turn(-1);
  else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) camera.turn(1);
  if (keyIsDown(32)) camera.changeHeight(1);
  else if (keyIsDown(16)) camera.changeHeight(-1);
}

function updateUI() {
  const fpsEl = document.getElementById('fps');
  const posEl = document.getElementById('pos');
  if (fpsEl) fpsEl.innerText = `FPS: ${Math.round(frameRate())}`;
  if (posEl) posEl.innerText = `POS: X:${Math.round(camera.x)} Y:${Math.round(camera.y)} H:${Math.round(camera.height)}`;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
