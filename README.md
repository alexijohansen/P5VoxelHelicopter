# A vibe coded Voxel Helicopter Simulator using P5.js

Todo: 
* [ ] A mini map, showing where the chopper is
* [ ] Clouds & atmospheric fog
* [ ] Configurable view distance (height dependent)
* [ ] Configurable Field of View (FOV)
* [ ] Refactor engine into separate, cleaner classes

A high-performance, retro-style voxel landscape flight simulator modeled after the classic *Comanche* engine. Now featuring a **fully responsive** rendering pipeline that adaptively scales to any window size.

## How to Run

1.  Open **`index.html`** in any modern web browser (Safari, Chrome, Firefox).
2.  **No local server is required.** You can simply double-click the file to run it.

## The "Standalone" Method (CORS Bypass)

In modern browsers, "local file" security (CORS) normally prevents JavaScript from loading images directly from your folders unless you are running a local web server (like the Python server we used previously).

To bypass this restriction, this project uses a **bundled approach** in `main.js`:
- The map images (`C1W.png` and `D1.png`) are converted into **Base64** text strings.
- These strings are embedded directly inside `main.js`.
- This means the code has everything it needs to run inside a single script. No external file fetching is required, so the security check is never triggered.

## Flight Deck Tuning

Click the **Gear Icon** ⚙️ in the top-right corner to open the tuning menu:
- **Turn Sensitivity**: Adjusts how quickly you rotate.
- **Banking (Roll)**: Sets the intensity of the sideways tilt during turns.
- **Tilt (Pitch)**: Sets how much the nose dives/pulls up during movement.
- **Acceleration**: Sets the engine power.

**Persistence**: Your settings are saved to your browser's `localStorage` and will be remembered every time you return.

## Controls & Physics

-   **W**: Increase Altitude (Ascend)
-   **S**: Decrease Altitude (Descend)
-   **Up Arrow**: Accelerate Forward (Nose tilts Down)
-   **Down Arrow**: Brake / Move Backward (Nose tilts Up)
-   **Left Arrow**: Turn Left (Banks Left)
-   **Right Arrow**: Turn Right (Banks Right)

### High-Fidelity Physics & Graphics
- **Frame-Rate Independence**: Uses `deltaTime` for consistent handling regardless of hardware speed.
- **Responsive Aspect Ratio**: The engine dynamically recalculates its internal resolution to match your window shape. No black bars, no stretching, and an expanded field of view on larger screens.
- **Voxel Engine**: A front-to-back raycasting algorithm optimized for web browsers.

## Project Files

-   **`index.html`**: The UI, Glassmorphism HUD, and entry point.
-   **`main.js`**: The consolidated engine, time-based physics, and embedded map data.
-   **`p5.min.js`**: The p5.js library.
-   **`maps/`**: Original game assets (for reference).

## Technical Details

-   **Engine**: Front-to-back raycasting (Voxel Space algorithm).
-   **Smoothing**: Uses Linear Interpolation (`lerp`) for organic, flowing movement.
-   **Rendering**: Optimized with typed arrays and a low-resolution offscreen buffer for an authentic retro feel.
