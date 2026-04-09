# Voxel Helicopter Simulator (Comanche p5.js)

A high-performance Voxel Space rendering engine built with p5.js, inspired by the classic 1992 simulator *Comanche*. This project recreates the iconic "ray-cast" landscape aesthetic using modern web technologies.

## 🚀 How to Run

There are two ways to run this project depending on your environment:

### Method 1: Standalone (Recommended for Mac)
Just double-click **`index.html`** or right-click it and select **Open with Safari**.
- **No server required.**
- This version uses `standalone_sketch.js`, which has the map images embedded directly in the code to bypass browser security restrictions (CORS).

### Method 2: Local Server (For Development)
If you want to use the standard file-loading method:
1. Double-click the **`launch_simulator.command`** file.
2. It will automatically start a Python server and open Safari to `http://127.0.0.1:8888`.

---

## 🎮 Controls

| Key | Action |
| --- | --- |
| **W / Up Arrow** | Accelerate Forward (Nose tilts down) |
| **S / Down Arrow** | Accelerate Backward (Nose tilts up) |
| **A / Left Arrow** | Turn Left (Helicopter banks left) |
| **D / Right Arrow** | Turn Right (Helicopter banks right) |
| **Space** | Increase Altitude |
| **Shift** | Decrease Altitude |

---

## 🛠 Features

- **Voxel Space Engine**: A front-to-back raycasting algorithm optimized for 60fps performance.
- **Variable Level of Detail (LOD)**: Step sizes increase with distance to maintain high framerates while allowing large view distances.
- **Helicopter Physics**: Implements inertia and damping for a smooth "floating" feel. The world banks and tilts dynamically based on your movement.
- **Retro Aesthetic**: Renders at an internal resolution of 400x240 and scales up with pixelated interpolation for an authentic 90s feel.
- **Optimized Sampling**: Map data is converted into typed arrays (`Uint32Array` for colors, `Uint8Array` for height) for direct memory access during the render loop.

---

## 📁 File Structure

- **`index.html`**: The UI and entry point for the browser.
- **`sketch.js`**: The main game engine. Bundles the Camera, Map, and Renderer logic.
- **`standalone_sketch.js`**: A specialized version of the engine that contains the map images as Base64 data strings.
- **`launch_simulator.command`**: A macOS shell script to launch the local development environment.
- **`maps/`**: Directory containing the original game maps (Color and Depth/Height pairs).
- **`p5.min.js`**: The p5.js drawing library.

---

## 🖼 Image Loading Methods

### 1. Base64 (Standalone)
In the standalone version, the map images are converted into **Base64 Data URLs**. This means the image data is stored as a long string of text inside the JavaScript file itself. 
- **Advantage**: Bypasses browser CORS security. You can open the file locally without a server.
- **Disadvantage**: Makes the script file much larger (~1.5MB).

### 2. Standard Fetch (Legacy)
The engine originally used the standard `loadImage()` function to fetch PNGs from the `/maps` folder.
- **Advantage**: Cleaner code, smaller script files.
- **Disadvantage**: Modern browsers (Safari, Chrome) block this for security unless you are running a local web server (Method 2).

---

## 📚 Credits
- Based on the "Voxel Space" algorithm popularized by Sebastian Macke.
- Original map assets from *Comanche: Maximum Overkill*.
