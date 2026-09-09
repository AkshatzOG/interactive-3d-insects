import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/controls/OrbitControls.js";

const DATA = [
 {key:"butterfly",name:"Butterfly",latin:"Danaus plexippus",order:"Lepidoptera",family:"Nymphalidae",range:"Worldwide",diet:"Nectar",size:"8.5–10.5 cm",role:"Pollinator",life:"2–6 weeks adult",color:0xffa63d,note:"Pollination, food webs and seasonal migration make butterflies valuable ecological indicators.",summary:"A pollinator whose wing scales create visual signalling, camouflage and thermoregulation."},
 {key:"bee",name:"Honey Bee",latin:"Apis mellifera",order:"Hymenoptera",family:"Apidae",range:"Worldwide",diet:"Nectar + pollen",size:"12–15 mm",role:"Pollinator",life:"~6 weeks worker",color:0xf1b84b,note:"Bees support flowering plant reproduction and form tightly coordinated social colonies.",summary:"A social pollinator with a specialised pollen basket and complex colony communication."},
 {key:"ant",name:"Ant",latin:"Formica rufa",order:"Hymenoptera",family:"Formicidae",range:"Europe + Asia",diet:"Omnivorous",size:"4–9 mm",role:"Soil engineer",life:"Weeks–years",color:0xb46d45,note:"Ants aerate soil, redistribute nutrients and help shape microhabitats.",summary:"A colony-driven soil engineer with extreme cooperative behaviour and specialised caste roles."},
 {key:"dragonfly",name:"Dragonfly",latin:"Anax imperator",order:"Odonata",family:"Aeshnidae",range:"Africa + Eurasia",diet:"Predatory insects",size:"66–84 mm",role:"Predator",life:"Weeks–months adult",color:0x54bdc4,note:"Dragonflies are efficient aerial predators and useful signals of freshwater ecosystem health.",summary:"A precision aerial predator with independent wing control and exceptional visual acuity."},
 {key:"ladybug",name:"Ladybird",latin:"Coccinella septempunctata",order:"Coleoptera",family:"Coccinellidae",range:"Northern Hemisphere",diet:"Aphids",size:"5–8 mm",role:"Biocontrol",life:"1 year",color:0xe14f48,note:"Ladybirds help regulate aphid populations and can protect crops naturally.",summary:"A compact beetle whose warning colours advertise chemical defences to predators."},
 {key:"housefly",name:"House Fly",latin:"Musca domestica",order:"Diptera",family:"Muscidae",range:"Worldwide",diet:"Liquids / decaying matter",size:"6–7 mm",role:"Decomposer",life:"15–30 days",color:0x9fb7be,note:"Flies recycle organic matter and transfer nutrients through food webs.",summary:"A rapid-lifecycle decomposer with halteres that stabilise flight and compound eyes for motion detection."},
 {key:"cockroach",name:"Cockroach",latin:"Periplaneta americana",order:"Blattodea",family:"Blattidae",range:"Worldwide",diet:"Omnivorous",size:"34–53 mm",role:"Decomposer",life:"1–2 years",color:0x9a704e,note:"Cockroaches are resilient detritivores that participate in nutrient cycling.",summary:"A resilient detritivore built around a flexible exoskeleton, sensitive antennae and rapid locomotion."},
 {key:"mosquito",name:"Mosquito",latin:"Aedes aegypti",order:"Diptera",family:"Culicidae",range:"Tropical + subtropical",diet:"Nectar / blood (female)",size:"3–6 mm",role:"Pollinator / vector",life:"~2–4 weeks",color:0x7182b6,note:"Mosquitoes occupy aquatic and terrestrial food webs; some species are important disease vectors.",summary:"A lightweight dipteran with a specialised proboscis and sensory antennae tuned to chemical cues."}
];

const MODEL_CANDIDATES = key => [
 `./models/${key}.glb`,
 `./models/${key}.gltf`,
 `./models/${key}.GLB`,
 `./models/${key.replace("housefly","fly")}.glb`,
 `./models/${key.replace("ladybug","ladybird")}.glb`,
 `./models/${key.replace("mosquito","mosquito_3d_model_free")}.glb`
];

const $ = id => document.getElementById(id);
const ui = {
 canvas:$("mainCanvas"), status:$("modelStatus"), loadLabel:$("loadLabel"), loadPercent:$("loadPercent"),
 name:$("specimenName"), latin:$("scientificName"), kicker:$("captionKicker"), current:$("currentIndex"),
 order:$("taxOrder"), family:$("taxFamily"), range:$("taxRange"), diet:$("taxDiet"), size:$("taxSize"), role:$("taxRole"), life:$("taxLife"),
 summary:$("profileSummary"), prevName:$("prevName"), nextName:$("nextName"), prevGlyph:$("prevGlyph"), nextGlyph:$("nextGlyph"),
 list:$("specimenList"), fieldNote:$("fieldNote"), scan:$("scanCard"), scanName:$("scanName"), scanText:$("scanText"), scanMetaA:$("scanMetaA"), scanMetaB:$("scanMetaB"),
 drawer:$("infoDrawer"), drawerTitle:$("drawerTitle"), drawerBody:$("drawerBody"), profile:$("profileCard")
};

let scene, camera, renderer, controls, loader, dracoLoader;
let specimenGroup = null, placeholderGroup = null;
let currentIndex = 0, activeModelToken = 0, autoRotate = true;
const modelCache = new Map();

function initScene(){
 scene = new THREE.Scene();
 camera = new THREE.PerspectiveCamera(38, ui.canvas.clientWidth / ui.canvas.clientHeight, 0.01, 100);
 camera.position.set(0,0.35,4.3);
 renderer = new THREE.WebGLRenderer({canvas:ui.canvas,alpha:true,antialias:true,powerPreference:"high-performance"});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
 renderer.setSize(ui.canvas.clientWidth, ui.canvas.clientHeight,false);
 renderer.outputColorSpace = THREE.SRGBColorSpace;

 scene.add(new THREE.HemisphereLight(0x8ddcff,0x07111e,2.1));
 const key = new THREE.DirectionalLight(0x9fdfff,2.6); key.position.set(2,3,4); scene.add(key);
 const rim = new THREE.PointLight(0x3ca9ff,16,8,2); rim.position.set(-2,1.7,1); scene.add(rim);
 const warm = new THREE.PointLight(0xffbb72,6,6,2); warm.position.set(1.5,-.8,2); scene.add(warm);

 controls = new OrbitControls(camera, renderer.domElement);
 controls.enableDamping = true; controls.dampingFactor=.08; controls.enablePan=false;
 controls.minDistance=2.2; controls.maxDistance=6; controls.target.set(0,0.05,0);

 loader = new GLTFLoader();
 dracoLoader = new DRACOLoader();
 dracoLoader.setDecoderPath("https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/libs/draco/");
 dracoLoader.preload();
 loader.setDRACOLoader(dracoLoader);
 window.addEventListener("resize", resize);
 resize();
 animate();
}

function resize(){
 const w = ui.canvas.clientWidth || 800, h = ui.canvas.clientHeight || 600;
 camera.aspect = w/h; camera.updateProjectionMatrix();
 renderer.setSize(w,h,false);
}

function makeMat(color, rough=.45, metal=.18, transparent=false, opacity=1){
 return new THREE.MeshPhysicalMaterial({color,roughness:rough,metalness:metal,clearcoat:.45,clearcoatRoughness:.25,transparent,opacity});
}
function limb(a,b,r,color){
 const dir = new THREE.Vector3().subVectors(b,a), len=dir.length();
 const geo = new THREE.CylinderGeometry(r,r*.88,len,8);
 const m = new THREE.Mesh(geo,makeMat(color,.55,.2));
 const mid = new THREE.Vector3().addVectors(a,b).multiplyScalar(.5); m.position.copy(mid);
 m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize()); return m;
}
function segment(pos,scale,color){
 const g = new THREE.Group(); const m = new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),makeMat(color,.38,.2));
 m.scale.set(...scale); m.position.copy(pos); g.add(m); return g;
}
function wingMesh(name,shape,color,opacity=.88){
 const g=new THREE.Group(); g.name=name;
 const s=new THREE.Shape(); s.moveTo(0,0); shape.forEach(p=>s.lineTo(p[0],p[1])); s.closePath();
 const geo=new THREE.ShapeGeometry(s); const mat=new THREE.MeshPhysicalMaterial({color,transparent:true,opacity,side:THREE.DoubleSide,roughness:.28,metalness:.05,emissive:color,emissiveIntensity:.07});
 const m=new THREE.Mesh(geo,mat); m.rotation.x=Math.PI/2; g.add(m); return g;
}
function buildPlaceholder(d){
 const root=new THREE.Group(); root.name="ProceduralPreview";
 const bodyColor=d.color, dark=0x1a1c22, eye=0x8cf0ff;
 root.userData.specimen=d.key;
 const thorax=segment(new THREE.Vector3(0,0,0),[.48,.72,.4],bodyColor); root.add(thorax);
 const abdomen=segment(new THREE.Vector3(0,-.77,.02),[.33,.75,.3],dark); root.add(abdomen);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.3,18,14),makeMat(d.color,.32,.22)); head.position.set(0,.63,.02); root.add(head);
 const e1=new THREE.Mesh(new THREE.SphereGeometry(.055,12,10),makeMat(eye,.2,.6)); e1.position.set(-.12,.7,.25); const e2=e1.clone(); e2.position.x=.12; root.add(e1,e2);

 for(let i=0;i<3;i++){
   const side=i-1; root.add(limb(new THREE.Vector3(0,-.12-i*.22,0),new THREE.Vector3(.78*side,-.34-i*.25,.03),.045,d.color));
   root.add(limb(new THREE.Vector3(0,-.12-i*.22,0),new THREE.Vector3(-.78*side,-.34-i*.25,.03),.045,d.color));
 }
 const antenna1=limb(new THREE.Vector3(-.12,.74,.02),new THREE.Vector3(-.38,1.15,.03),.025,d.color);
 const antenna2=limb(new THREE.Vector3(.12,.74,.02),new THREE.Vector3(.38,1.15,.03),.025,d.color); root.add(antenna1,antenna2);

 if(d.key==="butterfly"||d.key==="dragonfly"){
   const c=d.key==="butterfly"?0xffa63d:0x64c9d7;
   const spans=d.key==="butterfly"?[[[0,.1],[-1.3,.95],[-1.7,.3],[-.85,-.18]],[[0,.1],[1.3,.95],[1.7,.3],[.85,-.18]],[[-.05,-.1],[-1.05,-.55],[-1.2,-1.25],[-.35,-.55]],[[.05,-.1],[1.05,-.55],[1.2,-1.25],[.35,-.55]]]:[[[0,.15],[-1.7,.65],[-1.35,.1],[-.2,-.15]],[[0,.15],[1.7,.65],[1.35,.1],[.2,-.15]]];
   spans.forEach((pts,i)=>{const w=wingMesh(i<2?"wingUpper":"wingLower",pts,c,.82); w.position.y=i<2?.2:-.05; root.add(w);});
 } else if(d.key==="bee"){
   for(const x of [-.5,.5]){ const w=new THREE.Mesh(new THREE.SphereGeometry(1,24,12),new THREE.MeshPhysicalMaterial({color:0xdff6ff,transparent:true,opacity:.25,side:THREE.DoubleSide,roughness:.15})); w.scale.set(.65,.06,.28); w.position.set(x*.55,.2,.03); w.rotation.z=x*.25; root.add(w); }
 } else if(d.key==="ladybug"){
   const shell=new THREE.Mesh(new THREE.SphereGeometry(.85,32,18),makeMat(0xd84a46,.3,.1)); shell.scale.set(1.1,.55,.55); shell.position.y=.1; root.add(shell);
   for(const x of [-.45,0,.45]) for(const z of [-.45,.45]){const dot=new THREE.Mesh(new THREE.SphereGeometry(.1,10,8),makeMat(0x16181f,.25,.1)); dot.position.set(x*.8,.25,z*.6); root.add(dot);}
 } else if(d.key==="mosquito"||d.key==="housefly"||d.key==="cockroach"){
   const wingsColor=0xbfdfff;
   for(const x of [-.55,.55]){const w=new THREE.Mesh(new THREE.PlaneGeometry(.95,.5),new THREE.MeshPhysicalMaterial({color:wingsColor,transparent:true,opacity:.16,side:THREE.DoubleSide,roughness:.2})); w.position.set(x*.55,.4,.0); w.rotation.z=x*.35; w.rotation.x=-.2; root.add(w);}
 }
 root.rotation.x=.08; return root;
}

async function tryLoadGLB(d, token){
  const path = `./models/${d.key === "mosquito" ? "mosquito_3d_model_free" : d.key}.glb`;
  return await new Promise(resolve => {
    setStatus("DECODING SPECIMEN", "…");
    loader.load(path, gltf => {
      if(token !== activeModelToken){ resolve(null); return; }
      const g=gltf.scene;
      g.name=`GLB_${d.key}`;
      normalizeModel(g);
      attachAnatomyHooks(g,d);
      console.info(`[INSECTA] Loaded ${d.name}: ${path}`);
      resolve(g);
    }, xhr => {
      if(xhr.total){
        const pct=Math.round(xhr.loaded/xhr.total*100);
        setStatus("LOADING SPECIMEN", `${pct}%`);
      }
    }, error => {
      console.error(`[INSECTA] Failed to load ${d.name} from ${path}`, error);
      setStatus("MODEL LOAD ERROR", "SEE CONSOLE");
      resolve(null);
    });
  });
}

function normalizeModel(g){
 const box=new THREE.Box3().setFromObject(g), size=box.getSize(new THREE.Vector3()), center=box.getCenter(new THREE.Vector3());
 const maxDim=Math.max(size.x,size.y,size.z)||1; const s=2.0/maxDim;
 g.scale.setScalar(s); g.position.sub(center.multiplyScalar(s)); g.position.y-=.18;
 g.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=false;o.frustumCulled=true;}});
}

function attachAnatomyHooks(g,d){
 g.traverse(o=>{
   if(!o.isMesh) return;
   const n=(o.name||"").toLowerCase();
   if(n.includes("wing")||n.includes("antenna")||n.includes("head")||d.key!=="butterfly"){
     o.userData.scanType = n.includes("wing") ? "WING SURFACE" : n.includes("antenna") ? "SENSORY ANTENNA" : n.includes("head") ? "HEAD + EYES" : "SPECIMEN SURFACE";
   }
 });
}

function setStatus(label,pct){ui.loadLabel.textContent=label; ui.loadPercent.textContent=pct}
function clearModel(){
  if(specimenGroup) scene.remove(specimenGroup);
  if(placeholderGroup){ scene.remove(placeholderGroup); placeholderGroup=null; }
  specimenGroup=null;
}

async function showSpecimen(i){
 currentIndex=(i+DATA.length)%DATA.length; const d=DATA[currentIndex]; activeModelToken++;
 const token=activeModelToken;
 updateUI(d);
 clearModel();

 placeholderGroup=buildPlaceholder(d);
 placeholderGroup.scale.setScalar(d.key==="butterfly"?1.16:1.05);
 scene.add(placeholderGroup);
 setStatus("LIVE PREVIEW","100%");
 requestAnimationFrame(()=>setStatus("SCANNING ASSET","…"));

 const cached=modelCache.get(d.key);
 if(cached){
   specimenGroup=cached; scene.add(specimenGroup); placeholderGroup.visible=false; setStatus("3D ASSET READY","100%");
   return;
 }
 const loaded=await tryLoadGLB(d,token);
 if(token!==activeModelToken) return;
 if(loaded){
   modelCache.set(d.key,loaded);
   specimenGroup=loaded; scene.add(specimenGroup); placeholderGroup.visible=false; setStatus("3D ASSET READY","100%");
 }else{
   setStatus("LIVE FALLBACK","100%");
 }
 preloadNeighbors();
}

function preloadNeighbors(){
  [DATA[(currentIndex+1)%8],DATA[(currentIndex+7)%8]].forEach(async d=>{
    if(modelCache.has(d.key)) return;
    const path=`./models/${d.key === "mosquito" ? "mosquito_3d_model_free" : d.key}.glb`;
    loader.load(path, gltf=>{
      const g=gltf.scene; normalizeModel(g); attachAnatomyHooks(g,d); modelCache.set(d.key,g);
      console.info(`[INSECTA] Preloaded ${d.name}`);
    }, undefined, error=>console.warn(`[INSECTA] Preload skipped ${d.name}`,error));
  });
}

function updateUI(d){
 ui.current.textContent=String(currentIndex+1).padStart(2,"0"); ui.name.textContent=d.name; ui.latin.textContent=d.latin;
 ui.kicker.textContent=`${d.order.toUpperCase()} // ${d.family.toUpperCase()}`;
 ui.order.textContent=d.order; ui.family.textContent=d.family; ui.range.textContent=d.range;
 ui.diet.textContent=d.diet; ui.size.textContent=d.size; ui.role.textContent=d.role; ui.life.textContent=d.life; ui.summary.textContent=d.summary;
 ui.fieldNote.textContent=d.note;
 const p=DATA[(currentIndex+7)%8], n=DATA[(currentIndex+1)%8]; ui.prevName.textContent=p.name; ui.nextName.textContent=n.name;
 ui.prevGlyph.textContent=iconFor(p.key); ui.nextGlyph.textContent=iconFor(n.key);
 [...ui.list.children].forEach((el,idx)=>el.classList.toggle("active",idx===currentIndex));
}
function iconFor(key){return ({butterfly:"✦",bee:"◌",ant:"•",dragonfly:"⌁",ladybug:"●",housefly:"◇",cockroach:"◈",mosquito:"╱"})[key]||"✦"}

function showScan(label,text,metaA="ANATOMY",metaB="INTERACTIVE NODE"){
 ui.scanName.textContent=label; ui.scanText.textContent=text; ui.scanMetaA.textContent=metaA; ui.scanMetaB.textContent=metaB; ui.scan.classList.add("open");
}
function bindCanvasInteractions(){
  const raycaster=new THREE.Raycaster();
  const pointer=new THREE.Vector2();
  ui.canvas.addEventListener("pointerup",event=>{
    if(!specimenGroup) return;
    const rect=ui.canvas.getBoundingClientRect();
    pointer.x=((event.clientX-rect.left)/rect.width)*2-1;
    pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
    raycaster.setFromCamera(pointer,camera);
    const hits=raycaster.intersectObject(specimenGroup,true);
    if(!hits.length) return;
    const d=DATA[currentIndex];
    const hit=hits[0].object;
    const scanType=hit.userData.scanType || (d.key==="butterfly"?"WING SURFACE":"SPECIMEN SURFACE");
    const text=d.key==="butterfly"?"Wing scales interact with light at microscopic scale, creating the specimen's characteristic colour.":`${d.name} anatomy detected. Rotate the specimen to inspect its structure.`;
    showScan(scanType,text,"ANATOMY","3D RAYCAST");
  });
}
function buildList(){
 DATA.forEach((d,i)=>{
   const row=document.createElement("button"); row.className="specimen-item"; row.innerHTML=`<span class="specimen-num">${String(i+1).padStart(2,"0")}</span><span><b class="specimen-name">${d.name}</b><em class="specimen-latin">${d.latin}</em></span><span class="specimen-dot">${iconFor(d.key)}</span>`;
   row.addEventListener("click",()=>showSpecimen(i)); ui.list.appendChild(row);
 });
}

function bindUI(){
 $("prevBtn").addEventListener("click",()=>showSpecimen(currentIndex-1));
 $("nextBtn").addEventListener("click",()=>showSpecimen(currentIndex+1));
 $("resetBtn").addEventListener("click",()=>{camera.position.set(0,.35,4.3);controls.target.set(0,.05,0);controls.update()});
 $("autoRotateBtn").addEventListener("click",e=>{autoRotate=!autoRotate;e.currentTarget.classList.toggle("on",autoRotate);e.currentTarget.innerHTML=`AUTO ROTATE <span>${autoRotate?"ON":"OFF"}</span>`});
 $("detailsBtn").addEventListener("click",()=>{ui.profile.classList.toggle("expanded");$("detailsBtn").textContent=ui.profile.classList.contains("expanded")?"COLLAPSE −":"EXPAND +"});
 $("closeScan").addEventListener("click",()=>ui.scan.classList.remove("open"));
 $("anatomyHint").addEventListener("click",()=>{const d=DATA[currentIndex];showScan(d.key==="butterfly"?"WING SURFACE":"SPECIMEN ANATOMY",d.key==="butterfly"?"Touch a wing to reveal its structural colour story.":`${d.name} — interact with the model to inspect anatomy and behaviour.`)});
 $("drawerClose").addEventListener("click",()=>ui.drawer.classList.remove("open"));
 document.querySelectorAll(".principle").forEach(b=>b.addEventListener("click",()=>{
   document.querySelectorAll(".principle").forEach(x=>x.classList.remove("active")); b.classList.add("active");
   const mode=b.dataset.mode;
   if(mode==="observe") ui.drawer.classList.remove("open");
   if(mode==="learn"){ui.drawerTitle.textContent="Decode the specimen";ui.drawerBody.innerHTML=`<strong>${DATA[currentIndex].name}</strong><br><br>${DATA[currentIndex].summary}<br><br>Rotate the 3D specimen, expand the biological profile, and tap the anatomy hotspot.`;ui.drawer.classList.add("open")}
   if(mode==="protect"){ui.drawerTitle.textContent="Tiny life. Big systems.";ui.drawerBody.innerHTML=`<strong>Why insects matter</strong><br><br>${DATA[currentIndex].note}<br><br>Every specimen in this catalogue represents a small component of a much larger ecological network.`;ui.drawer.classList.add("open")}
 }));
 window.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")showSpecimen(currentIndex-1);if(e.key==="ArrowRight")showSpecimen(currentIndex+1)});
}

function animate(){
 requestAnimationFrame(animate);
 if(specimenGroup && autoRotate) specimenGroup.rotation.y += .0045;
 if(placeholderGroup){placeholderGroup.rotation.y += autoRotate?.0032:0; placeholderGroup.position.y=Math.sin(performance.now()*.0014)*.035;}
 controls.update(); renderer.render(scene,camera);
}

function clockTick(){const d=new Date();$("clock").textContent=d.toLocaleTimeString([], {hour12:false});}
function boot(){
  try{
    buildList(); bindUI(); initScene(); bindCanvasInteractions(); showSpecimen(0); clockTick(); setInterval(clockTick,1000);
  }catch(error){
    console.error("[INSECTA] Fatal startup error",error);
    setStatus("STARTUP ERROR","SEE CONSOLE");
  }
}
boot();
