/* INSECTA V14.2 — cache-busted, null-safe event bindings */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/controls/OrbitControls.js';
import * as SkeletonUtils from 'https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/utils/SkeletonUtils.js';

const DATA = [
 {key:'butterfly',name:'Butterfly',latin:'Danaus plexippus',order:'Lepidoptera',family:'Nymphalidae',range:'Worldwide',role:'Pollinator',diet:'Nectar',size:'8.5–10.5 cm',life:'2–6 weeks adult',color:0xffa63d,card:'butterfly.jpg',summary:'A pollinator whose wing scales create visual signalling, camouflage and thermoregulation.',note:'Pollination, food webs and seasonal migration make butterflies valuable ecological indicators.',anatomy:[['HEAD + ANTENNAE','Sensory antennae and compound eyes orient the butterfly toward odours, movement and light.','SENSORY SYSTEM'],['WING SURFACE','Microscopic wing scales scatter light and contribute to colour, signalling and camouflage.','FLIGHT SURFACE'],['THORAX + ABDOMEN','Flight muscles sit in the thorax while the abdomen contains major digestive and reproductive organs.','CORE BODY']]},
 {key:'bee',name:'Honey Bee',latin:'Apis mellifera',order:'Hymenoptera',family:'Apidae',range:'Worldwide',role:'Pollinator',diet:'Nectar + pollen',size:'12–15 mm',life:'~6 weeks worker',color:0xf1b84b,card:'bee.jpg',summary:'A social pollinator with a specialised pollen basket and complex colony communication.',note:'Bees support flowering plant reproduction and form tightly coordinated social colonies.',anatomy:[['HEAD + EYES','Compound eyes detect motion and colour while antennae provide chemical and tactile information.','SENSORY SYSTEM'],['WINGS + FLIGHT MUSCLES','Two pairs of wings are coupled in flight; rapid wing beats support hovering and precise navigation.','FLIGHT SYSTEM'],['ABDOMEN + STINGER','The abdomen houses digestive and reproductive organs; workers have a defensive stinger.','DEFENCE + CORE']]},
 {key:'ant',name:'Ant',latin:'Formica rufa',order:'Hymenoptera',family:'Formicidae',range:'Europe + Asia',role:'Soil engineer',diet:'Omnivorous',size:'4–9 mm',life:'Weeks–years',color:0xb46d45,card:'ant.jpg',summary:'A colony-driven soil engineer with extreme cooperative behaviour and specialised caste roles.',note:'Ants aerate soil, redistribute nutrients and help shape microhabitats.',anatomy:[['HEAD + MANDIBLES','The head carries sensory antennae and powerful mandibles used for feeding, defence and carrying.','SENSORY + TOOLS'],['THORAX + LEGS','The thorax anchors six jointed legs that provide traction and rapid ground locomotion.','LOCOMOTION'],['ABDOMEN','The abdomen contains major internal organs and chemical communication structures used by the colony.','CORE BODY']]},
 {key:'dragonfly',name:'Dragonfly',latin:'Anax imperator',order:'Odonata',family:'Aeshnidae',range:'Africa + Eurasia',role:'Predator',diet:'Predatory insects',size:'66–84 mm',life:'Weeks–months adult',color:0x54bdc4,card:'dragonfly.jpg',summary:'A precision aerial predator with independent wing control and exceptional visual acuity.',note:'Dragonflies are efficient aerial predators and useful signals of freshwater ecosystem health.',anatomy:[['HEAD + COMPOUND EYES','Huge compound eyes provide a wide visual field for tracking prey during aerial pursuit.','VISION SYSTEM'],['FOUR WINGS','Each wing can contribute independently to lift, braking and manoeuvring for precise aerial control.','FLIGHT SYSTEM'],['ABDOMEN','The long abdomen balances the body in flight and carries respiratory, digestive and reproductive systems.','CORE BODY']]},
 {key:'ladybug',name:'Ladybird',latin:'Coccinella septempunctata',order:'Coleoptera',family:'Coccinellidae',range:'Northern Hemisphere',role:'Biocontrol',diet:'Aphids',size:'5–8 mm',life:'1 year',color:0xe14f48,card:'ladybug.jpg',summary:'A compact beetle whose warning colours advertise chemical defences to predators.',note:'Ladybirds help regulate aphid populations and can protect crops naturally.',anatomy:[['HEAD + ANTENNAE','The small head carries compound eyes and short antennae that help locate prey and environmental cues.','SENSORY SYSTEM'],['ELYTRA + WINGS','The coloured wing covers protect folded flight wings beneath the hard beetle shell.','ARMOUR + FLIGHT'],['ABDOMEN + DEFENCE','The abdomen is protected by the elytra and can support chemical defence responses when threatened.','DEFENCE SYSTEM']]},
 {key:'housefly',name:'House Fly',latin:'Musca domestica',order:'Diptera',family:'Muscidae',range:'Worldwide',role:'Decomposer',diet:'Liquids / decaying matter',size:'6–7 mm',life:'15–30 days',color:0x9fb7be,card:'housefly.jpg',summary:'A rapid-lifecycle decomposer with halteres that stabilise flight and compound eyes for motion detection.',note:'Flies recycle organic matter and transfer nutrients through food webs.',anatomy:[['HEAD + COMPOUND EYES','Large compound eyes detect rapid changes in the visual field while antennae and mouthparts sample the environment.','SENSORY SYSTEM'],['WING + HALTERE','One functional wing pair drives flight; tiny halteres act as gyroscopic sensors for balance.','FLIGHT CONTROL'],['ABDOMEN','The segmented abdomen contains digestive and reproductive organs and supports the fly’s rapid lifecycle.','CORE BODY']]},
 {key:'cockroach',name:'Cockroach',latin:'Periplaneta americana',order:'Blattodea',family:'Blattidae',range:'Worldwide',role:'Decomposer',diet:'Omnivorous',size:'34–53 mm',life:'1–2 years',color:0x9a704e,card:'cockroach.jpg',summary:'A resilient detritivore built around a flexible exoskeleton, sensitive antennae and rapid locomotion.',note:'Cockroaches are resilient detritivores that participate in nutrient cycling.',anatomy:[['HEAD + ANTENNAE','Long antennae continuously sample chemical and tactile information around the animal.','SENSORY SYSTEM'],['THORAX + LEGS','The thorax anchors six powerful legs built for fast, low-profile movement across uneven surfaces.','LOCOMOTION'],['ABDOMEN + WINGS','The segmented abdomen protects internal organs; adult cockroaches may use their wings during movement.','CORE + FLIGHT']]},
 {key:'mosquito',name:'Mosquito',latin:'Aedes aegypti',order:'Diptera',family:'Culicidae',range:'Tropical + subtropical',role:'Pollinator / vector',diet:'Nectar / blood (female)',size:'3–6 mm',life:'~2–4 weeks',color:0x7182b6,card:'mosquito.jpg',summary:'A lightweight dipteran with a specialised proboscis and sensory antennae tuned to chemical cues.',note:'Mosquitoes occupy aquatic and terrestrial food webs; some species are important disease vectors.',anatomy:[['HEAD + ANTENNAE','Antennae and sensory palps detect odours, carbon dioxide and other cues that help locate hosts.','SENSORY SYSTEM'],['PROBOSCIS','The elongated mouthpart is specialised for piercing and feeding; females can take blood meals.','FEEDING SYSTEM'],['WINGS + ABDOMEN','A single wing pair provides flight while the abdomen expands to accommodate a blood meal and eggs.','FLIGHT + CORE']]}
];

const $=id=>document.getElementById(id);
const ui={
 preloader:$('preloader'),loadStage:$('loadStage'),loadPct:$('loadPct'),loadBar:$('loadBar'),canvas:$('mainCanvas'),
 title:$('specimenTitle'),latin:$('specimenLatin'),kicker:$('taxKicker'),no:$('specimenNo'),cards:$('cards'),
 researchBtn:$('researchToggle'),researchStep:$('researchStep'),researchTitle:$('researchTitle'),researchSub:$('researchSub'),researchStrip:$('researchStrip'),
 detail:$('detailHud'),detailTitle:$('detailTitle'),detailText:$('detailText'),detailMeta:$('detailMeta'),
 order:$('order'),family:$('family'),range:$('range'),role:$('role'),diet:$('diet'),size:$('size'),life:$('life'),summary:$('summary'),
 profile:$('profile'),infoPanel:$('infoPanel'),infoTitle:$('infoTitle'),infoText:$('infoText'),infoNote:$('infoNote'),infoDiet:$('infoDiet'),infoSize:$('infoSize'),infoLife:$('infoLife'),
 sound:$('soundBtn'),stageHint:$('stageHint')
};
let scene,camera,renderer,controls,loader,draco;
let lastTime=performance.now(),elapsed=0,index=0,research=0,autoRotate=true,soundOn=false,transitionLock=false;
let currentRig=null,currentModel=null,currentMixer=null;
let targetCam={z:5.2,y:.65,tx:0,ty:.65};
const cache=new Map(),loading=new Map(); let sharedLogoTexture=null;
const viewStates=[
 {id:'01',title:'WHOLE SPECIMEN',sub:'Full specimen · default presentation',mode:'whole'},
 {id:'02',title:'HEAD / SENSORY SYSTEM',sub:'Macro view · head, eyes & antennae',mode:'head'},
 {id:'03',title:'CORE BODY / LOCOMOTION',sub:'Macro view · thorax, abdomen & movement',mode:'body'},
 {id:'04',title:'WINGS / FLIGHT SURFACE',sub:'Macro view · wings, elytra & flight structures',mode:'wings'}
];
const audio={ctx:null,beep(type='click'){if(!soundOn)return;try{this.ctx??=new(window.AudioContext||window.webkitAudioContext)();this.ctx.resume();const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.connect(g);g.connect(this.ctx.destination);const t=this.ctx.currentTime;o.type='sine';o.frequency.setValueAtTime(type==='switch'?210:type==='pin'?640:420,t);o.frequency.exponentialRampToValueAtTime(type==='switch'?430:260,t+.1);g.gain.setValueAtTime(.018,t);g.gain.exponentialRampToValueAtTime(.001,t+.11);o.start(t);o.stop(t+.12);}catch{}}};
function setLoad(p,text){ui.loadPct.textContent=p+'%';ui.loadStage.textContent=text;ui.loadBar.style.width=p+'%';}
function pathFor(d){return `./models/${d.key==='mosquito'?'mosquito_3d_model_free':d.key}.glb`;}
function cloneScene(src){return SkeletonUtils.clone(src);}
function resize(){if(!renderer||!camera)return;const r=ui.canvas.parentElement.getBoundingClientRect();camera.aspect=Math.max(1,r.width)/Math.max(1,r.height);camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio||1,matchMedia('(max-width:820px)').matches?1.2:1.55));renderer.setSize(r.width,r.height,false);}
function initScene(){
 scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(31,1,.05,100);camera.position.set(0,.65,5.2);
 renderer=new THREE.WebGLRenderer({canvas:ui.canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
 scene.add(new THREE.HemisphereLight(0xc4eaff,0x05080d,1.0));
 const key=new THREE.DirectionalLight(0xfff0d7,2.9);key.position.set(4.3,6.8,4.8);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.near=.2;key.shadow.camera.far=24;key.shadow.camera.left=-6;key.shadow.camera.right=6;key.shadow.camera.top=6;key.shadow.camera.bottom=-6;key.shadow.bias=-.00025;scene.add(key);
 const fill=new THREE.DirectionalLight(0x76d9ff,1.35);fill.position.set(-4.5,3.2,3.7);scene.add(fill);
 const rim=new THREE.DirectionalLight(0xdaf4ff,1.5);rim.position.set(-2.5,4.2,-5.5);scene.add(rim);
 const warm=new THREE.PointLight(0xffb766,.75,9);warm.position.set(1.8,1.2,3);scene.add(warm);
 loader=new GLTFLoader();draco=new DRACOLoader();draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/libs/draco/');draco.preload();loader.setDRACOLoader(draco);
 controls=new OrbitControls(camera,ui.canvas);controls.enablePan=false;controls.enableDamping=true;controls.dampingFactor=.08;controls.minDistance=1.7;controls.maxDistance=6.4;controls.minPolarAngle=Math.PI*.30;controls.maxPolarAngle=Math.PI*.68;controls.target.set(0,.65,0);
 window.addEventListener('resize',resize,{passive:true});window.visualViewport?.addEventListener('resize',resize,{passive:true});resize();
}
function tuneMaterials(root){root.traverse(o=>{if(!o.isMesh)return;o.castShadow=true;o.receiveShadow=true;const mats=Array.isArray(o.material)?o.material:[o.material];for(const m of mats){if(!m)continue;if(m.map)m.map.colorSpace=THREE.SRGBColorSpace;if(m.color)m.color.set(0xffffff);if('roughness' in m)m.roughness=Math.max(.25,m.roughness??.5);if('metalness' in m)m.metalness=Math.min(.18,m.metalness??0);m.needsUpdate=true;}});}
function normalize(root,key){root.position.set(0,0,0);root.rotation.set(0,0,0);root.scale.setScalar(1);const box=new THREE.Box3().setFromObject(root),size=box.getSize(new THREE.Vector3());const target={butterfly:3.0,bee:2.75,ant:2.9,dragonfly:3.05,ladybug:2.8,housefly:2.9,cockroach:2.95,mosquito:2.95}[key]||2.9;const k=target/(Math.max(size.x,size.y,size.z)||1);root.scale.setScalar(k);root.userData.speciesKey=key;return root;}
function safeClips(animations){return (animations||[]).map(c=>{const tracks=(c.tracks||[]).filter(t=>t&&typeof t.createInterpolant==='function'&&t.times?.length&&t.values?.length);return tracks.length?new THREE.AnimationClip(c.name||'specimen',c.duration,tracks):null;}).filter(Boolean);}
function collectMotionNodes(root,key){const list=[];root.traverse(o=>{const n=(o.name||'').toLowerCase();let wing=/wing|wings|forewing|hindwing|wingroot|ala|haldtere|halter/.test(n);if(key==='dragonfly'&&/^plane\.00[1-4]/.test(n))wing=true;if(key==='mosquito'&&/wing|backwing|front wing|wing bottom/.test(n))wing=true;if(key==='housefly'&&/wing/.test(n))wing=true;if(key==='butterfly'&&/^butterfly\./.test(n))wing=true;if(wing)list.push({o,baseZ:o.rotation.z,baseX:o.rotation.x,phase:list.length*.71});});return list;}
function setupMotion(root,d){
 currentMixer=null;const clips=safeClips(root.userData.animations||[]);
 if(clips.length){try{currentMixer=new THREE.AnimationMixer(root);for(const clip of clips){const action=currentMixer.clipAction(clip);action.reset().play();}}catch(err){console.warn('Animation clips skipped for',d.key,err);currentMixer=null;}}
 root.userData.motionNodes=collectMotionNodes(root,d.key);
}
function buildFloatingStage(root,d){
 const rig=new THREE.Group();rig.name='SpecimenRig';
 const stage=new THREE.Group();stage.position.y=-.55;
 const lower=new THREE.Mesh(new THREE.CylinderGeometry(1.64,1.78,.22,96),new THREE.MeshStandardMaterial({color:0x0b1118,metalness:.86,roughness:.24}));lower.castShadow=true;lower.receiveShadow=true;stage.add(lower);
 const plate=new THREE.Mesh(new THREE.CylinderGeometry(1.48,1.55,.075,96),new THREE.MeshStandardMaterial({color:0x1a2430,metalness:.74,roughness:.25}));plate.position.y=.135;plate.castShadow=true;plate.receiveShadow=true;stage.add(plate);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(1.42,.038,18,96),new THREE.MeshStandardMaterial({color:0x75ddff,emissive:0x246e88,emissiveIntensity:.75,metalness:.35,roughness:.2}));ring.rotation.x=Math.PI/2;ring.position.y=.192;stage.add(ring);
 const inner=new THREE.Mesh(new THREE.TorusGeometry(1.14,.015,12,96),new THREE.MeshStandardMaterial({color:0xe7bd6c,emissive:0x68491b,emissiveIntensity:.3,metalness:.52,roughness:.25}));inner.rotation.x=Math.PI/2;inner.position.y=.198;stage.add(inner);
 const logoMat=sharedLogoTexture?new THREE.MeshBasicMaterial({map:sharedLogoTexture,transparent:true,opacity:.88,depthWrite:false}):new THREE.MeshBasicMaterial({color:0x8bdfff});
 const logo=new THREE.Mesh(new THREE.CircleGeometry(.48,64),logoMat);logo.rotation.x=-Math.PI/2;logo.position.y=.207;stage.add(logo);
 const halo=new THREE.Mesh(new THREE.CircleGeometry(1.24,64),new THREE.MeshBasicMaterial({color:0x49cfff,transparent:true,opacity:.045,depthWrite:false,blending:THREE.AdditiveBlending}));halo.rotation.x=-Math.PI/2;halo.position.y=.205;stage.add(halo);
 const glow=new THREE.PointLight(d.color,.26,3.8);glow.position.set(0,.35,.1);stage.add(glow);
 rig.add(stage);
 const preBox=new THREE.Box3().setFromObject(root);const stageTop=stage.position.y+.215;root.position.y += stageTop+.03-preBox.min.y;rig.add(root);
 rig.userData.stage=stage;rig.userData.model=root;rig.userData.modelBox=new THREE.Box3().setFromObject(root);rig.userData.modelCenter=rig.userData.modelBox.getCenter(new THREE.Vector3());rig.userData.modelHeight=Math.max(.001,rig.userData.modelBox.max.y-rig.userData.modelBox.min.y);return rig;
}
function currentRigMotion(t){if(!currentRig)return;currentRig.position.y=Math.sin(t*.00118)*.012;currentRig.rotation.z=Math.sin(t*.00054)*.0035;if(autoRotate)currentRig.rotation.y+=.0018;const nodes=currentModel?.userData.motionNodes||[];const key=currentModel?.userData.speciesKey;for(const n of nodes){let amp=.035,f=.0145;if(key==='dragonfly')amp=.105;if(key==='butterfly')amp=.075;if(key==='bee')amp=.065;if(key==='mosquito')amp=.08;if(key==='housefly')amp=.09;n.o.rotation.z=n.baseZ+Math.sin(t*f+n.phase)*amp;n.o.rotation.x=n.baseX+Math.cos(t*f+n.phase)*amp*.10;}}
async function loadModel(d,critical=false){if(cache.has(d.key))return cloneScene(cache.get(d.key));if(loading.has(d.key))return cloneScene(await loading.get(d.key));const p=new Promise((resolve,reject)=>loader.load(pathFor(d),g=>resolve(g),e=>{if(critical&&e.total){const pct=Math.min(74,16+Math.round(e.loaded/e.total*58));setLoad(pct,`DECODING ${d.name.toUpperCase()}`);}},reject)).then(g=>{g.scene.userData.animations=g.animations||[];tuneMaterials(g.scene);normalize(g.scene,d.key);cache.set(d.key,g.scene);return g.scene;});loading.set(d.key,p);try{return cloneScene(await p);}finally{loading.delete(d.key);}}
function updateUI(d){ui.title.textContent=d.name;ui.latin.textContent=d.latin;ui.kicker.textContent=`${d.order.toUpperCase()} // ${d.family.toUpperCase()}`;ui.no.textContent=String(index+1).padStart(2,'0');ui.order.textContent=d.order;ui.family.textContent=d.family;ui.range.textContent=d.range;ui.role.textContent=d.role;ui.diet.textContent=d.diet;ui.size.textContent=d.size;ui.life.textContent=d.life;ui.summary.textContent=d.summary;document.documentElement.style.setProperty('--accent',`#${d.color.toString(16).padStart(6,'0')}`);ui.stageHint.textContent=`${String(index+1).padStart(2,'0')} / 08`;}
function renderCards(){
 ui.cards.innerHTML='';
 for(let rel=-4;rel<=4;rel++){
   const i=(index+rel+8)%8,d=DATA[i],angle=rel*14,rad=angle*Math.PI/180,x=Math.sin(rad)*355,y=(1-Math.cos(rad))*52,scale=rel===0?1.22:Math.max(.66,1-Math.abs(rel)*.105),op=rel===0?1:Math.max(.32,.88-Math.abs(rel)*.10),z=20-Math.abs(rel);
   const b=document.createElement('button');b.className='specimen-card'+(rel===0?' is-active':'');b.type='button';b.dataset.index=i;b.style.cssText=`--x:${x}px;--y:${y}px;--scale:${scale};--rot:${angle*.20}deg;--ry:${-angle}deg;--op:${op};--z:${z};`;
   b.innerHTML=`<img src="./assets/cards/${d.card}" alt="${d.name}" loading="lazy"><span class="card-gloss"></span><span class="card-number">${String(i+1).padStart(2,'0')}</span><span class="card-name">${d.name}</span><span class="card-latin">${d.latin}</span>${rel===0?'<span class="card-active">ACTIVE</span>':''}`;
   b.addEventListener('click',()=>switchTo(i));ui.cards.appendChild(b);
 }
}
function applyResearch(show=true){
 const d=DATA[index],v=viewStates[research];ui.researchStep.textContent=v.id;ui.researchBtn.textContent=`${v.id}  RESEARCH VIEW`;ui.researchTitle.textContent=v.title;ui.researchSub.textContent=research===0?v.sub:d.anatomy[research-1][0];
 const box=currentRig?.userData.modelBox;if(box){const h=box.max.y-box.min.y,cy=(box.min.y+box.max.y)/2;let ty=cy+.05,z=5.2;if(research===1){ty=box.min.y+h*.72;z=2.05;}else if(research===2){ty=box.min.y+h*.48;z=1.95;}else if(research===3){ty=box.min.y+h*.62;z=2.0;}targetCam={z,y:ty,tx:0,ty};}
 else targetCam={z:5.2,y:.65,tx:0,ty:.65};
 controls?.target.set(targetCam.tx,targetCam.ty,0);if(currentRig){currentRig.scale.setScalar(1);}
 if(research===0){closeDetail();ui.profile.classList.remove('is-hidden');}else{openDetail(research-1,false);ui.profile.classList.remove('is-hidden');}
 if(show){ui.researchStrip.classList.add('show');clearTimeout(window.__rs);window.__rs=setTimeout(()=>ui.researchStrip.classList.remove('show'),1400);}
}
function stepResearch(dir){const next=(research+dir+4)%4;research=next;applyResearch(true);audio.beep('click');}
function openDetail(i,sound=true){const d=DATA[index],a=d.anatomy[i%3];ui.detailTitle.textContent=a[0];ui.detailText.textContent=a[1];ui.detailMeta.textContent=a[2];ui.detail.dataset.open='1';if(sound)audio.beep('pin');}
function closeDetail(){ui.detail.dataset.open='0';}
function openInfo(){const d=DATA[index];ui.infoTitle.textContent=`${d.name} · ${d.latin}`;ui.infoText.textContent=d.summary;ui.infoNote.textContent=d.note;ui.infoDiet.textContent=d.diet;ui.infoSize.textContent=d.size;ui.infoLife.textContent=d.life;ui.infoPanel.dataset.open='1';}
function closeInfo(){ui.infoPanel.dataset.open='0';}
function switchTo(next){if(transitionLock)return;const target=(next+8)%8;if(target===index)return;transitionLock=true;const old=currentRig,direction=((target-index+8)%8)<=4?1:-1;index=target;research=0;const d=DATA[index];updateUI(d);renderCards();closeInfo();audio.beep('switch');
 const finish=root=>{setupMotion(root,d);const rig=buildFloatingStage(root,d);rig.position.x=direction*.8;rig.rotation.y=direction*.26;rig.scale.setScalar(.84);scene.add(rig);currentRig=rig;currentModel=root;applyResearch(false);const start=performance.now();function reveal(){const p=Math.min(1,(performance.now()-start)/620),e=1-Math.pow(1-p,3);if(currentRig!==rig)return;rig.position.x=THREE.MathUtils.lerp(direction*.8,0,e);rig.rotation.y=THREE.MathUtils.lerp(direction*.26,0,e);rig.scale.setScalar(THREE.MathUtils.lerp(.84,1,e));if(p<1)requestAnimationFrame(reveal);else{if(old)scene.remove(old);transitionLock=false;preloadNeighbors();}}requestAnimationFrame(reveal);};
 if(cache.has(d.key))finish(cloneScene(cache.get(d.key)));else loadModel(d,true).then(finish).catch(err=>{console.error('Specimen load failed',err);transitionLock=false;});
}
function preloadNeighbors(){const ids=[(index+1)%8,(index+7)%8,(index+2)%8,(index+6)%8];const run=async()=>{for(const id of ids){const d=DATA[id];if(!cache.has(d.key))try{await loadModel(d)}catch(err){console.warn('Preload failed',d.key,err);}}};(window.requestIdleCallback||((fn)=>setTimeout(fn,350)))(run);}
async function boot(){try{initScene();setLoad(7,'INITIALISING 3D ENGINE');try{sharedLogoTexture=await new THREE.TextureLoader().loadAsync('./assets/logo.png');sharedLogoTexture.colorSpace=THREE.SRGBColorSpace;}catch{}setLoad(14,'PRELOADING PRIMARY SPECIMEN');const primaryPromise=loadModel(DATA[0],true);const neighbors=Promise.all([loadModel(DATA[7]),loadModel(DATA[1])]);const [primary]=await Promise.all([primaryPromise,neighbors]);setLoad(78,'BUILDING SPECIMEN RIG');setupMotion(primary,DATA[0]);currentModel=primary;currentRig=buildFloatingStage(primary,DATA[0]);scene.add(currentRig);updateUI(DATA[0]);renderCards();applyResearch(false);setLoad(95,'FINAL OPTICAL CALIBRATION');await new Promise(r=>setTimeout(r,160));setLoad(100,'CATALOGUE READY');setTimeout(()=>ui.preloader.classList.add('hidden'),220);preloadNeighbors();animate();}catch(err){console.error('BOOT FAILED',err);setLoad(100,'3D OFFLINE — SHOWING CATALOGUE');setTimeout(()=>ui.preloader.classList.add('hidden'),650);if(!scene)initScene();renderCards();animate();}}
function on(id,event,handler,options){const el=document.getElementById(id);if(!el){console.warn(`[INSECTA] Missing #${id}; skipped ${event} binding`);return null;}el.addEventListener(event,handler,options);return el;}
function setupEvents(){
 on('prevBtn','click',()=>switchTo(index-1));
 on('nextBtn','click',()=>switchTo(index+1));
 on('researchToggle','click',()=>stepResearch(1));
 on('expandBtn','click',()=>{if(ui.infoPanel?.dataset.open==='1')closeInfo();else openInfo();});
 on('closeInfo','click',closeInfo);
 on('closeDetail','click',closeDetail);
 on('autoBtn','click',e=>{autoRotate=!autoRotate;const label=e.currentTarget.querySelector('span');if(label)label.textContent=autoRotate?'ON':'OFF';});
 on('resetBtn','click',()=>{research=0;closeInfo();closeDetail();applyResearch(false);if(controls){controls.target.set(0,targetCam.ty,0);}if(camera){camera.position.set(0,targetCam.y,5.2);}});
 on('soundBtn','click',()=>{soundOn=!soundOn;ui.sound.textContent=soundOn?'SOUND ON':'SOUND OFF';ui.sound.classList.toggle('on',soundOn);audio.beep('click');});
 window.addEventListener('keydown',e=>{if(e.key==='ArrowRight')switchTo(index+1);else if(e.key==='ArrowLeft')switchTo(index-1);else if(e.key==='ArrowUp')stepResearch(-1);else if(e.key==='ArrowDown')stepResearch(1);else if(e.key==='Escape'){closeInfo();closeDetail();}});
 let sx=0,sy=0;
 if(ui.canvas){
   ui.canvas.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;},{passive:true});
   ui.canvas.addEventListener('pointerup',e=>{
     const dx=e.clientX-sx,dy=e.clientY-sy;
     if(Math.max(Math.abs(dx),Math.abs(dy))>52){if(Math.abs(dx)>Math.abs(dy))switchTo(index+(dx<0?1:-1));else stepResearch(dy>0?1:-1);return;}
     if(e.pointerType==='touch'||transitionLock||!currentModel||!camera)return;
     const r=ui.canvas.getBoundingClientRect(),p=new THREE.Vector2(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1),ray=new THREE.Raycaster();ray.setFromCamera(p,camera);const hit=ray.intersectObject(currentModel,true)[0];if(!hit)return;
     const local=currentModel.worldToLocal(hit.point.clone()),box=new THREE.Box3().setFromObject(currentModel),h=(local.y-box.min.y)/(box.max.y-box.min.y||1);let part=h>.68?0:h<.34?2:1;if(Math.abs(local.x)>Math.max(.45,(box.max.x-box.min.x)*.2))part=1;openDetail(part,true);
   });
 }
 const viewer=document.getElementById('viewer');
 if(viewer) viewer.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)<8)return;e.preventDefault();stepResearch(e.deltaY>0?1:-1);},{passive:false});
 if(ui.cards){
   ui.cards.addEventListener('pointerdown',e=>{ui.cards.dataset.sx=e.clientX;},{passive:true});
   ui.cards.addEventListener('pointerup',e=>{const dx=e.clientX-Number(ui.cards.dataset.sx||e.clientX);if(Math.abs(dx)>50)switchTo(index+(dx<0?1:-1));});
 }
}
function animate(){requestAnimationFrame(animate);const now=performance.now(),delta=Math.min(.05,(now-lastTime)/1000);lastTime=now;elapsed+=delta;controls?.update();if(currentMixer)currentMixer.update(delta);currentRigMotion(now);camera.position.z=THREE.MathUtils.damp(camera.position.z,targetCam.z,6,delta);camera.position.y=THREE.MathUtils.damp(camera.position.y,targetCam.y,6,delta);controls?.target.lerp(new THREE.Vector3(targetCam.tx,targetCam.ty,0),Math.min(1,delta*7));if(renderer&&scene&&camera)renderer.render(scene,camera);}
setupEvents();boot();
