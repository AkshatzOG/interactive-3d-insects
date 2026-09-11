# INSECTA — Genesis Lab V14

Final single-page interactive 3D insect archive for Void Vipers / Genesis Lab.

## Run locally

```bash
npm start
```

Open `http://localhost:10000/`.

## Main interactions
- Left/right center arrows or horizontal swipe: change specimen.
- Circular specimen roster: continuous loop; active card renders the real local GLB.
- Top-right Research View button: cycles 01 → 02 → 03 → 04 → 01.
- Mouse wheel / vertical swipe over the stage: move through research views.
- Drag: rotate the specimen and its floating pedestal together.
- Anatomy scan: click a model region in the default view.
- Details+: opens the full specimen information panel.
- Auto Rotate, Reset View and Sound controls are grouped vertically at lower-right.

## Performance
The primary model and immediate neighbours are preloaded before the landing UI is revealed. Remaining GLBs are cached in the background. The circular roster uses lightweight image cards rather than rendering all 8 GLBs simultaneously.

## Deployment
The included `server.js` provides HTTP range support, ETags and long-lived caching for GLB/image assets, plus compression for text assets. Render can use `node server.js` as the start command.
