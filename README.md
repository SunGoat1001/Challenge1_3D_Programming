# Racing Game Project Documentation

## Overview

This is a 3D racing game built with React Three Fiber (R3F), featuring physics-based vehicle dynamics, realistic lighting, and interactive gameplay. The game uses WebGL for rendering and includes collision detection, audio feedback, and checkpoint-based progression.

---

## Demo Video

<video width="100%" controls>
  <source src="demo/Challenge1.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

## Setup Steps

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory:**

   ```bash
   cd "challenge1"
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or the URL shown in your terminal)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

Runs ESLint to check code quality and style violations.

---

## Game Controls

### Movement

- **W** - Accelerate forward
- **S** - Accelerate backward (reverse)
- **A** - Steer left
- **D** - Steer right

### Camera Controls

- **Q** - Look left
- **E** - Look right

### Vehicle Physics

- **Arrow Up** - Flip forward
- **Arrow Down** - Flip backward
- **Arrow Left** - Flip left
- **Arrow Right** - Flip right

---

## Libraries & Technologies

### Core Frameworks

- **React** (v19.2.0) - UI library and component framework
- **React DOM** (v19.2.0) - React rendering for web
- **Three.js** (v0.182.0) - 3D graphics engine and WebGL renderer

### React Three Ecosystem

- **React Three Fiber** (r3f) (v9.4.2) - React renderer for Three.js
  - Declarative 3D rendering
  - Hooks-based component system
  - Integration with React ecosystem
- **React Three Drei** (v10.7.7) - Useful helpers and pre-built components for R3F
  - Includes utilities for scene setup, camera controls, and more
- **React Three Cannon** (v6.6.0) - Physics engine integration
  - Cannon.js physics wrapper for R3F
  - Rigid body dynamics, collisions, and constraints
  - Vehicle dynamics and wheel physics

### State Management

- **Zustand** (v5.0.9) - Lightweight state management library
  - Stores game state (score, checkpoints, game status, etc.)
  - Minimal boilerplate, simple API

### Build Tools

- **Vite** (v7.2.4) - Lightning-fast build tool and dev server
  - Near-instant module hot reload (HMR)
  - Optimized production builds
- **@vitejs/plugin-react** (v5.1.1) - Vite plugin for React with Fast Refresh

### Development Tools

- **ESLint** (v9.39.1) - Code linting and quality assurance
- **TypeScript Types** - @types/react, @types/react-dom, @types/three for type safety

---

## Project Structure

```
src/
├── main.jsx                 # Application entry point, Canvas setup
├── index.css               # Global styles
├── Scene.jsx               # Main 3D scene composition
├── Car.jsx                 # Vehicle model and physics
├── CarAudio.jsx            # Audio system integration
├── Ground.jsx              # Terrain/ground plane
├── Track.jsx               # Racing track definition
├── Checkpoint.jsx          # Checkpoint system for race progression
├── ColliderBox.jsx         # Box collision primitives
├── ColliberSphere.jsx      # Sphere collision primitives
├── HUD.jsx                 # Head-up display, UI overlay
├── WheelDebug.jsx          # Debug visualization for wheels
├── useControls.jsx         # Keyboard input handling hook
├── useWheels.jsx           # Wheel physics hook
└── store.js                # Zustand global state management

public/
├── models/                 # 3D model assets (.glb/.gltf)
├── sounds/                 # Audio files (engine, effects)
└── textures/
    └── envmap.hdr          # HDR environment map for realistic lighting

vite.config.js             # Vite configuration
eslint.config.js           # ESLint configuration
package.json               # Project dependencies and scripts
```

---

## Key Features

### Physics Simulation

- Realistic vehicle dynamics with engine force and steering
- Four-wheel suspension system with individual wheel control
- Collision detection and response using Cannon.js
- Gravity simulation and physics constraints

### Visual Rendering

- 3D scene with Three.js WebGL rendering
- HDR environment mapping for realistic lighting
- Dynamic shadows and lighting
- Real-time rendering at 60 FPS

### Audio System

- Engine sound effects
- Dynamic audio feedback based on vehicle state
- Integrated with game physics

### Game Mechanics

- Checkpoint system for race progression
- HUD display for game information
- Game state management (score, completion status)
- Smooth camera controls for cinematic views

### Input Handling

- Responsive keyboard controls
- Real-time input processing
- Support for simultaneous key presses

---

## Assets

### Models

Located in `public/models/`:

- Car/vehicle 3D models (GLTF/GLB format)
- Track and environmental models

### Sounds

Located in `public/sounds/`:

- Engine sounds and effects
- Game audio tracks

### Textures

Located in `public/textures/`:

- `envmap.hdr` - High Dynamic Range environment map for realistic scene lighting

---

## Development Notes

### Hot Module Replacement (HMR)

The development server supports instant updates when you modify source files. Changes are reflected in the browser without full page reload.

### Physics Debug Mode

Uncomment the `<Debug>` component in `main.jsx` to visualize physics bodies and colliders for debugging purposes.

### State Management

The Zustand store in `store.js` manages:

- Game progress and checkpoints
- Race timing
- Game completion status

---

## Performance Optimization

- Vite provides optimized chunking and code splitting
- Three.js canvas rendering is GPU-accelerated
- Physics simulation runs efficiently with Cannon.js
- Fast Refresh ensures minimal rebuild times during development

---

## Browser Support

Requires a modern browser with WebGL support:

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14.1+
- Edge 90+

---

## Troubleshooting

**Issue: Game doesn't start**

- Clear browser cache
- Restart dev server: `npm run dev`
- Check browser console for errors

**Issue: Low performance**

- Disable debug visualization if enabled
- Check GPU driver is up to date
- Close other GPU-intensive applications

**Issue: Audio not playing**

- Check browser audio settings
- Verify audio files in `public/sounds/` exist
- Check browser console for audio-related errors

---

## Next Steps

- Add more advanced physics features (drifting, traction control)
- Implement leaderboard system
- Add more game modes and tracks
- Enhance visual effects and graphics quality
- Mobile controls support
