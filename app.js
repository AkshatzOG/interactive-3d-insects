import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- DATA STRUCTURE ---
const INSECT_DATA = [
    {
        file: "./models/butterfly.glb",
        name: "Butterfly",
        scientific: "Danaus plexippus",
        order: "Lepidoptera",
        diet: "Nectar",
        desc: "A pollinator and migratory species whose wing patterns support camouflage, signalling and thermal regulation."
    },
    {
        file: "./models/bee.glb",
        name: "Honey Bee",
        scientific: "Apis mellifera",
        order: "Hymenoptera",
        diet: "Nectar + pollen",
        desc: "A social pollinator living in colonies with distinct queen, worker and drone roles. Vital for global ecosystems."
    },
    {
        file: "./models/ant.glb",
        name: "Ant",
        scientific: "Formica rufa",
        order: "Hymenoptera",
        diet: "Omnivorous",
        desc: "A cooperative colony-builder that influences soil, seed movement and food-web dynamics acting as a distributed system."
    }
    // Add the rest of your 8 insects here...
];

let currentIndex = 0;
let activeModel = null;
const modelCache = new Map();

// --- DOM ELEMENTS ---
const ui = {
    card: document.getElementById('insect-card'),
    presText: document.getElementById('presentation-text'),
    loader: document.getElementById('loader'),
    
    // Text Targets
    cardTitle: document.getElementById('card-title'),
    cardSci: document.getElementById('card-scientific'),
    cardDesc: document.getElementById('card-desc'),
    cardOrder: document.getElementById('card-order'),
    cardDiet: document.getElementById('card-diet'),
    
    prevName: document.getElementById('prev-name'),
    prevSci: document.getElementById('prev-sci'),
    nextName: document.getElementById('next-name'),
    nextSci: document.getElementById('next-sci'),
};

// --- SCENE SETUP ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x020711, 0.04); // Blends the edges into the dark background

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.powerPreference = "high-performance";
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2 + 0.1; 
controls.minDistance = 3;
controls.maxDistance = 8;

// --- LIGHTING & HOLOGRAM BASE ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const holoLight = new THREE.SpotLight(0x4facfe, 3);
holoLight.position.set(0, -2, 0);
holoLight.angle = Math.PI / 3;
holoLight.penumbra = 0.8;
scene.add(holoLight);

// High-tech Pedestal
const baseGeo = new THREE.CylinderGeometry(1.8, 2.0, 0.3, 32);
const baseMat = new THREE.MeshStandardMaterial({ color: 0x050f1f, metalness: 0.9, roughness: 0.1 });
const pedestal = new THREE.Mesh(baseGeo, baseMat);
pedestal.position.y = -1.2;
scene.add(pedestal);

// Glowing Ring
const ringGeo = new THREE.RingGeometry(1.3, 1.35, 64);
const ringMat = new THREE.MeshBasicMaterial({ color: 0x7ec9ff, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotation.x = Math.PI / 2;
ring.position.y = -1.04;
scene.add(ring);

// --- MODEL LOADING ---
const manager = new THREE.LoadingManager();
manager.onLoad = () => {
    ui.loader.style.opacity = '0';
    setTimeout(() => ui.loader.style.display = 'none', 500);
};

const loader = new GLTFLoader(manager);

function loadInsect(index) {
    const data = INSECT_DATA[index];
    
    // Hide current model
    if (activeModel) activeModel.visible = false;

    // Load from cache if available for instant swapping
    if (modelCache.has(index)) {
        activeModel = modelCache.get(index);
        activeModel.visible = true;
        updateUI(index);
        return;
    }

    // Otherwise, load new geometry
    // *NOTE: Replace the placeholder geometry below with loader.load(data.file, (gltf) => { ... }) once files are present*
    
    // --- PLACEHOLDER GENERATION FOR TESTING ---
    const geometry = new THREE.IcosahedronGeometry(0.8, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x7ec9ff, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.5;
    mesh.userData = { isInsect: true };
    
    scene.add(mesh);
    modelCache.set(index, mesh);
    activeModel = mesh;
    
    updateUI(index);
}

// --- UI UPDATES ---
function updateUI(index) {
    const data = INSECT_DATA[index];
    
    // Update Center Info Card
    ui.cardTitle.textContent = data.name;
    ui.cardSci.textContent = data.scientific;
    ui.cardDesc.textContent = data.desc;
    ui.cardOrder.textContent = data.order;
    ui.cardDiet.textContent = data.diet;

    // Update Nav Chevrons
    const prevIndex = (index - 1 + INSECT_DATA.length) % INSECT_DATA.length;
    const nextIndex = (index + 1) % INSECT_DATA.length;
    
    ui.prevName.textContent = INSECT_DATA[prevIndex].name;
    ui.prevSci.textContent = INSECT_DATA[prevIndex].scientific;
    
    ui.nextName.textContent = INSECT_DATA[nextIndex].name;
    ui.nextSci.textContent = INSECT_DATA[nextIndex].scientific;
    
    // Reset presentation state
    ui.card.classList.remove('active');
    ui.presText.style.opacity = '1';
}

// --- INTERACTIVITY (Raycaster) ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    let clickedInsect = false;
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.userData.isInsect || (intersects[i].object.parent && intersects[i].object.parent.userData.isInsect)) {
            ui.card.classList.toggle('active');
            // Dim left text when card is active to focus on the 3D element (70/30 rule)
            ui.presText.style.opacity = ui.card.classList.contains('active') ? '0.1' : '1';
            clickedInsect = true;
            break;
        }
    }
    
    // Clicking empty space closes the card
    if (!clickedInsect && event.target.tagName === 'CANVAS') {
        ui.card.classList.remove('active');
        ui.presText.style.opacity = '1';
    }
});

// Change cursor on hover
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.some(i => i.object.userData.isInsect || (i.object.parent && i.object.parent.userData.isInsect))) {
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'default';
    }
});

// --- NAVIGATION CONTROLS ---
document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % INSECT_DATA.length;
    loadInsect(currentIndex);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + INSECT_DATA.length) % INSECT_DATA.length;
    loadInsect(currentIndex);
});

// --- RESIZE & ANIMATE ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    if (activeModel) {
        // Auto-rotation and subtle floating effect
        activeModel.rotation.y += 0.003;
        activeModel.position.y = 0.5 + Math.sin(time * 1.5) * 0.05;
    }

    // Animate the hologram base ring
    ring.rotation.z -= 0.005;

    controls.update();
    renderer.render(scene, camera);
}

// Boot up
loadInsect(currentIndex);
animate();