
File System Strategy Visualizer: Technology & Architecture Report
This document outlines the languages, software frameworks, build tools, and technical concepts utilized to build the real-time Memory Allocator OS visualizer with the new dynamic neon wave background.

1. Programming Languages
JavaScript (ES6+)
Usage: Serves as the backbone of the entire application. It controls the interactive React DOM updates, manages the memory allocation algorithm simulation logic (Contiguous, Linked, Indexed strategies), and communicates with WebGL APIs.
Key Features Leveraged: Array manipulation hooks (useState, useEffect), Destructuring, Promises, ES Modules (import/export).
GLSL (OpenGL Shading Language)
Usage: Handles the rendering of the dynamic, full-screen background effect (InteractiveWaveShader).
Key Mechanics:
A highly optimized Fragment Shader performs heavy mathematical operations calculating sin, cos, and sine-wave deformations across the screen space pixels on the GPU.
Generates the fluid “neon-tube” vaporwave glow effect by calculating distance vectors vec2 and interpolating between electric hex colors (mix).
CSS3
Usage: Defines the visual layout and responsive grid styling for the HUD (Heads-Up Display) panels, control menus, and animated glowing buttons.
Key Features Leveraged:
CSS Variables (:root) for easy theme building.
backdrop-filter: blur(24px) to achieve modern frosted glassmorphism overlays on the HUD which allows the Three.js GLSL waves to render behind beautifully.
HTML5
Usage: Provide the semantic entrypoint structure containing the <div id="root"></div> wrapper that React injects the application into.
2. Core Frameworks & Libraries
React 19
Role: Front-end framework used to build reusable component architectures and map memory allocation system state directly into DOM visual elements.
Implementation: The UI comprises dynamic layouts like abstract control panels (ControlPanel), reactive file lists (FileList), an actively rendering block-grid disk mapper (DiskVisualizer), and a real-time system logger (OperationLog).
Three.js (v174+)
Role: The 3D/WebGL rendering engine used to draw the abstract wave background.
Implementation: Directly accesses WebGL context via an OrthographicCamera and PlaneGeometry. Binds internal JavaScript state variables (like active/upcoming reminders or dimming options) to the fragment shader globally via uniforms, allowing the high-speed background to shift colors precisely when user actions occur in the DOM.
Vite (v8.0+)
Role: Development server and bundler.
Why it’s used: Provides lightning-fast Hot Module Replacement (HMR) for near-instant rendering during coding sessions, and highly optimized code bundling utilizing Rollup logic under-the-hood to create a lightweight deployment build.
3. Architecture & Application Flow
State Management: The top-level App component holds the master state array representing exactly $300$ uniform blocks in disk memory.
Algorithm Processing: When "Allocate" is clicked, helper functions parse the mathematical simulation to scan for valid byte allocations matching rules for contiguous blocks, linked chains, or pointer-driven linked tables.
Data Passing: Results are broadcast downwards to heavily optimized React sub-components over standard props.
Visual Layering: Uses heavy DOM z-indexing stacking to detach layout positioning. A rigid, low z-index HTML5 hardware-accelerated canvas executes the Three.js shader, allowing all React memory-map controls to float over it dynamically.
4. Deployment Prerequisites
To prepare this stack for Github Pages static deployment:

The Vite builder is configured to output the production index via npm run build.
Static assets are bundled to dist/.
Relative pathway linking is necessary within configuration arguments so Github sub-directory hosting can resolve assets.
