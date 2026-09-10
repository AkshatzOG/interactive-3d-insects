# INSECTA — Genesis Lab / Void Vipers — V8

Clean interaction/presentation pass based on the coordinator review.

## V7 priorities
- Primary GLB begins loading while the preload screen is visible; adjacent specimens are also preloaded before reveal.
- Remaining catalogue models continue decoding in the background after first paint.
- Clean single-layout composition: specimen, anatomy/detail text, minimal controls; side rails are hidden from the production composition.
- Three.js lighting is tuned for the dark supplied laboratory background using ACES tone mapping, stronger key/fill/rim lighting and shadow support.
- Scroll is an intentional interaction: wheel over the viewer advances research layers 01/03 → 02/03 → 03/03 with camera and UI transitions. Ctrl+wheel remains 3D zoom.
- Vertical touch swipe changes research layer; horizontal swipe changes specimen.
- Pinch and OrbitControls remain available for 3D zoom/rotation.
- Research phase transitions animate the camera, specimen presentation and information panel instead of creating a fake document scrollbar.
- Anatomy interaction remains tolerant to model rotation/zoom, with mesh, local-space and screen-region fallbacks plus explicit anatomy chips.
- Bee colour material is forced through a modern PBR material using the embedded albedo map with sRGB color space.
- Butterfly, Bee and Cockroach use their supplied GLTF animations where present. Dragonfly and House Fly use restrained procedural wing motion when separate wing nodes are available.
- Mobile uses `100dvh`, fixed single-screen composition and reduced renderer DPR to avoid mobile-only layout/loading failures.
- WebGL errors/context loss are handled without trapping the UI behind the preloader.

## Run
Use VS Code Live Server or any static HTTP server. Do not open with `file://`.

## Controls
- Drag: rotate specimen
- Ctrl + wheel: zoom
- Pinch: zoom
- Wheel over viewer: research layer
- Horizontal swipe: previous/next specimen
- Vertical swipe: research layer
- Anatomy chips or specimen tap: anatomy scan
- Auto Rotate / Reset View: camera controls

## Deployment
Static client-side site. Models are local GLBs. Three.js and Draco decoder are loaded from jsDelivr, so deployment requires CDN access.
