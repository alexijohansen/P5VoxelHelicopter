# A vibe coded Voxel Helicopter Simulator using P5.js

Todo: Solve the site loading issue and break this up into seperate classes.

A high-performance, retro-style voxel landscape flight simulator modeled after the classic *Comanche* engine.

## How to Run

1.  Open **`index.html`** in any modern web browser (Safari, Chrome, Firefox).
2.  **No local server is required.** You can simply double-click the file to run it.

## The "Standalone" Method (CORS Bypass)

In modern browsers, "local file" security (CORS) normally prevents JavaScript from loading images directly from your folders unless you are running a local web server. 

To bypass this restriction, this project uses a **bundled approach** in `main.js`:
- The map images (`C1W.png` and `D1.png`) have been converted into **Base64** strings.
- These strings are embedded directly inside `main.js`.
- This means the code doesn't have to "fetch" the images from your drive; they are already part of the script's memory. This ensures the simulator works instantly on any machine without setup.

## Flight Deck Tuning

You can customize the flight dynamics to your liking:
- Click the **Gear Icon** ⚙️ in the top-right corner to open the tuning menu.
- Adjust **Turn Sensitivity**, **Banking (Roll)**, **Tilt (Pitch)**, and **Acceleration**.
- Settings are automatically saved to your browser's persistent storage (`localStorage`) and will be remembered the next time you fly.

## Controls

-   **W / Up Arrow**: Accelerate Forward (Tilt Down)
-   **S / Down Arrow**: Brake / Move Backward (Tilt Up)
-   **A / Left Arrow**: Turn Left (Bank Left)
-   **D / Right Arrow**: Turn Right (Bank Right)
-   **Space**: Increase Altitude
-   **Shift**: Decrease Altitude
-   **Settings Icon**: Open Flight Deck Tuning

## Project Files

-   **`index.html`**: The UI and entry point.
-   **`main.js`**: The consolidated engine, physics, and embedded map data.
-   **`p5.min.js`**: The p5.js library.
-   **`maps/`**: Original game assets used for the initial build.

## Technical Details

-   **Engine**: Front-to-back raycasting (Voxel Space algorithm).
-   **Rendering**: Optimized with typed arrays and a low-resolution offscreen buffer for a authentic retro feel.
-   **Smooth Physics**: Inertia and damping applied to all flight movements.
