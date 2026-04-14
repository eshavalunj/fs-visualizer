# <h1><b><i> Memory Allocator OS Visualizer </i><b> </h1>
An interactive,colorful, high-performance web sandbox designed to demystify how operating systems manage data storage on a disk. This tool simulates file system allocation strategies in real-time, providing a visual bridge between abstract OS theory and hardware-level execution.

---

## Overview
The **Memory Allocator OS Visualizer** transforms complex memory management concepts into a tangible experience. Users can "allocate" files to a virtual 300-block disk and witness how different algorithms—**Contiguous**, **Linked**, and **Indexed**—handle space, fragmentation, and retrieval.

### Key Visual Metrics
* **Disk Usage Percentage:** Real-time tracking of filled vs. empty capacity.
* **Fragmentation Analysis:** Separate counters for **Internal Fragmentation** (wasted space within a block) and **External Fragmentation** (isolated free blocks that are too small for new files).
* **Live Operation Logs:** A scrolling system console documenting every micro-decision made by the simulated kernel.

---

## Tech Stack

### 1. Frontend & Logic
* **React 19:** Orchestrates the reactive UI components (HUD panels, file directory, and the disk grid).
* **JavaScript (ES6+):** The engine behind the allocation algorithms. It handles the mathematical logic for *First Fit* and *Worst Fit* contiguous searches, linked-list pointer chains, and indexed block mapping.
* **Vite 8.0+:** Provides a lightning-fast development environment and optimized production builds.

### 2. Visuals & Shaders
* **Three.js & GLSL:** Power the full-screen interactive background. A custom fragment shader calculates sine-wave deformations and neon gradients directly on the GPU for a fluid, high-frame-rate "Vaporwave" aesthetic.
* **CSS3 Glassmorphism:** Uses `backdrop-filter: blur()` and high-contrast neon borders to create a modern, "Heads-Up Display" (HUD) interface that floats over the WebGL canvas.

---

## 📂 Allocation Strategies Simulated

| Strategy | Logic | Visual Representation |
| :--- | :--- | :--- |
| **Contiguous** | Stores files in a single, unbroken line of blocks. | Uses *First Fit* or *Worst Fit* to find holes. High risk of external fragmentation. |
| **Linked** | Each block contains a pointer to the next block. | Scattered blocks connected via a logical chain; eliminates external fragmentation. |
| **Indexed** | A dedicated index block stores all pointers to file data. | A central "Index Node" (marked `IDX`) directs traffic to data blocks across the grid. |

---

## 🔧 OS Maintenance Features
The visualizer includes an **OS Maintenance** suite to demonstrate system optimization:
* **Compact Memory:** A manual trigger that simulates disk defragmentation. It shifts all occupied blocks to the beginning of the disk, merging scattered free space into one large, usable pool to eliminate external fragmentation.

---

## 💻 Development & Deployment

### Local Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
