# INSECTA — Genesis Lab / Void Vipers

V12 production build. Static frontend with Three.js + Draco, plus a small Node server for Render.

## Run
`npm start` then open http://localhost:10000

## Interactions
- Wheel / vertical swipe: four research views (whole specimen -> head -> core body -> wings)
- Horizontal swipe / cards / arrows: switch insect in circular carousel
- Drag: rotate
- Pinch / Ctrl+wheel: zoom
- Click a model area: anatomy scan

The primary model and adjacent specimens are decoded during the startup screen; remaining models preload in the background.
