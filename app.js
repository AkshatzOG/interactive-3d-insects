
// Audio Synthesizer (Web Audio API)
let audioCtx = null;
function getAudioCtx(){
  if(!audioCtx){
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if(AudioContext) audioCtx = new AudioContext();
  }
  if(audioCtx && audioCtx.state === 'suspended'){
    audioCtx.resume();
  }
  return audioCtx;
}

function playUiSound(type='click'){
  try {
    const ctx = getAudioCtx();
    if(!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if(type === 'click'){
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now); osc.stop(now + 0.05);
    } else if(type === 'swipe'){
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now); osc.stop(now + 0.12);
    } else if(type === 'pin'){
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.18);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now); osc.stop(now + 0.18);
    }
  } catch(e){}
}

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/controls/OrbitControls.js";
import * as SkeletonUtils from "https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/utils/SkeletonUtils.js";

const DATA = [
 {key:"butterfly",name:"Butterfly",latin:"Danaus plexippus",order:"Lepidoptera",family:"Nymphalidae",range:"Worldwide",diet:"Nectar",size:"8.5–10.5 cm",role:"Pollinator",life:"2–6 weeks adult",color:0xffa63d,note:"Pollination, food webs and seasonal migration make butterflies valuable ecological indicators.",summary:"A pollinator whose wing scales create visual signalling, camouflage and thermoregulation.",anatomy:[
  ["HEAD + ANTENNAE","Sensory antennae and compound eyes orient the butterfly toward odours, movement and light.","SENSORY SYSTEM"],
  ["WING SURFACE","Microscopic wing scales scatter light and help create colour, signalling and camouflage.","FLIGHT SURFACE"],
  ["THORAX + ABDOMEN","Flight muscles sit in the thorax while the abdomen contains major digestive and reproductive organs.","CORE BODY"]]},
 {key:"bee",name:"Honey Bee",latin:"Apis mellifera",order:"Hymenoptera",family:"Apidae",range:"Worldwide",diet:"Nectar + pollen",size:"12–15 mm",role:"Pollinator",life:"~6 weeks worker",color:0xf1b84b,note:"Bees support flowering plant reproduction and form tightly coordinated social colonies.",summary:"A social pollinator with a specialised pollen basket and complex colony communication.",anatomy:[
  ["HEAD + EYES","Large compound eyes detect motion and colour while antennae provide chemical and tactile information.","SENSORY SYSTEM"],
  ["WING + FLIGHT MUSCLES","Two pairs of wings are coupled during flight; rapid wing beats support hovering and precise navigation.","FLIGHT SYSTEM"],
  ["ABDOMEN + STINGER","The abdomen houses digestive and reproductive organs; workers have a defensive stinger.","DEFENCE + CORE"]]},
 {key:"ant",name:"Ant",latin:"Formica rufa",order:"Hymenoptera",family:"Formicidae",range:"Europe + Asia",diet:"Omnivorous",size:"4–9 mm",role:"Soil engineer",life:"Weeks–years",color:0xb46d45,note:"Ants aerate soil, redistribute nutrients and help shape microhabitats.",summary:"A colony-driven soil engineer with extreme cooperative behaviour and specialised caste roles.",anatomy:[
  ["HEAD + MANDIBLES","The head carries sensory antennae and powerful mandibles used for feeding, defence and carrying.","SENSORY + TOOLS"],
  ["THORAX + LEGS","The thorax anchors six jointed legs that provide traction and rapid ground locomotion.","LOCOMOTION"],
  ["ABDOMEN","The abdomen contains major internal organs and chemical communication structures used by the colony.","CORE BODY"]]},
 {key:"dragonfly",name:"Dragonfly",latin:"Anax imperator",order:"Odonata",family:"Aeshnidae",range:"Africa + Eurasia",diet:"Predatory insects",size:"66–84 mm",role:"Predator",life:"Weeks–months adult",color:0x54bdc4,note:"Dragonflies are efficient aerial predators and useful signals of freshwater ecosystem health.",summary:"A precision aerial predator with independent wing control and exceptional visual acuity.",anatomy:[
  ["HEAD + COMPOUND EYES","Huge compound eyes provide a wide visual field for tracking prey during high-speed aerial pursuit.","VISION SYSTEM"],
  ["FOUR WINGS","Each wing can contribute independently to lift, braking and manoeuvring, enabling precise aerial control.","FLIGHT SYSTEM"],
  ["ABDOMEN","The long abdomen balances the body in flight and carries respiratory, digestive and reproductive systems.","CORE BODY"]]},
 {key:"ladybug",name:"Ladybird",latin:"Coccinella septempunctata",order:"Coleoptera",family:"Coccinellidae",range:"Northern Hemisphere",diet:"Aphids",size:"5–8 mm",role:"Biocontrol",life:"1 year",color:0xe14f48,note:"Ladybirds help regulate aphid populations and can protect crops naturally.",summary:"A compact beetle whose warning colours advertise chemical defences to predators.",anatomy:[
  ["HEAD + ANTENNAE","The small head carries compound eyes and short antennae that help locate prey and environmental cues.","SENSORY SYSTEM"],
  ["ELYTRA + WINGS","The coloured wing covers protect the folded flight wings beneath the hard beetle shell.","ARMOUR + FLIGHT"],
  ["ABDOMEN + DEFENCE","The abdomen is protected by the elytra and can support chemical defence responses when threatened.","DEFENCE SYSTEM"]]},
 {key:"housefly",name:"House Fly",latin:"Musca domestica",order:"Diptera",family:"Muscidae",range:"Worldwide",diet:"Liquids / decaying matter",size:"6–7 mm",role:"Decomposer",life:"15–30 days",color:0x9fb7be,note:"Flies recycle organic matter and transfer nutrients through food webs.",summary:"A rapid-lifecycle decomposer with halteres that stabilise flight and compound eyes for motion detection.",anatomy:[
  ["HEAD + COMPOUND EYES","Large compound eyes detect rapid changes in the visual field while antennae and mouthparts sample the environment.","SENSORY SYSTEM"],
  ["WING + HALTERE","One functional wing pair drives flight; tiny halteres act as gyroscopic sensors for balance.","FLIGHT CONTROL"],
  ["ABDOMEN","The segmented abdomen contains digestive and reproductive organs and supports the fly's rapid lifecycle.","CORE BODY"]]},
 {key:"cockroach",name:"Cockroach",latin:"Periplaneta americana",order:"Blattodea",family:"Blattidae",range:"Worldwide",diet:"Omnivorous",size:"34–53 mm",role:"Decomposer",life:"1–2 years",color:0x9a704e,note:"Cockroaches are resilient detritivores that participate in nutrient cycling.",summary:"A resilient detritivore built around a flexible exoskeleton, sensitive antennae and rapid locomotion.",anatomy:[
  ["HEAD + ANTENNAE","Long antennae continuously sample chemical and tactile information around the animal.","SENSORY SYSTEM"],
  ["THORAX + LEGS","The thorax anchors six powerful legs built for fast, low-profile movement across uneven surfaces.","LOCOMOTION"],
  ["ABDOMEN + WINGS","The segmented abdomen protects internal organs; adult cockroaches may use their fore- and hindwings during movement.","CORE + FLIGHT"]]},
 {key:"mosquito",name:"Mosquito",latin:"Aedes aegypti",order:"Diptera",family:"Culicidae",range:"Tropical + subtropical",diet:"Nectar / blood (female)",size:"3–6 mm",role:"Pollinator / vector",life:"~2–4 weeks",color:0x7182b6,note:"Mosquitoes occupy aquatic and terrestrial food webs; some species are important disease vectors.",summary:"A lightweight dipteran with a specialised proboscis and sensory antennae tuned to chemical cues.",anatomy:[
  ["HEAD + ANTENNAE","Antennae and sensory palps detect odours, carbon dioxide and other cues that help locate hosts and habitats.","SENSORY SYSTEM"],
  ["PROBOSCIS","The elongated mouthpart is specialised for piercing and feeding; females of this species can take blood meals.","FEEDING SYSTEM"],
  ["WINGS + ABDOMEN","A single wing pair provides flight while the abdomen expands to accommodate a blood meal and eggs.","FLIGHT + CORE"]]}
];

const $ = id => document.getElementById(id);
const ui = {
 canvas:$('mainCanvas'), name:$('specimenName'), latin:$('scientificName'), kicker:$('captionKicker'), current:$('currentIndex'),
 order:$('taxOrder'), family:$('taxFamily'), range:$('taxRange'), diet:$('taxDiet'), size:$('taxSize'), role:$('taxRole'), life:$('taxLife'), summary:$('profileSummary'),
 prevName:$('prevName'), nextName:$('nextName'), list:$('specimenList'), fieldNote:$('fieldNote'), scan:$('scanCard'), scanName:$('scanName'), scanText:$('scanText'), scanMetaA:$('scanMetaA'), scanMetaB:$('scanMetaB'),
 drawer:$('infoDrawer'), drawerTitle:$('drawerTitle'), drawerBody:$('drawerBody'), profile:$('profileCard'), preloader:$('preloader'), prefill:$('prefillBar'), prefillPct:$('prefillPercent'), prefillText:$('prefillText'), prefillStage:$('prefillStage'),
 ghostLeft:$('ghostLeftCanvas'), ghostRight:$('ghostRightCanvas'), ghostLeftLabel:$('prevName'), ghostRightLabel:$('nextName')
};

let scene,camera,renderer,controls,loader,dracoLoader;
let specimenGroup=null, placeholderGroup=null;
let currentIndex=0, activeModelToken=0, autoRotate=true, booted=false;
let mixer=null, mixerActions=[];
let ghostViewers=[];
let researchPhase=0;
let rendererFailed=false;
let wingAnimTargets=[];
let targetCameraZ=4.45,targetCameraY=.28,targetTargetY=.03;
let cameraTween=0;
let researchWheelLock=0;
const modelCache=new Map(), ghostCache=new Map();
const anatomyNodes=[];
const clock=new THREE.Clock();

function modelPath(d){return `./models/${d.key === 'mosquito' ? 'mosquito_3d_model_free' : d.key}.glb`;}

function initScene(){
 scene=new THREE.Scene();
 const w=ui.canvas.clientWidth||800,h=ui.canvas.clientHeight||600;
 camera=new THREE.PerspectiveCamera(37,w/h,.01,100);
 camera.position.set(0,.28,4.45);
 try{
   renderer=new THREE.WebGLRenderer({canvas:ui.canvas,alpha:true,antialias:true,powerPreference:'default',preserveDrawingBuffer:false});
 }catch(err){
   rendererFailed=true;
   console.error('[INSECTA] WebGL renderer unavailable',err);
   throw new Error('WEBGL_UNAVAILABLE');
 }
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.35));
 renderer.setSize(w,h,false);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();rendererFailed=true;document.body.dataset.modelState='webgl-lost';});
 renderer.domElement.addEventListener('webglcontextrestored',()=>{rendererFailed=false;});
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.42;
 scene.add(new THREE.HemisphereLight(0xc9edff,0x07111c,2.35));
 const key=new THREE.DirectionalLight(0xe8f7ff,4.4); key.position.set(2.6,4.2,4.5); key.castShadow=true; key.shadow.mapSize.set(1024,1024); key.shadow.camera.near=.1; key.shadow.camera.far=12; scene.add(key);
 const fill=new THREE.PointLight(0x72cfff,7.5,7,2); fill.position.set(-2.8,1.5,2.5); scene.add(fill);
 const warm=new THREE.PointLight(0xffd7a4,2.4,6,2); warm.position.set(2.8,.9,1.8); scene.add(warm);
 const rim=new THREE.PointLight(0x2bbcff,5.5,8,2); rim.position.set(0,2.4,-2.8); scene.add(rim);
 const texLoader=new THREE.TextureLoader();
const logoMat=new THREE.MeshStandardMaterial({color:0xffffff,metalness:0.3,roughness:0.3});
texLoader.load('assets/logo.png',tex=>{tex.colorSpace=THREE.SRGBColorSpace;logoMat.map=tex;logoMat.needsUpdate=true;});
const sideMat=new THREE.MeshStandardMaterial({color:0x0b2238,metalness:0.8,roughness:0.2});
const baseMesh=new THREE.Mesh(new THREE.CylinderGeometry(1.85,2.0,0.12,64),[sideMat,logoMat,sideMat]);
baseMesh.position.y=-1.12; baseMesh.receiveShadow=true; scene.add(baseMesh);
const ringMesh=new THREE.Mesh(new THREE.TorusGeometry(1.88,0.02,16,100),new THREE.MeshBasicMaterial({color:0x69d9ff}));
ringMesh.rotation.x=Math.PI/2; ringMesh.position.y=-1.06; scene.add(ringMesh);
 controls=new OrbitControls(camera,renderer.domElement);
 controls.enableDamping=true; controls.dampingFactor=.08; controls.enablePan=false; controls.enableZoom=true;
 controls.minDistance=2.25; controls.maxDistance=5.25;
 controls.minPolarAngle=.92; controls.maxPolarAngle=2.12;
 controls.target.set(0,.03,0); controls.rotateSpeed=.52; controls.zoomSpeed=.72;
 controls.touches={ONE:THREE.TOUCH.ROTATE,TWO:THREE.TOUCH.DOLLY_PAN};
 loader=new GLTFLoader();
 dracoLoader=new DRACOLoader();
 dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/libs/draco/');
 dracoLoader.preload(); loader.setDRACOLoader(dracoLoader);
 window.addEventListener('resize',resize,{passive:true});
 resize();
}

function resize(){if(!camera||!renderer)return;const w=Math.max(1,ui.canvas.clientWidth||800),h=Math.max(1,ui.canvas.clientHeight||600);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);ghostViewers.forEach(g=>g.resize());}

function normalizeModel(g){
 const box=new THREE.Box3().setFromObject(g), size=box.getSize(new THREE.Vector3()), center=box.getCenter(new THREE.Vector3());
 const maxDim=Math.max(size.x,size.y,size.z)||1; const s=3.35/maxDim;
 g.scale.setScalar(s); g.position.sub(center.multiplyScalar(s)); g.position.y-=.05;
 g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.frustumCulled=true;o.userData.originalMaterial=o.material;}});
}
function attachAnatomyHooks(g,d){
 g.userData.anatomy=d.anatomy;
 g.traverse(o=>{if(!o.isMesh)return;const n=(o.name||'').toLowerCase();
   if(n.includes('wing')||n.includes('antenna')||n.includes('head')||n.includes('eye')||n.includes('mandib')||n.includes('thorax')||n.includes('abdomen')||n.includes('body')) o.userData.semanticPart=n;
 });
}
function setupAnimation(g,d){
 if(mixer){mixer.stopAllAction();mixer=null;mixerActions=[];}
 wingAnimTargets=[];
 if(g?.animations?.length){
   mixer=new THREE.AnimationMixer(g);
   const preferred=d.key==='bee'?'_bee_hover':d.key==='cockroach'?'Take 001':d.key==='butterfly'?'metarig|3':g.animations[0].name;
   const clip=g.animations.find(a=>a.name===preferred)||g.animations[0];
   const action=mixer.clipAction(clip); action.reset().setEffectiveWeight(1).play(); mixerActions=[action];
 }
 // Asset-aware procedural wing motion. The supplied Dragonfly and House Fly do
 // not contain animation clips, but their wing pieces are separate scene nodes.
 const addTarget=(o,i,amp=.11)=>{if(!o||wingAnimTargets.some(x=>x.object===o))return;wingAnimTargets.push({object:o,base:o.rotation.clone(),phase:i*Math.PI/2,amp});};
 if(d.key==='dragonfly'){
   g.traverse(o=>{const n=(o.name||'').toLowerCase();if(/^plane\.00[1-4]_/.test(n))addTarget(o,wingAnimTargets.length,.11);});
 }
 if(d.key==='housefly'){
   g.traverse(o=>{const n=(o.name||'').toLowerCase();if(n.includes('0d_0')||n.includes('0h_0'))addTarget(o,wingAnimTargets.length,.075);});
 }
}

function prepareModel(g,d){
 normalizeModel(g);attachAnatomyHooks(g,d);
 if(d.key==='bee'){
   // Force the supplied colour/albedo map onto a modern PBR material. The
   // embedded GLB texture is coloured; this avoids renderer/material variants
   // that can make it appear grey on some mobile GPUs.
   g.traverse(o=>{
     if(!o.isMesh)return;
     const mats=Array.isArray(o.material)?o.material:[o.material];
     o.material=mats.map(m=>{
       if(!m)return m;
       const map=m.map||null, normalMap=m.normalMap||null, aoMap=m.aoMap||null;
       if(!map)return m;
       map.colorSpace=THREE.SRGBColorSpace; map.needsUpdate=true;
       const nm=new THREE.MeshStandardMaterial({
         map, normalMap, aoMap, color:0xffffff, roughness:.46, metalness:0,
         transparent:m.transparent, opacity:m.opacity, side:m.side,
         alphaMap:m.alphaMap||null, alphaTest:m.alphaTest||0
       });
       nm.name=(m.name||'BeeMaterial')+' // PBR';
       return nm;
     });
     o.material.needsUpdate=true;
   });
 }
}

function setAnatomyNodes(g,d){
 anatomyNodes.splice(0,anatomyNodes.length);
 const box=new THREE.Box3().setFromObject(g), c=box.getCenter(new THREE.Vector3()), s=box.getSize(new THREE.Vector3());
 const points=[
   new THREE.Vector3(c.x, c.y + s.y*0.35, c.z + s.z*0.15),
   new THREE.Vector3(c.x - s.x*0.35, c.y + s.y*0.05, c.z + s.z*0.1),
   new THREE.Vector3(c.x + s.x*0.25, c.y - s.y*0.35, c.z + s.z*0.1)
 ];
 points.forEach((p,i)=>{
   const m=new THREE.Mesh(new THREE.SphereGeometry(.06,12,8),new THREE.MeshBasicMaterial({color:0x69d9ff,transparent:true,opacity:.3,depthWrite:false}));
   m.position.copy(p); m.userData.anatomyIndex=i; m.userData.part=d.anatomy[i]; m.userData.isAnatomyNode=true; m.visible=true;
   scene.add(m); anatomyNodes.push(m);
 });
 updatePinDOMNodes();
}

function updatePinDOMNodes(){
 let container=document.getElementById("anatomyPinsContainer");
 if(!container){
   container=document.createElement("div");
   container.id="anatomyPinsContainer";
   container.className="anatomy-pins-container";
   $("viewer").appendChild(container);
 }
 container.innerHTML="";
 const d=DATA[currentIndex];
 d.anatomy.forEach((part, i)=>{
   const pin=document.createElement("button");
   pin.className="anatomy-pin pin-" + i;
   pin.dataset.index=i;
   pin.innerHTML="<div class="pin-dot"></div><div class="pin-card"><span class="pin-tag">" + part[2] + "</span><strong>" + part[0] + "</strong><p>" + part[1] + "</p></div>";
   pin.addEventListener("click",(e)=>{ e.stopPropagation(); playUiSound('pin'); scanAnatomy(i); });
   container.appendChild(pin);
 });
}

function updatePinPositions(){
 if(!camera || !anatomyNodes.length) return;
 const container=document.getElementById("anatomyPinsContainer");
 if(!container) return;
 const pins=container.querySelectorAll(".anatomy-pin");
 const w=ui.canvas.clientWidth, h=ui.canvas.clientHeight;
 const projVec=new THREE.Vector3();
 anatomyNodes.forEach((node, i)=>{
   if(!pins[i]) return;
   node.getWorldPosition(projVec);
   projVec.project(camera);
   const x=(projVec.x * .5 + .5) * w;
   const y=(-projVec.y * .5 + .5) * h;
   const isBehind = projVec.z > 1;
   pins[i].style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
   pins[i].style.opacity = isBehind ? "0" : "1";
   pins[i].style.pointerEvents = isBehind ? "none" : "auto";
 });
}

function clearModel(){
 if(specimenGroup)scene.remove(specimenGroup); specimenGroup=null;
 if(placeholderGroup){scene.remove(placeholderGroup);placeholderGroup=null;}
 anatomyNodes.forEach(n=>scene.remove(n)); anatomyNodes.length=0;
 if(mixer){mixer.stopAllAction();mixer=null;mixerActions=[];}
}
function buildPlaceholder(d){
 const root=new THREE.Group(); root.name='ProceduralPreview';
 const mat=c=>new THREE.MeshPhysicalMaterial({color:c,roughness:.4,metalness:.18,clearcoat:.45});
 const seg=(y,sc,c)=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),mat(c));m.scale.set(...sc);m.position.y=y;root.add(m);};
 seg(.1,[.48,.72,.4],d.color);seg(-.68,[.33,.72,.3],0x181b20);
 const h=new THREE.Mesh(new THREE.SphereGeometry(.3,18,14),mat(d.color));h.position.y=.72;root.add(h);
 for(let i=0;i<3;i++){const y=.02-i*.22;const l=new THREE.Mesh(new THREE.CylinderGeometry(.045,.035,.82,8),mat(d.color));l.position.set(.36,-.18-i*.18,.03);l.rotation.z=-.95;root.add(l);const r=l.clone();r.position.x=-.36;r.rotation.z=.95;root.add(r);}
 root.position.y=.05;root.userData.specimen=d.key; return root;
}

function updatePreloader(pct,text,stage){ui.prefill.style.width=`${Math.max(0,Math.min(100,pct))}%`;ui.prefillPct.textContent=`${Math.round(pct)}%`;ui.prefillText.textContent=text;ui.prefillStage.textContent=stage;}
function loadModel(d,progress=true){
 if(modelCache.has(d.key))return Promise.resolve(modelCache.get(d.key));
 return new Promise(resolve=>{
   loader.load(modelPath(d),gltf=>{const g=gltf.scene;prepareModel(g,d);g.userData.animations=gltf.animations||[];g.animations=gltf.animations||[];modelCache.set(d.key,g);resolve(g);},xhr=>{if(progress&&xhr.total)updatePreloader(12+(xhr.loaded/xhr.total)*78,'DECODING '+d.name.toUpperCase(),'DRACO // GLB');},err=>{console.error('[INSECTA] Model load failed',d.name,err);resolve(null);});
 });
}
async function preloadNeighbors(){
 const indices=[(currentIndex+1)%DATA.length,(currentIndex+DATA.length-1)%DATA.length];
 await Promise.all(indices.map(async i=>{const d=DATA[i];if(modelCache.has(d.key))return;await loadModel(d,false);}));
 updateGhosts();
}

class GhostViewer{
 constructor(canvas){this.canvas=canvas;this.scene=new THREE.Scene();this.camera=new THREE.PerspectiveCamera(30,1,.01,30);this.camera.position.set(0,.05,4.8);this.renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1));this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.scene.add(new THREE.HemisphereLight(0x8edbff,0x07101a,1.8));const l=new THREE.DirectionalLight(0xbdeaff,2.2);l.position.set(1,2,3);this.scene.add(l);this.group=null;this.target=null;this.resize();}
 resize(){const w=this.canvas.clientWidth||100,h=this.canvas.clientHeight||100;this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.renderer.setSize(w,h,false);}
 setModel(source,d){if(this.group)this.scene.remove(this.group);if(!source){this.group=null;return;}this.group=SkeletonUtils.clone(source);this.group.scale.multiplyScalar(.55);this.group.position.set(0,-.05,0);this.scene.add(this.group);this.target=d;}
 render(t){if(this.group){this.group.rotation.y=Math.sin(t*.00045)*.35+t*.00012;}this.renderer.render(this.scene,this.camera);}
}
function initGhosts(){ghostViewers=[new GhostViewer(ui.ghostLeft),new GhostViewer(ui.ghostRight)];}
function updateGhosts(){const prev=DATA[(currentIndex+DATA.length-1)%DATA.length],next=DATA[(currentIndex+1)%DATA.length];ghostViewers[0].setModel(modelCache.get(prev.key),prev);ghostViewers[1].setModel(modelCache.get(next.key),next);ui.prevName.textContent=prev.name;ui.nextName.textContent=next.name;}

function updateUI(d){
 ui.current.textContent=String(currentIndex+1).padStart(2,'0');ui.name.textContent=d.name;ui.latin.textContent=d.latin;ui.kicker.textContent=`${d.order.toUpperCase()} // ${d.family.toUpperCase()}`;
 ui.order.textContent=d.order;ui.family.textContent=d.family;ui.range.textContent=d.range;ui.diet.textContent=d.diet;ui.size.textContent=d.size;ui.role.textContent=d.role;ui.life.textContent=d.life;ui.summary.textContent=d.summary;ui.fieldNote.textContent=d.note;
 ui.prevName.textContent=DATA[(currentIndex+7)%8].name;ui.nextName.textContent=DATA[(currentIndex+1)%8].name;
 [...ui.list.children].forEach((el,idx)=>el.classList.toggle('active',idx===currentIndex));
 document.querySelectorAll('.anatomy-chip').forEach((el,i)=>{el.textContent=d.anatomy[i][0];el.dataset.index=i;});
}
function iconFor(key){return ({butterfly:'✦',bee:'◌',ant:'•',dragonfly:'⌁',ladybug:'●',housefly:'◇',cockroach:'◈',mosquito:'╱'})[key]||'✦';}

function showScan(part,text,meta='ANATOMY NODE'){ui.scanName.textContent=part;ui.scanText.textContent=text;ui.scanMetaA.textContent=meta;ui.scanMetaB.textContent='TOUCH / TAP';ui.scan.classList.add('open');}
function scanAnatomy(index){const d=DATA[currentIndex],p=d.anatomy[index%3];showScan(p[0],p[1],p[2]);pulseAnatomy(index);}
function pulseAnatomy(index){anatomyNodes.forEach((n,i)=>{n.visible=i===index;});setTimeout(()=>anatomyNodes.forEach(n=>n.visible=false),1800);}

function classifyHit(hit,point){
 const d=DATA[currentIndex];
 const n=(hit.name||'').toLowerCase();
 if(n.includes('wing')||n.includes('buttwi'))return 1;
 if(n.includes('antenna')||n.includes('head')||n.includes('eye')||n.includes('mandib'))return 0;
 if(n.includes('abdomen')||n.includes('tail')||n.includes('body'))return 2;
 const local=specimenGroup.worldToLocal(point.clone());
 const box=new THREE.Box3().setFromObject(specimenGroup);
 // Use the model's current local vertical position so rotation/zoom does not
 // change the anatomy mapping as it did in V5.
 const localBox=new THREE.Box3().setFromObject(specimenGroup);
 const y=(local.y-localBox.min.y)/(localBox.max.y-localBox.min.y||1);
 if(y>.68)return 0; if(y<.33)return 2; return 1;
}
function fallbackScanFromScreen(clientX,clientY){
 const rect=ui.canvas.getBoundingClientRect();
 const x=(clientX-rect.left)/rect.width,y=(clientY-rect.top)/rect.height;
 if(x<.22||x>.78||y<.18||y>.72)return;
 scanAnatomy(y<.39?0:y>.58?2:1);
}

function bindCanvasInteractions(){
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null;
 ui.canvas.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,t:performance.now()};});
 ui.canvas.addEventListener('pointerup',e=>{
   if(!specimenGroup||!down)return;const dx=e.clientX-down.x,dy=e.clientY-down.y;if(Math.hypot(dx,dy)>14||performance.now()-down.t>700){down=null;return;}
   const rect=ui.canvas.getBoundingClientRect();pointer.x=((e.clientX-rect.left)/rect.width)*2-1;pointer.y=-((e.clientY-rect.top)/rect.height)*2+1;raycaster.setFromCamera(pointer,camera);
   const hits=raycaster.intersectObject(specimenGroup,true);
   if(hits.length){scanAnatomy(classifyHit(hits[0].object,hits[0].point));}else{fallbackScanFromScreen(e.clientX,e.clientY);}
   down=null;
 });
}

function setResearchPhase(next,announce=true){
 researchPhase=(next+3)%3;
 const root=document.body;root.dataset.researchPhase=String(researchPhase+1);
 const title=$('scrollTitle'),sub=$('scrollSub'),stage=$('scrollStage');
 const d=DATA[currentIndex];
 const states=[
  ['01','SPECIMEN IN FOCUS','Primary 3D specimen // observe surface, motion and silhouette.','OBSERVATION 01','Specimen in focus',d.summary],
  ['02','MACRO CLOSE-UP','Inspecting anatomical structures & fine surface detail.','MACRO 02','Macro close-up',d.anatomy[0][1]],
  ['03','ECOLOGICAL IMPACT','Field note // connect this specimen to the ecosystem around it.','FIELD NOTE 03','Ecological impact',d.note]
 ];
 const state=states[researchPhase];
 if(stage) stage.textContent=state[0];
 if(title) title.textContent=state[1];
 if(sub) sub.textContent=state[2];
 document.documentElement.style.setProperty('--research-progress',String(researchPhase/2));
 targetCameraZ=researchPhase===1?2.45:researchPhase===2?4.25:3.85;
 targetCameraY=researchPhase===1?.08:researchPhase===2?.28:.18;
 targetTargetY=researchPhase===1?.15:researchPhase===2?.08:.03;
 cameraTween=1;
 root.classList.remove('research-shift'); void root.offsetWidth; root.classList.add('research-shift');
 if(announce){const obs=document.querySelector('.research-observer'); if(obs){obs.classList.add('show'); clearTimeout(window.__researchObserverTimer); window.__researchObserverTimer=setTimeout(()=>obs.classList.remove('show'),1800);}}
}
function bindSwipe(){
 const el=$('viewer');let sx=0,sy=0,st=0;
 el.addEventListener('wheel',e=>{
   if(e.ctrlKey)return;
   if(performance.now()<researchWheelLock)return;
   if(Math.abs(e.deltaY)<Math.abs(e.deltaX)||Math.abs(e.deltaY)<12)return;
   e.preventDefault(); e.stopPropagation(); researchWheelLock=performance.now()+520;
   playUiSound('swipe'); setResearchPhase(researchPhase+(e.deltaY>0?1:-1));
 },{passive:false,capture:true});
 el.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;sx=e.touches[0].clientX;sy=e.touches[0].clientY;st=performance.now();},{passive:true});
 el.addEventListener('touchend',e=>{if(!sx)return;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy,dur=performance.now()-st;sx=0;
   if(dur<900&&Math.max(Math.abs(dx),Math.abs(dy))>48){if(Math.abs(dx)>Math.abs(dy)*1.18){showSpecimen(currentIndex+(dx<0?1:-1));}else if(Math.abs(dy)>Math.abs(dx)*1.12){playUiSound('swipe'); setResearchPhase(researchPhase+(dy>0?1:-1));}}
 },{passive:true});
 setResearchPhase(0,false); const obs=document.querySelector('.research-observer'); if(obs){obs.classList.add('show'); setTimeout(()=>obs.classList.remove('show'),2200);}
}
function buildList(){DATA.forEach((d,i)=>{const row=document.createElement('button');row.className='specimen-item';row.innerHTML=`<span class="specimen-num">${String(i+1).padStart(2,'0')}</span><span><b class="specimen-name">${d.name}</b><em class="specimen-latin">${d.latin}</em></span><span class="specimen-dot">${iconFor(d.key)}</span>`;row.addEventListener('click',()=>showSpecimen(i));ui.list.appendChild(row);});}
function bindUI(){
 $('prevBtn').addEventListener('click',()=>playUiSound('click'); showSpecimen(currentIndex-1));$('nextBtn').addEventListener('click',()=>playUiSound('click'); showSpecimen(currentIndex+1));
 $('resetBtn').addEventListener('click',()=>{camera.position.set(0,.28,4.45);targetCameraZ=4.45;targetCameraY=.28;targetTargetY=.03;cameraTween=0;controls.target.set(0,.03,0);controls.update();});
 $('autoRotateBtn').addEventListener('click',e=>{autoRotate=!autoRotate;e.currentTarget.classList.toggle('on',autoRotate);e.currentTarget.querySelector('span').textContent=autoRotate?'ON':'OFF';});
 $('detailsBtn').addEventListener('click',()=>{ui.profile.classList.toggle('expanded');$('detailsBtn').textContent=ui.profile.classList.contains('expanded')?'COLLAPSE −':'EXPAND +';});
 $('closeScan').addEventListener('click',()=>ui.scan.classList.remove('open'));$('anatomyHint').addEventListener('click',()=>scanAnatomy(0));
 document.querySelectorAll('.anatomy-chip').forEach((b,i)=>b.addEventListener('click',()=>scanAnatomy(i)));
 $('drawerClose').addEventListener('click',()=>ui.drawer.classList.remove('open'));
 document.querySelectorAll('.principle').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.principle').forEach(x=>x.classList.remove('active'));b.classList.add('active');const mode=b.dataset.mode;if(mode==='observe')ui.drawer.classList.remove('open');if(mode==='learn'){ui.drawerTitle.textContent='Decode the specimen';ui.drawerBody.innerHTML=`<strong>${DATA[currentIndex].name}</strong><br><br>${DATA[currentIndex].summary}<br><br>Rotate, pinch to zoom, swipe to change specimens, then touch an anatomical region for a live scan.`;ui.drawer.classList.add('open');}if(mode==='protect'){ui.drawerTitle.textContent='Tiny life. Big systems.';ui.drawerBody.innerHTML=`<strong>Why insects matter</strong><br><br>${DATA[currentIndex].note}<br><br>Every specimen in this catalogue represents a small component of a much larger ecological network.`;ui.drawer.classList.add('open');}}));
 window.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')playUiSound('click'); showSpecimen(currentIndex-1);if(e.key==='ArrowRight')playUiSound('click'); showSpecimen(currentIndex+1);if(e.key==='Escape')ui.scan.classList.remove('open');});
}

async function showSpecimen(i){
 currentIndex=(i+DATA.length)%DATA.length;const d=DATA[currentIndex];activeModelToken++;const token=activeModelToken;updateUI(d);setResearchPhase(researchPhase,false);clearModel();
 placeholderGroup=buildPlaceholder(d);placeholderGroup.scale.setScalar(d.key==='butterfly'?1.12:1);scene.add(placeholderGroup);
 const loaded=await loadModel(d,false);if(token!==activeModelToken)return;
 if(loaded){specimenGroup=loaded;scene.add(specimenGroup);placeholderGroup.visible=false;setupAnimation(specimenGroup,d);setAnatomyNodes(specimenGroup,d);}
 else{setStatusFallback();}
 updateGhosts();preloadNeighbors();
}
function setStatusFallback(){document.body.dataset.modelState='fallback';}
function startRender(){requestAnimationFrame(render);}
function render(){requestAnimationFrame(render);const dt=Math.min(clock.getDelta(),.05),t=performance.now();if(specimenGroup&&autoRotate)specimenGroup.rotation.y+=.0038; if(cameraTween>0){camera.position.z=THREE.MathUtils.lerp(camera.position.z,targetCameraZ,.075);camera.position.y=THREE.MathUtils.lerp(camera.position.y,targetCameraY,.075);controls?.target.set(0,targetTargetY,0);cameraTween-=.035;if(cameraTween<=0)cameraTween=0;}if(placeholderGroup){placeholderGroup.rotation.y+=autoRotate?.0026:0;placeholderGroup.position.y=Math.sin(t*.0013)*.035;}if(mixer) mixer.update(dt);
 if(specimenGroup && wingAnimTargets.length){
   wingAnimTargets.forEach(w=>{w.object.rotation.z=w.base.z+Math.sin(t*.018+w.phase)*w.amp; w.object.rotation.y=w.base.y+Math.cos(t*.014+w.phase)*w.amp*.16;});
 }
 updatePinPositions();ghostViewers.forEach(g=>g.render(t));if(controls)controls.update();if(renderer&&!rendererFailed)renderer.render(scene,camera);}

async function preloadAllBackground(){
 const queue=DATA.filter(d=>!modelCache.has(d.key)); let cursor=0;
 const worker=async()=>{while(cursor<queue.length){const d=queue[cursor++];await loadModel(d,false);if(d===DATA[(currentIndex+1)%DATA.length]||d===DATA[(currentIndex+DATA.length-1)%DATA.length])updateGhosts();}};
 await Promise.all([worker(),worker()]);
}

function hidePreloader(){document.body.classList.add('ready');setTimeout(()=>ui.preloader.remove(),520);}
async function boot(){
 buildList();bindUI();initScene();initGhosts();bindCanvasInteractions();bindSwipe();startRender();
 updatePreloader(8,'INITIALISING OPTICAL ARRAY','GENESIS LAB // BOOT');
 const first=DATA[0],next=DATA[1],prev=DATA[DATA.length-1];
 updatePreloader(12,'PRELOADING PRIMARY SPECIMEN','LOCAL GLB // DRACO');
 const [loaded,loadedNext,loadedPrev]=await Promise.all([loadModel(first,true),loadModel(next,false),loadModel(prev,false)]);
 updatePreloader(92,'CALIBRATING 3D STAGE','LIGHTING // SHADOW // CAMERA');
 await showSpecimen(0);
 updateGhosts();
 updatePreloader(100,'STAGE READY','INTERACTIVE 3D // TOUCH ENABLED');
 await new Promise(r=>setTimeout(r,220));hidePreloader();booted=true;
 // Remaining specimens continue decoding in the background after first paint.
 preloadAllBackground();
}
boot().catch(err=>{console.error('[INSECTA] Fatal boot error',err);document.body.dataset.modelState='boot-error';updatePreloader(100,'INTERFACE ONLINE — 3D SAFE MODE','SYSTEM');setTimeout(hidePreloader,650);});
