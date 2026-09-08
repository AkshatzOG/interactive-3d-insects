const DATA = [
  {
    file: "models/butterfly.glb",
    name: "Butterfly",
    scientific: "Danaus plexippus",
    order: "Lepidoptera",
    family: "Nymphalidae",
    range: "Americas / migratory",
    diet: "Nectar",
    size: "8.5–10.5 cm",
    role: "Pollinator",
    life: "2–6 weeks typical adult",
    summary: "A pollinator and migratory species whose wing patterns support camouflage, signalling and thermal regulation.",
    note: "Monarchs are famous for multi-generation migrations across North America.",
    glyph: "◒",
    scan: {
      name: "WING SURFACE",
      text: "Butterfly wings are covered in microscopic scales. Their structure and pigments create colour, pattern and optical effects.",
      metaA: "LEPIDOPTERA",
      metaB: "WING NODE"
    }
  },
  {
    file: "models/bee.glb",
    name: "Honey Bee",
    scientific: "Apis mellifera",
    order: "Hymenoptera",
    family: "Apidae",
    range: "Worldwide",
    diet: "Nectar + pollen",
    size: "9–20 mm",
    role: "Pollinator",
    life: "Weeks to years by caste",
    summary: "A social pollinator living in colonies with distinct queen, worker and drone roles.",
    note: "A worker's daily foraging links a hive to a surprisingly large surrounding landscape.",
    glyph: "✳",
    scan: {
      name: "BODY SCAN",
      text: "The bee's branched hairs trap pollen. Wing beats, antennae and mouthparts coordinate flight, navigation and feeding.",
      metaA: "HYMENOPTERA",
      metaB: "BODY NODE"
    }
  },
  {
    file: "models/ant.glb",
    name: "Ant",
    scientific: "Formica rufa",
    order: "Hymenoptera",
    family: "Formicidae",
    range: "Europe / Asia",
    diet: "Omnivorous",
    size: "4–9 mm",
    role: "Soil engineer",
    life: "Weeks to years by caste",
    summary: "A cooperative colony-builder that influences soil, seed movement and food-web dynamics.",
    note: "Ant colonies function like distributed systems: local chemical signals can create colony-scale behaviour.",
    glyph: "⋮",
    scan: {
      name: "ANTENNA SCAN",
      text: "Ants read much of their environment through antennae, including chemical trails and tactile cues.",
      metaA: "FORMICIDAE",
      metaB: "SENSORY NODE"
    }
  },
  {
    file: "models/dragonfly.glb",
    name: "Dragonfly",
    scientific: "Anax imperator",
    order: "Odonata",
    family: "Aeshnidae",
    range: "Africa / Europe / Asia",
    diet: "Predatory",
    size: "6.6–8.4 cm",
    role: "Aerial predator",
    life: "Months–years aquatic nymph",
    summary: "A visual hunter capable of precise aerial interception, powered by independently controllable wings.",
    note: "Dragonfly nymphs spend much of their lives underwater before emerging as winged adults.",
    glyph: "⟡",
    scan: {
      name: "WING JOINT",
      text: "Four wings can be controlled with fine precision, enabling hovering, abrupt turns and high-speed pursuit.",
      metaA: "ODONATA",
      metaB: "FLIGHT NODE"
    }
  },
  {
    file: "models/ladybug.glb",
    name: "Ladybird",
    scientific: "Coccinella septempunctata",
    order: "Coleoptera",
    family: "Coccinellidae",
    range: "Europe / Asia / introduced",
    diet: "Aphids + small insects",
    size: "5–8 mm",
    role: "Biocontrol predator",
    life: "About 1 year",
    summary: "A small beetle that can suppress aphid populations and serves as a classic biological-control ally.",
    note: "Its bright colouration is a warning signal called aposematism.",
    glyph: "●",
    scan: {
      name: "ELYTRA SCAN",
      text: "The hard forewings form protective covers over delicate flight wings. Their bright colour can signal chemical defence.",
      metaA: "COLEOPTERA",
      metaB: "ELYTRA NODE"
    }
  },
  {
    file: "models/housefly.glb",
    name: "Housefly",
    scientific: "Musca domestica",
    order: "Diptera",
    family: "Muscidae",
    range: "Worldwide",
    diet: "Liquid / decomposing matter",
    size: "6–7 mm",
    role: "Decomposer link",
    life: "15–30 days typical",
    summary: "A fast-cycling decomposer and food-web link whose sensory system is tuned for rapid flight and feeding.",
    note: "A fly's compound eyes provide a broad visual field and excellent motion sensitivity.",
    glyph: "◇",
    scan: {
      name: "EYE SCAN",
      text: "Large compound eyes sample motion across a wide field of view, helping the fly react quickly while airborne.",
      metaA: "DIPTERA",
      metaB: "VISION NODE"
    }
  },
  {
    file: "models/cockroach.glb",
    name: "Cockroach",
    scientific: "Periplaneta americana",
    order: "Blattodea",
    family: "Blattidae",
    range: "Worldwide in warm habitats",
    diet: "Omnivorous",
    size: "34–53 mm",
    role: "Decomposer",
    life: "Several months",
    summary: "An adaptable decomposer with sensory hairs, antennae and a body plan built for rapid movement through tight spaces.",
    note: "Cockroaches contribute to nutrient cycling in many terrestrial ecosystems.",
    glyph: "◈",
    scan: {
      name: "ANTENNA SCAN",
      text: "Long antennae act as sensitive chemical and tactile sensors, sampling the immediate environment continuously.",
      metaA: "BLATTODEA",
      metaB: "SENSORY NODE"
    }
  },
  {
    file: "models/mosquito_3d_model_free.glb",
    name: "Mosquito",
    scientific: "Aedes aegypti",
    order: "Diptera",
    family: "Culicidae",
    range: "Tropical / subtropical",
    diet: "Plant sugars; female blood meals",
    size: "3–6 mm",
    role: "Food-web vector",
    life: "About 2–4 weeks typical",
    summary: "A tiny dipteran with specialised sensory organs and mouthparts. Females can transmit pathogens between hosts.",
    note: "This specimen is intentionally loaded on demand because its source model is substantially larger than the other assets.",
    glyph: "╳",
    scan: {
      name: "PROBOSCIS SCAN",
      text: "The mosquito's feeding apparatus is a specialised set of mouthparts adapted for piercing and fluid uptake.",
      metaA: "CULICIDAE",
      metaB: "FEEDING NODE"
    }
  }
];

const $ = (sel) => document.querySelector(sel);
const els = {
  canvas: $("#mainCanvas"),
  status: $("#modelStatus"),
  loadLabel: $("#loadLabel"),
  loadPercent: $("#loadPercent"),
  currentIndex: $("#currentIndex"),
  prevName: $("#prevName"),
  nextName: $("#nextName"),
  prevGlyph: $("#prevGlyph"),
  nextGlyph: $("#nextGlyph"),
  specimenName: $("#specimenName"),
  scientificName: $("#scientificName"),
  captionKicker: $("#captionKicker"),
  taxOrder: $("#taxOrder"),
  taxFamily: $("#taxFamily"),
  taxRange: $("#taxRange"),
  taxDiet: $("#taxDiet"),
  taxSize: $("#taxSize"),
  taxRole: $("#taxRole"),
  taxLife: $("#taxLife"),
  profileSummary: $("#profileSummary"),
  specimenList: $("#specimenList"),
  fieldNote: $("#fieldNote"),
  scanCard: $("#scanCard"),
  scanName: $("#scanName"),
  scanText: $("#scanText"),
  scanMetaA: $("#scanMetaA"),
  scanMetaB: $("#scanMetaB"),
  closeScan: $("#closeScan"),
  anatomyHint: $("#anatomyHint"),
  profileCard: $("#profileCard"),
  detailsBtn: $("#detailsBtn"),
  autoRotateBtn: $("#autoRotateBtn"),
  resetBtn: $("#resetBtn"),
  infoDrawer: $("#infoDrawer"),
  drawerTitle: $("#drawerTitle"),
  drawerBody: $("#drawerBody"),
  drawerClose: $("#drawerClose"),
  transitionFlash: $("#transitionFlash"),
  clock: $("#clock")
};

let activeIndex = 0;
const cache = new Map();
let activeRoot = null;
let activeMixer = null;
let activeClock = new THREE.Clock();
let autoRotate = true;
let isTransitioning = false;
let pointerDown = false;
let pointerStart = new THREE.Vector2();
let initialQuaternion = new THREE.Quaternion();

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x020914, 0.018);

const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
camera.position.set(0, 0.5, 7.1);

const renderer = new THREE.WebGLRenderer({
  canvas: els.canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
  preserveDrawingBuffer: false
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.enablePan = false;
controls.minDistance = 4.2;
controls.maxDistance = 9.5;
controls.target.set(0, 0.1, 0);
controls.enabled = false;

const hemi = new THREE.HemisphereLight(0x93c9ff, 0x01050a, 2.15);
scene.add(hemi);
const key = new THREE.DirectionalLight(0xcceaff, 2.25);
key.position.set(3, 5, 5);
scene.add(key);
const rim = new THREE.PointLight(0x2e9dff, 42, 14, 2);
rim.position.set(-2.5, 2.2, 2.5);
scene.add(rim);
const cyan = new THREE.PointLight(0x6df3ff, 28, 10, 2);
cyan.position.set(2.7, .6, 2.1);
scene.add(cyan);

const floorGlow = new THREE.Mesh(
  new THREE.CircleGeometry(2.4, 96),
  new THREE.MeshBasicMaterial({ color: 0x2f9fff, transparent: true, opacity: .09, depthWrite: false })
);
floorGlow.rotation.x = -Math.PI / 2;
floorGlow.position.y = -1.72;
scene.add(floorGlow);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const tempBox = new THREE.Box3();
const tempCenter = new THREE.Vector3();
const tempSize = new THREE.Vector3();

function resize() {
  const rect = els.canvas.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = Math.max(rect.width / Math.max(rect.height, 1), 0.7);
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize, { passive: true });
resize();


function createProxySpecimen() {
  const group = new THREE.Group();
  group.userData.proxy = true;

  const glowMat = new THREE.MeshStandardMaterial({
    color: 0x5ccfff,
    emissive: 0x126fa5,
    emissiveIntensity: 2.2,
    metalness: .15,
    roughness: .35,
    transparent: true,
    opacity: .62,
    side: THREE.DoubleSide
  });

  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0);
  wingShape.bezierCurveTo(.92, .72, 1.42, 1.45, .34, 1.58);
  wingShape.bezierCurveTo(-.1, 1.2, -.22, .58, 0, 0);
  const wingGeo = new THREE.ShapeGeometry(wingShape);
  const wingL = new THREE.Mesh(wingGeo, glowMat);
  wingL.position.set(-.09, .18, 0);
  wingL.rotation.z = .32;
  wingL.rotation.y = -.2;
  const wingR = wingL.clone();
  wingR.position.x = .09;
  wingR.rotation.z = Math.PI - .32;
  wingR.rotation.y = .2;
  group.add(wingL, wingR);

  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(.12, 1.35, 6, 10),
    new THREE.MeshStandardMaterial({
      color: 0x253b51, emissive: 0x0c4e72, emissiveIntensity: 1.2,
      metalness: .3, roughness: .55
    })
  );
  body.rotation.z = 0;
  group.add(body);

  const eyeGeo = new THREE.SphereGeometry(.045, 12, 8);
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x9ff7ff });
  const e1 = new THREE.Mesh(eyeGeo, eyeMat), e2 = e1.clone();
  e1.position.set(-.055,.68,.08); e2.position.set(.055,.68,.08);
  group.add(e1,e2);

  const antennaMat = new THREE.LineBasicMaterial({ color: 0x75ddff, transparent:true, opacity:.8 });
  for (const side of [-1, 1]) {
    const pts = [
      new THREE.Vector3(side*.05,.83,.03),
      new THREE.Vector3(side*.28,1.13,.02),
      new THREE.Vector3(side*.5,1.2,.02)
    ];
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), antennaMat);
    group.add(line);
  }

  group.scale.setScalar(1.25);
  group.position.set(0,.18,0);
  group.rotation.x = .03;
  return group;
}

const proxySpecimen = createProxySpecimen();
scene.add(proxySpecimen);

function modelProgress(label, percent) {
  els.loadLabel.textContent = label;
  els.loadPercent.textContent = `${Math.round(percent)}%`;
  els.status.classList.remove("hidden");
}

function smoothProgress() {
  return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

function prepareModel(root) {
  root.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = false;
      obj.receiveShadow = false;
      if (obj.material) {
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const material of materials) {
          material.side = THREE.DoubleSide;
          if ("roughness" in material) material.roughness = Math.min(material.roughness ?? .65, .82);
          if ("metalness" in material) material.metalness = Math.min(material.metalness ?? .15, .25);
        }
      }
    }
  });
}

function frameModel(root) {
  tempBox.setFromObject(root);
  tempBox.getCenter(tempCenter);
  tempBox.getSize(tempSize);
  const maxDim = Math.max(tempSize.x, tempSize.y, tempSize.z) || 1;
  const scale = 3.15 / maxDim;
  root.scale.setScalar(scale);
  tempBox.setFromObject(root);
  tempBox.getCenter(tempCenter);
  root.position.x -= tempCenter.x;
  root.position.y -= tempCenter.y;
  root.position.z -= tempCenter.z;
  root.position.y += 0.05;
  root.updateMatrixWorld(true);
  initialQuaternion.copy(root.quaternion);
}

function cacheInteraction(root, data) {
  root.userData.specimen = data;
  root.traverse((obj) => {
    if (!obj.isMesh) return;
    obj.userData.scan = inferScan(obj, data);
  });
}

function inferScan(obj, data) {
  const n = (obj.name || "").toLowerCase();
  if (/wiba|wifr|wing|elytra/.test(n)) return {
    name: "WING / FOREWING",
    text: data === DATA[0]
      ? "Microscopic wing scales create colour, texture and signalling patterns. Clicked wing geometry mapped successfully."
      : "Wing surfaces are lightweight flight structures. The model node is responding to direct anatomical selection.",
    metaA: data.order.toUpperCase(),
    metaB: "WING NODE"
  };
  if (/eyes|eye/.test(n)) return { name:"VISION NODE", text:"Compound eyes turn local motion into a wide visual field — useful for flight, escape and foraging.", metaA:data.order.toUpperCase(), metaB:"EYE NODE" };
  if (/body|thorax|abdomen/.test(n)) return { name:"BODY CORE", text:"The central body houses muscle, digestive and respiratory systems, linking the insect's locomotion and metabolism.", metaA:data.order.toUpperCase(), metaB:"BODY NODE" };
  return data.scan;
}

async function loadModel(index, visible = true) {
  if (cache.has(index)) {
    const root = cache.get(index);
    if (visible) showModel(root, DATA[index]);
    return root;
  }

  const data = DATA[index];
  const loader = new GLTFLoader();
  modelProgress("LOADING SPECIMEN", 2);

  const root = await new Promise((resolve, reject) => {
    loader.load(
      data.file,
      (gltf) => resolve(gltf.scene),
      (event) => {
        if (event.lengthComputable) modelProgress("LOADING SPECIMEN", event.loaded / event.total * 100);
        else modelProgress(index === 7 ? "LARGE SPECIMEN / ON-DEMAND" : "STREAMING GEOMETRY", 72);
      },
      reject
    );
  });

  prepareModel(root);
  frameModel(root);
  cacheInteraction(root, data);
  cache.set(index, root);

  // Hide until activated.
  root.visible = false;
  scene.add(root);

  if (visible) showModel(root, data);
  return root;
}

async function showModel(root, data) {
  if (activeRoot && activeRoot !== root) activeRoot.visible = false;
  proxySpecimen.visible = false;
  activeRoot = root;
  activeRoot.visible = true;
  activeMixer = null;
  activeIndex = DATA.indexOf(data);
  controls.enabled = true;
  controls.target.set(0, 0.1, 0);

  // Small breathing motion gives the specimen a living "display case" feel.
  root.userData.baseY = root.position.y;
  root.userData.phase = Math.random() * Math.PI * 2;

  renderMeta(data);
  els.status.classList.add("hidden");
  await smoothProgress();
}

async function selectSpecimen(index, direction = 1) {
  if (isTransitioning || index === activeIndex) return;
  isTransitioning = true;
  els.transitionFlash.classList.remove("on");
  void els.transitionFlash.offsetWidth;
  els.transitionFlash.classList.add("on");
  closeScan();

  try {
    let root = cache.get(index);
    if (!root) {
      // Intentionally lazy-load: keeps first paint fast and avoids an 86 MB upfront mosquito download.
      root = await loadModel(index, false);
    }
    await new Promise(r => setTimeout(r, 35));
    await showModel(root, DATA[index]);
  } catch (err) {
    console.error(err);
    modelProgress("MODEL LOAD ERROR", 100);
    els.loadLabel.textContent = "MODEL LOAD ERROR";
  } finally {
    isTransitioning = false;
  }
}

function renderMeta(data) {
  els.currentIndex.textContent = String(activeIndex + 1).padStart(2, "0");
  els.prevName.textContent = DATA[(activeIndex - 1 + DATA.length) % DATA.length].name;
  els.prevGlyph.textContent = DATA[(activeIndex - 1 + DATA.length) % DATA.length].glyph;
  els.nextName.textContent = DATA[(activeIndex + 1) % DATA.length].name;
  els.nextGlyph.textContent = DATA[(activeIndex + 1) % DATA.length].glyph;
  els.specimenName.textContent = data.name;
  els.scientificName.textContent = data.scientific;
  els.captionKicker.textContent = `${data.order.toUpperCase()} // ${data.family.toUpperCase()}`;
  els.taxOrder.textContent = data.order;
  els.taxFamily.textContent = data.family;
  els.taxRange.textContent = data.range;
  els.taxDiet.textContent = data.diet;
  els.taxSize.textContent = data.size;
  els.taxRole.textContent = data.role;
  els.taxLife.textContent = data.life;
  els.profileSummary.textContent = data.summary;
  els.fieldNote.textContent = data.note;

  [...els.specimenList.children].forEach((btn, i) => btn.classList.toggle("is-active", i === activeIndex));
  els.anatomyHint.innerHTML = `<span class="pulse"></span>${data === DATA[0] ? "Tap a wing / surface to scan" : "Tap specimen to scan"}`;
}

function renderSpecimenList() {
  els.specimenList.innerHTML = DATA.map((d, i) => `
    <button class="specimen-item ${i===activeIndex ? "is-active" : ""}" data-index="${i}" type="button">
      <span class="specimen-no">${String(i+1).padStart(2,"0")}</span>
      <div><strong>${d.name}</strong><span>${d.scientific}</span></div>
    </button>
  `).join("");
  els.specimenList.addEventListener("click", (e) => {
    const btn = e.target.closest(".specimen-item");
    if (!btn) return;
    selectSpecimen(Number(btn.dataset.index), Number(btn.dataset.index) > activeIndex ? 1 : -1);
  });
}

function openScan(scan) {
  els.scanName.textContent = scan.name;
  els.scanText.textContent = scan.text;
  els.scanMetaA.textContent = scan.metaA;
  els.scanMetaB.textContent = scan.metaB;
  els.scanCard.classList.add("is-visible");
}
function closeScan() { els.scanCard.classList.remove("is-visible"); }

function scanFromPointer(clientX, clientY) {
  const rect = els.canvas.getBoundingClientRect();
  pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(activeRoot, true);
  return hits[0] || null;
}

els.canvas.addEventListener("pointerdown", e => {
  pointerDown = true;
  pointerStart.set(e.clientX, e.clientY);
});
window.addEventListener("pointerup", e => {
  if (!pointerDown) return;
  pointerDown = false;
  const moved = pointerStart.distanceTo(new THREE.Vector2(e.clientX, e.clientY));
  if (moved < 7 && activeRoot) {
    const hit = scanFromPointer(e.clientX, e.clientY);
    if (hit && hit.object) openScan(hit.object.userData.scan || DATA[activeIndex].scan);
    else openScan(DATA[activeIndex].scan);
  }
});

els.anatomyHint.addEventListener("click", () => openScan(DATA[activeIndex].scan));
els.closeScan.addEventListener("click", closeScan);

els.prevBtn.addEventListener("click", () => selectSpecimen((activeIndex - 1 + DATA.length) % DATA.length, -1));
els.nextBtn.addEventListener("click", () => selectSpecimen((activeIndex + 1) % DATA.length, 1));
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") selectSpecimen((activeIndex - 1 + DATA.length) % DATA.length, -1);
  if (e.key === "ArrowRight") selectSpecimen((activeIndex + 1) % DATA.length, 1);
  if (e.key === "Escape") { closeScan(); closeDrawer(); }
});

els.autoRotateBtn.addEventListener("click", () => {
  autoRotate = !autoRotate;
  els.autoRotateBtn.classList.toggle("is-on", autoRotate);
  els.autoRotateBtn.innerHTML = `AUTO ROTATE <span>${autoRotate ? "ON" : "OFF"}</span>`;
});
els.resetBtn.addEventListener("click", () => {
  controls.reset();
  camera.position.set(0, .5, 7.1);
});

els.detailsBtn.addEventListener("click", () => {
  const detail = els.profileCard.querySelector(".profile-detail");
  const isOpen = detail.classList.toggle("is-open");
  els.detailsBtn.textContent = isOpen ? "COLLAPSE −" : "EXPAND +";
});

const principleButtons = document.querySelectorAll(".principle");
principleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    principleButtons.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    if (btn.dataset.open) openDrawer(btn.dataset.open);
    else document.getElementById(btn.dataset.scrollTarget)?.scrollIntoView({ behavior: "smooth" });
  });
});

function openDrawer(type) {
  if (type === "biology") {
    els.drawerTitle.textContent = "Biology in motion";
    els.drawerBody.innerHTML = `
      <p>Insects are modular, highly specialised organisms. Their exoskeleton protects the body, while segmented appendages and specialised sensory organs let them occupy niches from flowers and leaf litter to freshwater.</p>
      <div class="fact-strip">
        <div><span>BODY PLAN</span><b>Head • thorax • abdomen</b></div>
        <div><span>RESPIRATION</span><b>Tracheal system</b></div>
        <div><span>DEVELOPMENT</span><b>Metamorphosis varies by order</b></div>
      </div>`;
  } else {
    els.drawerTitle.textContent = "Why protect insects?";
    els.drawerBody.innerHTML = `
      <p>Pollination, decomposition, predation and nutrient cycling make insects core components of functioning ecosystems. A clean field study starts with observation: document diversity, reduce habitat pressure and protect the small processes that scale up into healthy landscapes.</p>
      <div class="fact-strip">
        <div><span>OBSERVE</span><b>Record diversity</b></div>
        <div><span>LEARN</span><b>Understand interactions</b></div>
        <div><span>PROTECT</span><b>Preserve habitat</b></div>
      </div>`;
  }
  els.infoDrawer.classList.add("is-open");
}
function closeDrawer() { els.infoDrawer.classList.remove("is-open"); }
els.drawerClose.addEventListener("click", closeDrawer);

// Preload only the nearest two neighbours after the first interactive frame.
// This keeps the initial render responsive while making nearby navigation near-instant.
function preloadNeighbours() {
  const first = [(activeIndex + 1) % DATA.length, (activeIndex - 1 + DATA.length) % DATA.length];
  const runner = window.requestIdleCallback || ((fn) => setTimeout(fn, 700));
  runner(() => first.forEach(i => loadModel(i, false).catch(() => {})));
}

function tick() {
  requestAnimationFrame(tick);
  const dt = activeClock.getDelta();
  controls.update();

  if (activeRoot) {
    if (autoRotate && !pointerDown) activeRoot.rotation.y += dt * 0.26;
    const phase = (activeRoot.userData.phase ?? 0) + performance.now() * 0.0007;
    activeRoot.position.y = (activeRoot.userData.baseY ?? 0.05) + Math.sin(phase) * 0.028;
  }

  renderer.render(scene, camera);
}

function updateClock() {
  const now = new Date();
  els.clock.textContent = now.toLocaleTimeString([], { hour12:false });
}
setInterval(updateClock, 1000);
updateClock();

renderSpecimenList();
renderMeta(DATA[0]);
tick();

// First specimen only: fastest asset in the set (~2 MB). This is the key "instant-first-view" optimization.
// The 86 MB mosquito model is never requested until it is selected.
loadModel(0, true)
  .then(() => preloadNeighbours())
  .catch(err => {
    console.error(err);
    els.loadLabel.textContent = "CHECK /MODELS PATH";
    els.loadPercent.textContent = "—";
    proxySpecimen.visible = true;
  });
