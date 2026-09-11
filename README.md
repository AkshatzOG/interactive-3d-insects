# INSECTA — Genesis Lab / Void Vipers

An interactive 3D insect specimen archive built as a client-side web experience with **Three.js**. The project presents eight locally hosted insect models inside a cinematic digital laboratory, combining 3D specimen inspection, research-view transitions, anatomy interaction, a looping specimen carousel, responsive touch gestures, and optimized asset delivery.

## Features

- Interactive 3D insect specimens rendered with Three.js.
- Eight local Draco-compressed GLB models.
- Floating specimen pedestal with integrated lighting, shadow, and Void Vipers branding.
- Continuous circular specimen-card carousel.
- Click/tap specimen selection and previous/next navigation.
- Four research views:
  1. Whole Specimen
  2. Head / Sensory System
  3. Core Body / Locomotion
  4. Wings / Flight Surface
- Vertical touch/swipe navigation between research views.
- Horizontal swipe navigation between specimens.
- Constrained camera rotation and zoom for a stable viewing experience.
- Interactive anatomy details based on specimen regions.
- Per-specimen biological information and expandable details.
- Living specimen motion using available GLTF animation data and procedural motion where appropriate.
- Responsive layout for desktop and mobile browsers.
- Loading/preloading sequence for the primary and adjacent specimens.
- Node.js static server with byte-range support and asset caching.
- Custom favicon and laboratory background.
- Google-hosted Montserrat, Roboto, and IBM Plex Mono typography.

## Specimens

The archive currently contains:

1. Butterfly
2. Honey Bee
3. Ant
4. Dragonfly
5. Ladybird
6. House Fly
7. Cockroach
8. Mosquito

## Technology Stack

- **HTML5**
- **CSS3**
- **JavaScript (ES Modules)**
- **Three.js**
- **GLTFLoader**
- **DRACOLoader**
- **Node.js** static server
- Local **GLB**, **JPG**, and **PNG** assets

Three.js and its example loaders are loaded from jsDelivr, while specimen models and visual assets are served locally.

## Project Structure

```text
INSECTA/
├── index.html
├── app.js
├── styles.css
├── server.js
├── package.json
├── README.md
├── LICENSE.md
├── assets/
│   ├── favicon.jpg
│   ├── logo.png
│   ├── lab-background.png
│   └── cards/
│       ├── ant.jpg
│       ├── bee.jpg
│       ├── butterfly.jpg
│       ├── cockroach.jpg
│       ├── dragonfly.jpg
│       ├── housefly.jpg
│       ├── ladybug.jpg
│       └── mosquito.jpg
└── models/
    ├── ant.glb
    ├── bee.glb
    ├── butterfly.glb
    ├── cockroach.glb
    ├── dragonfly.glb
    ├── housefly.glb
    ├── ladybug.glb
    └── mosquito_3d_model_free.glb
```

## Local Development

### Requirements

- Node.js 18 or newer
- A modern browser with WebGL support
- Internet access for the Three.js modules, Draco decoder, and Google Fonts

### Run

```bash
npm install
npm start
```

The server runs on:

```text
http://localhost:10000
```

The application can also be served by another local static development server, provided the project is accessed over HTTP(S) rather than `file://`.

## Interaction Guide

### Desktop

- **Drag** the specimen to rotate.
- **Mouse wheel** to zoom.
- **Left / right arrows** or specimen cards to change insects.
- **Research View** button to cycle through views 01–04.
- **Click the specimen** to inspect anatomy.
- **Auto Rotate**, **Reset View**, and **Sound** controls are available in the interface.

### Mobile / Touch

- **Horizontal swipe** to change specimens.
- **Vertical swipe** to cycle research views.
- **Pinch / touch controls** are supported where available.
- Tap the specimen or a specimen card to interact.

## Performance

The project is designed to keep the experience responsive despite the use of 3D assets:

- Primary and adjacent models are preloaded during the startup sequence.
- Remaining models are loaded in the background.
- GLB files are served locally.
- The server supports HTTP byte ranges for model delivery.
- Static visual assets use long-lived caching.
- The carousel uses lightweight image cards rather than eight simultaneous 3D renderers.
- Mobile rendering can use a reduced device-pixel ratio to limit GPU workload.

Actual loading and frame rate depend on the user's device, network, browser, and WebGL implementation.

## Deployment

The project can be deployed to a Node-compatible hosting service such as Render.

Use the following start command:

```bash
npm start
```

which runs:

```bash
node server.js
```

The service listens on the port supplied by the hosting platform through the `PORT` environment variable, with `10000` used as the local default.

## Browser Support

The application targets modern versions of:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Apple Safari

A WebGL-capable browser is required for the 3D specimen viewer.

## Asset and Licensing Notice

The application source code and the bundled visual/model assets should be treated separately for licensing purposes.

- **Original project source code** is licensed under the terms in [`LICENSE.md`](./LICENSE.md).
- **Three.js** is distributed under the MIT License.
- Google Fonts used by the site are subject to their respective font licenses.
- The insect GLB models, specimen card images, favicon, logo, and laboratory background may have been obtained from third-party sources or supplied separately. Their original licenses and usage terms remain applicable and are **not replaced by this project's license**.

Before redistributing any third-party asset outside this project, verify the original creator's license and attribution requirements.

## Project Status

This is a static interactive 3D web project created as a college web-development showcase and portfolio project.

The application does not require authentication, a database, or server-side application logic beyond static asset delivery.
