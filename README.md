# INSECTA — Genesis Lab / Void Vipers

V15 stability and UX build. Static Three.js insect archive served by `server.js`.

## Run

```bash
npm start
```

Open `http://localhost:10000/`.

## Interaction

- Drag the specimen to rotate. Vertical rotation is intentionally constrained for a stable specimen-view UX.
- Mouse wheel controls normal zoom.
- Vertical touch swipe cycles Research Views 01–04.
- Horizontal touch swipe changes specimen.
- Click/tap the specimen to open anatomy details.
- Click the top-right Research View control to cycle 01 / 04 → 02 / 04 → 03 / 04 → 04 / 04 → 01 / 04.
- Click a specimen card to switch directly. The circular roster loops continuously across all eight insects.

## Assets

Eight local Draco-compressed GLB models are stored in `models/`. The supplied laboratory background, favicon and lightweight specimen-card images are in `assets/`.

## Notes

The active specimen and floating pedestal are one Three.js rig, so they move together during rotation, zoom and research transitions. Models are normalized to remain visually contained on the display disk while occupying the central viewport.


V15.2 fixes the render-loop state by declaring the research camera tween state before animation begins, preventing the animation loop from terminating before the first frame.
