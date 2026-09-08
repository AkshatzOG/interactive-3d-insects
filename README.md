# INSECTA — Genesis Lab / Void Vipers

Interactive frontend-only 3D insect gallery built around the supplied GLB models.

## What is included

- `index.html` — static entry point
- `styles.css` — glassmorphism / hologram visual system
- `app.js` — Three.js scene, model loading, interactions and UI state
- `models/*.glb` — the 8 supplied insect models

## Run locally

Serve the folder through any local static server:

```bash
cd insects_website
python -m http.server 5500
```

Then open:

`http://localhost:5500`

You can also use the VS Code Live Server extension.

## Deployment

This is a static site. Upload the whole folder as-is to a static host such as GitHub Pages, Netlify, Vercel static hosting, Cloudflare Pages, or your team's preferred deployment target.

No backend is required.

## Performance decision

The first specimen is `butterfly.glb` (~2.2 MB), so the page requests only that model at startup. The remaining specimens are lazy-loaded and cached as the user navigates.

The supplied mosquito asset is ~86.6 MB, so it is **not** downloaded during first paint. This is deliberate: loading all eight GLBs simultaneously would make the initial experience slow regardless of UI optimisation.

After the first interactive frame, the app schedules the previous and next specimens for background preload. This means normal adjacent navigation becomes effectively instant after the initial screen is visible.

## Interaction model

- Drag / orbit: rotate the active specimen
- Scroll: zoom
- Click a model or the scan pill: open a live anatomy / specimen detail card
- Left / right arrows or keyboard arrows: change specimen
- `EXPAND +`: reveal biological details
- `AUTO ROTATE`: toggle presentation rotation
- `RESET VIEW`: restore camera framing

## Notes for the deployment team

Keep the `models` directory beside `index.html`. Do not flatten or rename the GLB files unless the paths in `app.js` are updated too.

Three.js is loaded from jsDelivr. If the deployment environment requires fully offline / air-gapped assets, pin and vendor the exact Three.js files into a local `vendor/` directory and change the imports in `index.html`.

## Recommended next iteration

The biggest remaining performance win is optimising `mosquito_3d_model_free.glb` with geometry simplification and/or Draco/Meshopt compression. The current lazy-loader prevents that large asset from affecting the first render.
