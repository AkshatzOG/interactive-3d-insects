# INSECTA — Genesis Lab / Void Vipers

V9 solo-project build: a static client-side Three.js specimen archive with an optional Node HTTP server for deployment.

## Run locally

### Live Server
Open the project folder in VS Code and launch `index.html` with Live Server.

### Node server
```bash
node server.js
```
Then open `http://localhost:10000/`.

The server adds long-lived immutable caching for GLB/image assets, HTTP range support, and Brotli/Gzip compression for text assets.

## Render
Create a **Web Service** using the repository root.

- Runtime: Node
- Start command: `node server.js`
- No build command is required.

## Main interactions

- Horizontal swipe / arrow controls / specimen cards: switch insect.
- Vertical wheel / swipe / arrow keys: move between three research views.
- Drag: rotate the current 3D specimen.
- Pinch or Ctrl + wheel: zoom.
- Click a model region: anatomy detail scan.
- Auto Rotate and Sound are optional controls.

## Performance strategy

Only the first specimen plus its immediate neighbours are required before the loading screen ends. Additional models are prefetched through the browser cache after the experience becomes interactive. The GLBs stay local; Three.js and the Draco decoder are loaded from CDN.

## Project layout

```text
index.html
app.js
styles.css
server.js
package.json
assets/
  lab-background.png
  logo.png
  cards/*.jpg
models/
  ant.glb
  bee.glb
  butterfly.glb
  cockroach.glb
  dragonfly.glb
  housefly.glb
  ladybug.glb
  mosquito_3d_model_free.glb
```
