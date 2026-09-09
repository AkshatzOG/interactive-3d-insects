# INSECTA — Genesis Lab / Void Vipers — V4

Static, single-page Three.js insect field-study experience.

## What's new in V4
- Full-screen preload / buffer screen with real GLB loading progress.
- Draco-compressed local GLBs decoded through `DRACOLoader`.
- Three.js import map for CDN example modules.
- Swipe left/right to change specimens.
- Mouse wheel zoom + pinch zoom on touch devices.
- Orbit camera constrained vertically and by zoom distance to protect the top/bottom composition.
- Real local previous/next specimen renders in small, blurred ghost viewports.
- Three.js animation clips enabled for models that ship with animations (bee, butterfly, cockroach).
- Interactive anatomy scanning: touch/click the 3D insect or use the three anatomy-node buttons to reveal 3 distinct body-part explanations for every specimen.
- Lower holographic illumination, scan sweep, ambient aura and shadow-capable Three.js lighting.
- Scroll-driven parallax/progress treatment while keeping one single-page layout.
- Responsive desktop/tablet/mobile layout and reduced-motion support.

## Run locally
Use VS Code Live Server or any static HTTP server. Do not open `index.html` directly from `file://` because ES modules and local GLBs need HTTP.

Open:
- `index.html` — main experience
- `model-test.html` — GLB/Draco diagnostics

## Render / static hosting
- Build command: none
- Publish directory: project root
- Start command for static hosting: `npx serve .` (or the host's static-site option)
- Internet access is required for the Three.js CDN modules, Google Fonts and Draco decoder CDN. The insect GLBs and laboratory background are local.

## SRS alignment
The supplied SRS describes a responsive static client-side website, modern-browser support, visual hover feedback, high contrast/readability, optimized media rendering, maintainable modular HTML/CSS/JS, and no server/database dependency. This implementation stays frontend-only and adds the requested interactive 3D catalogue behavior on top of that static architecture.
