# A vibe coded Voxel Helicopter Simulator using P5.js

A high-performance, retro-style voxel landscape flight simulator modeled after the classic *Comanche* engine.

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

-   **W / Up Arrow**: Accelerate Forward (Nose tilts Down)
-   **S / Down Arrow**: Brake / Backward (Nose tilts Up)
-   **A / Left Arrow**: Turn Left (Bank Left)
-   **D / Right Arrow**: Turn Right (Bank Right)
-   **Space**: Increase Altitude
-   **Shift**: Decrease Altitude

### High-Fidelity Physics
The simulator uses **Frame-Rate Independent Physics** via `deltaTime`. This ensures that the helicopter handles exactly the same regardless of whether your computer is running at 30fps or 144fps. It also prevents the "key-repeat" issues common in simple JS games.

## Project Files

-   **`index.html`**: The UI, Glassmorphism HUD, and entry point.
-   **`main.js`**: The consolidated engine, time-based physics, and embedded map data.
-   **`p5.min.js`**: The p5.js library.
-   **`maps/`**: Original game assets (for reference).

## Technical Details

-   **Engine**: Front-to-back raycasting (Voxel Space algorithm).
-   **Smoothing**: Uses Linear Interpolation (`lerp`) for organic, flowing movement.
-   **Rendering**: Optimized with typed arrays and a low-resolution offscreen buffer for an authentic retro feel.
