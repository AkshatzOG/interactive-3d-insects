# INSECTA — Genesis Lab / Void Vipers — V11

Production static/Node build for the interactive 3D insect archive.

## Interaction
- Horizontal swipe / arrows / carousel cards: change specimen.
- Wheel over the viewer / vertical swipe / arrow up-down: research view.
- Drag: rotate camera.
- Ctrl + wheel / pinch: zoom.
- Click a specimen body region: anatomy scan.

## V11 fixes
- Three.js animation pipeline now filters invalid animation tracks so malformed clips cannot block the whole scene.
- Added a floating 3D specimen pedestal rig: model and pedestal are parented together and therefore move/zoom/rotate as one display unit.
- Pedestal carries a Void Vipers logo decal, metal top, accent rings, contact glow and contact shadow.
- Rebalanced hierarchy so the current specimen information sits above the carousel and the carousel is fully anchored to the bottom edge.
- Improved readability of low-contrast bottom/technical text.
- Main fonts are Montserrat/Roboto; minor technical labels use IBM Plex Mono.
- Logo is preloaded before the first rig is built.

## Run
`npm start` or `node server.js`
