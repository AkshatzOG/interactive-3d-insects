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
const ui={preloader:$('preloader'),loadStage:$('loadStage'),loadPct:$('loadPct'),loadBar:$('loadBar'),canvas:$('mainCanvas'),title:$('specimenTitle'),latin:$('specimenLatin'),kicker:$('taxKicker'),no:$('specimenNo'),prev:$('prevMini'),next:$('nextMini'),cards:$('cards'),researchStrip:$('researchStrip'),researchStep:$('researchStep'),researchTitle:$('researchTitle'),researchSub:$('researchSub'),detail:$('detailHud'),detailTitle:$('detailTitle'),detailText:$('detailText'),detailMeta:$('detailMeta'),order:$('order'),family:$('family'),range:$('range'),role:$('role'),diet:$('diet'),size:$('size'),life:$('life'),summary:$('summary'),profile:$('profile'),clock:$('clock'),sound:$('soundBtn')};
let scene,camera,renderer,controls,loader,draco,clock3=new THREE.Clock();
let index=0,research=0,autoRotate=true,soundOn=false,transitionLock=false;
let currentModel=null,currentRig=null,currentStage=null,currentMixer=null;
let targetCam={z:4.15,y:.18,ty:-.02};
let rigTarget={x:0,y:0,scale:1,rotY:0,rotX:0};
const cache=new Map(); const loading=new Map();
let sharedLogoTexture=null;

const audio={ctx:null,beep(type='click'){if(!soundOn)return;try{this.ctx??=new(window.AudioContext||window.webkitAudioContext)();this.ctx.resume();const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.connect(g);g.connect(this.ctx.destination);const t=this.ctx.currentTime;o.type='sine';o.frequency.setValueAtTime(type==='switch'?240:type==='pin'?740:560,t);o.frequency.exponentialRampToValueAtTime(type==='switch'?520:330,t+.09);g.gain.setValueAtTime(.025,t);g.gain.exponentialRampToValueAtTime(.001,t+.11);o.start(t);o.stop(t+.12);}catch{}}};

function setLoad(p,text){ui.loadPct.textContent=p+'%';ui.loadStage.textContent=text;ui.loadBar.style.width=p+'%';}
function clock(){ui.clock.textContent=new Date().toLocaleTimeString([], {hour12:false});}
function pathFor(d){return `./models/${d.key==='mosquito'?'mosquito_3d_model_free':d.key}.glb`;}
function cloneScene(src){return SkeletonUtils.clone(src);}
function resize(){if(!renderer||!camera)return;const r=ui.canvas.parentElement.getBoundingClientRect();camera.aspect=Math.max(1,r.width)/Math.max(1,r.height);camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio||1,matchMedia('(max-width:820px)').matches?1.35:1.6));renderer.setSize(r.width,r.height,false);}

function initScene(){
 scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(29,1,.05,100);camera.position.set(0,.18,4.15);
 renderer=new THREE.WebGLRenderer({canvas:ui.canvas,alpha:true,antialias:true,powerPreference:'high-performance'});renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.34;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 scene.add(new THREE.HemisphereLight(0xafdfff,0x05080c,1.55));
 const key=new THREE.DirectionalLight(0xfff1d5,2.15);key.position.set(3.6,5.8,4.4);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.near=.5;key.shadow.camera.far=20;key.shadow.camera.left=-5;key.shadow.camera.right=5;key.shadow.camera.top=5;key.shadow.camera.bottom=-5;key.shadow.bias=-.00045;scene.add(key);
 const fill=new THREE.DirectionalLight(0x89d8ff,1.15);fill.position.set(-4,2.4,2.8);scene.add(fill);
 const rim=new THREE.DirectionalLight(0xdff6ff,1.35);rim.position.set(-3.2,4.2,-4.5);scene.add(rim);
 const warm=new THREE.PointLight(0xffc46b,.7,7);warm.position.set(1.8,1.4,2.2);scene.add(warm);
 const cool=new THREE.PointLight(0x4dcfff,.9,8);cool.position.set(-2.2,.2,3.4);scene.add(cool);
 loader=new GLTFLoader();draco=new DRACOLoader();draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/libs/draco/');draco.preload();loader.setDRACOLoader(draco);
 controls=new OrbitControls(camera,ui.canvas);controls.enablePan=false;controls.enableDamping=true;controls.dampingFactor=.075;controls.minDistance=2.7;controls.maxDistance=5.1;controls.minPolarAngle=Math.PI*.35;controls.maxPolarAngle=Math.PI*.60;controls.target.set(0,-.02,0);
 window.addEventListener('resize',resize,{passive:true});window.visualViewport?.addEventListener('resize',resize,{passive:true});resize();
 }

function tuneMaterials(root,key){root.traverse(o=>{if(!o.isMesh)return;o.castShadow=true;o.receiveShadow=true;const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>{if(!m)return;if(m.map)m.map.colorSpace=THREE.SRGBColorSpace;if(key==='bee'&&m.map)m.color.set(0xffffff);if(m.isMeshStandardMaterial||m.isMeshPhysicalMaterial){m.roughness=Math.max(.30,m.roughness??.5);m.metalness=Math.min(.18,m.metalness??0);}m.needsUpdate=true;});});}
function normalize(root,key){root.position.set(0,0,0);root.rotation.set(0,0,0);root.scale.setScalar(1);const box=new THREE.Box3().setFromObject(root),size=box.getSize(new THREE.Vector3());const target={butterfly:2.18,bee:1.72,ant:1.7,dragonfly:2.38,ladybug:1.7,housefly:1.88,cockroach:1.95,mosquito:2.02}[key]||1.9;const k=target/(Math.max(size.x,size.y,size.z)||1);root.scale.setScalar(k);root.userData.speciesKey=key;return root;}
async function loadModel(d,critical=false){if(cache.has(d.key))return cloneScene(cache.get(d.key));if(loading.has(d.key))return cloneScene(await loading.get(d.key));const p=new Promise((resolve,reject)=>loader.load(pathFor(d),g=>resolve(g),e=>{if(critical&&e.total)setLoad(Math.min(78,24+Math.round(e.loaded/e.total*54)),`DECODING ${d.name.toUpperCase()}`);},reject)).then(g=>{g.scene.userData.animations=g.animations||[];tuneMaterials(g.scene,d.key);normalize(g.scene,d.key);cache.set(d.key,g.scene);return g.scene;});loading.set(d.key,p);try{return cloneScene(await p);}finally{loading.delete(d.key);}}

function safeClips(animations){return (animations||[]).map(c=>{
 const tracks=(c.tracks||[]).filter(t=>t&&typeof t.createInterpolant==='function'&&t.times?.length&&t.values?.length);
 return tracks.length ? new THREE.AnimationClip(c.name||'specimen',c.duration,tracks):null;
 }).filter(Boolean);}
function collectMotionNodes(root,key){const list=[];root.traverse(o=>{const n=(o.name||'').toLowerCase();let wing=false;if(/wing|wings|forewing|hindwing|wingroot|ala/.test(n))wing=true;if(key==='butterfly'&&/^butterfly\./.test(n))wing=true;if(key==='dragonfly'&&/^plane\.00[1-4]/.test(n))wing=true;if(key==='mosquito'&&(/wing|backwing|fmid wing|front wing|wing bottom/.test(n)))wing=true;if(wing)list.push({o,baseZ:o.rotation.z,baseX:o.rotation.x,phase:list.length*.65});});
 // housefly: the exported asset is a compact hierarchy, so only animate named body-wing candidates if present.
 return list;
}
function setupMotion(root,d){
 currentMixer=null;
 const clips=safeClips(root.userData.animations||[]);
 if(clips.length){try{currentMixer=new THREE.AnimationMixer(root);clips.forEach(c=>currentMixer.clipAction(c).play());}catch(err){console.warn('Animation clips skipped for',d.key,err);currentMixer=null;}}
 root.userData.motionNodes=collectMotionNodes(root,d.key);
}

function makeStage(d){
 const g=new THREE.Group();g.name='SpecimenDisplayRig';
 const base=new THREE.Group();base.position.y=-.78;
 const bodyMat=new THREE.MeshStandardMaterial({color:0x0a1118,metalness:.78,roughness:.28});
 const topMat=new THREE.MeshStandardMaterial({color:0x16232d,metalness:.72,roughness:.24});
 const accentMat=new THREE.MeshStandardMaterial({color:0x72d8ff,emissive:0x2d9dc7,emissiveIntensity:.65,metalness:.32,roughness:.2});
 const baseMesh=new THREE.Mesh(new THREE.CylinderGeometry(1.12,1.2,.18,64),bodyMat);baseMesh.castShadow=true;baseMesh.receiveShadow=true;base.add(baseMesh);
 const top=new THREE.Mesh(new THREE.CylinderGeometry(1.02,1.07,.07,64),topMat);top.position.y=.125;top.castShadow=true;top.receiveShadow=true;base.add(top);
 const outer=new THREE.Mesh(new THREE.TorusGeometry(.92,.028,12,64),accentMat);outer.rotation.x=Math.PI/2;outer.position.y=.165;base.add(outer);
 const inner=new THREE.Mesh(new THREE.TorusGeometry(.68,.012,10,64),new THREE.MeshStandardMaterial({color:0xe5bc68,emissive:0x8e6422,emissiveIntensity:.5,metalness:.6,roughness:.26}));inner.rotation.x=Math.PI/2;inner.position.y=.17;base.add(inner);
 const logoMat=sharedLogoTexture?new THREE.MeshBasicMaterial({map:sharedLogoTexture,transparent:true,opacity:.95,depthWrite:false}):new THREE.MeshBasicMaterial({color:0x9feaff});
 const logo=new THREE.Mesh(new THREE.CircleGeometry(.34,48),logoMat);logo.rotation.x=-Math.PI/2;logo.position.y=.172;base.add(logo);
 const contact=new THREE.Mesh(new THREE.CircleGeometry(.88,64),new THREE.MeshBasicMaterial({color:0x51d8ff,transparent:true,opacity:.055,depthWrite:false,blending:THREE.AdditiveBlending}));contact.rotation.x=-Math.PI/2;contact.position.y=.178;base.add(contact);
 const glow=new THREE.PointLight(d.color,.42,2.8);glow.position.set(0,.36,.1);base.add(glow);
 g.add(base);
 const shadow=new THREE.Mesh(new THREE.CircleGeometry(.95,64),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.28,depthWrite:false}));shadow.scale.set(1,.55,1);shadow.rotation.x=-Math.PI/2;shadow.position.y=-.682;g.add(shadow);
 return g;
}
function stageAnchorModel(root){
 const box=new THREE.Box3().setFromObject(root);const stageTop=-.56;root.position.y += stageTop - box.min.y + .028;
}
function buildRig(root,d){
 const rig=new THREE.Group();rig.name='SpecimenRig';
 const stage=makeStage(d);rig.add(stage);
 stageAnchorModel(root);rig.add(root);
 rig.userData.model=root;rig.userData.stage=stage;return rig;
}

function removeRig(old){if(!old)return;scene.remove(old);}
function switchTo(next){
 if(transitionLock)return;const target=(next+DATA.length)%DATA.length;if(target===index)return;transitionLock=true;
 const oldRig=currentRig;const oldModel=currentModel;const dir=((target-index+8)%8)<=4?1:-1;const d=DATA[target];index=target;updateUI(d);renderCards();research=0;applyResearch(false);audio.beep('switch');
 const finish=root=>{setupMotion(root,d);const rig=buildRig(root,d);rig.position.x=dir*.55;rig.rotation.y=dir*.18;scene.add(rig);currentRig=rig;currentModel=root;const start=performance.now();function reveal(){const p=Math.min(1,(performance.now()-start)/620),e=1-Math.pow(1-p,3);if(currentRig===rig){rig.position.x=THREE.MathUtils.lerp(dir*.55,0,e);rig.rotation.y=THREE.MathUtils.lerp(dir*.18,0,e);}if(p<1)requestAnimationFrame(reveal);else{removeRig(oldRig);transitionLock=false;preloadNeighbors();}}reveal();};
 if(cache.has(d.key))finish(cloneScene(cache.get(d.key)));else loadModel(d,true).then(finish).catch(err=>{console.error(err);transitionLock=false;});
}
function preloadNeighbors(){const ids=[(index+1)%8,(index+7)%8,(index+2)%8,(index+6)%8];let cursor=0;const run=async()=>{for(;cursor<ids.length;cursor++){const d=DATA[ids[cursor]];if(!cache.has(d.key))try{await loadModel(d)}catch{}}};(window.requestIdleCallback?requestIdleCallback:fn=>setTimeout(fn,650))(run);}

function updateUI(d){ui.title.textContent=d.name;ui.latin.textContent=d.latin;ui.kicker.textContent=`${d.order.toUpperCase()} // ${d.family.toUpperCase()}`;ui.no.textContent=String(index+1).padStart(2,'0');ui.prev.textContent=DATA[(index+7)%8].name;ui.next.textContent=DATA[(index+1)%8].name;ui.order.textContent=d.order;ui.family.textContent=d.family;ui.range.textContent=d.range;ui.role.textContent=d.role;ui.diet.textContent=d.diet;ui.size.textContent=d.size;ui.life.textContent=d.life;ui.summary.textContent=d.summary;document.documentElement.style.setProperty('--accent',`#${d.color.toString(16).padStart(6,'0')}`);}
function renderCards(){ui.cards.innerHTML='';DATA.forEach((d,i)=>{const rel=((i-index+4+8)%8)-4;const abs=Math.abs(rel);const b=document.createElement('button');b.className='specimen-card';b.dataset.rel=rel;b.type='button';const x=rel*120;const y=abs*4;const scale=Math.max(.6,1-abs*.105);const rot=rel*-4;const ry=rel*-18;const op=Math.max(.42,1-abs*.13);b.style.cssText=`--x:${x}px;--y:${y}px;--scale:${scale};--rot:${rot}deg;--ry:${ry}deg;--op:${op};`;b.innerHTML=`<img src="./assets/cards/${d.card}" alt="${d.name} specimen illustration" loading="lazy"><div class="card-shade"></div><span class="card-number">${String(i+1).padStart(2,'0')}</span><div class="card-info"><strong>${d.name}</strong><small>${d.latin}</small></div>${rel===0?'<span class="active-tag">ACTIVE</span>':''}`;b.addEventListener('click',()=>switchTo(i));ui.cards.appendChild(b);});}
function applyResearch(show=true){const d=DATA[index];document.body.dataset.research=String(research+1);const states=[['01','WHOLE SPECIMEN','Full specimen + display stage.'],['02','ANATOMY / MACRO','Closer inspection of a biological region.'],['03','ECOLOGY / FIELD NOTE',d.note]];const [step,title,sub]=states[research];ui.researchStep.textContent=step;ui.researchTitle.textContent=title;ui.researchSub.textContent=sub;
 if(research===0){targetCam={z:4.15,y:.18,ty:-.04};rigTarget={x:0,y:0,scale:1,rotY:0,rotX:0};closeDetail();}
 else if(research===1){targetCam={z:3.25,y:.22,ty:.15};rigTarget={x:0,y:.06,scale:1.06,rotY:.06,rotX:0};openDetail(1,false);}
 else{targetCam={z:4.55,y:.38,ty:-.12};rigTarget={x:0,y:-.08,scale:.95,rotY:-.06,rotX:.015};openDetail(2,false);}
 if(show){ui.researchStrip.classList.add('show');clearTimeout(window.__rs);window.__rs=setTimeout(()=>ui.researchStrip.classList.remove('show'),1500);}}
function stepResearch(dir){research=(research+dir+3)%3;applyResearch(true);audio.beep('click');}
function openDetail(i,sound=true){const a=DATA[index].anatomy[i%3];ui.detailTitle.textContent=a[0];ui.detailText.textContent=a[1];ui.detailMeta.textContent=a[2];ui.detail.dataset.open='1';if(sound)audio.beep('pin');}
function closeDetail(){ui.detail.removeAttribute('data-open');}

function bind(){
 $('prevBtn').addEventListener('click',()=>switchTo(index-1));$('nextBtn').addEventListener('click',()=>switchTo(index+1));$('cardLeft').addEventListener('click',()=>switchTo(index-1));$('cardRight').addEventListener('click',()=>switchTo(index+1));
 $('autoBtn').addEventListener('click',e=>{autoRotate=!autoRotate;e.currentTarget.classList.toggle('on',autoRotate);e.currentTarget.querySelector('span').textContent=autoRotate?'ON':'OFF';});
 $('resetBtn').addEventListener('click',()=>{camera.position.set(0,.18,4.15);controls.target.set(0,-.04,0);controls.update();research=0;applyResearch(false);if(currentRig){currentRig.position.set(0,0,0);currentRig.rotation.set(0,0,0);currentRig.scale.setScalar(1);}});
 ui.profile?.querySelector('button')?.addEventListener('click',()=>ui.profile.classList.toggle('expanded'));ui.sound?.addEventListener('click',()=>{soundOn=!soundOn;ui.sound.textContent=soundOn?'SOUND ON':'SOUND OFF';ui.sound.classList.toggle('on',soundOn);audio.beep('click');});$('closeDetail')?.addEventListener('click',closeDetail);
 window.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')switchTo(index-1);else if(e.key==='ArrowRight')switchTo(index+1);else if(e.key==='ArrowDown')stepResearch(1);else if(e.key==='ArrowUp')stepResearch(-1);else if(e.key==='Escape')closeDetail();});
 let sx=0,sy=0,st=0;const v=$('viewer');v.addEventListener('wheel',e=>{if(e.ctrlKey||Math.abs(e.deltaY)<12)return;e.preventDefault();stepResearch(e.deltaY>0?1:-1);},{passive:false});v.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')return;sx=e.clientX;sy=e.clientY;st=performance.now();},{passive:true});v.addEventListener('pointerup',e=>{if(!sx)return;const dx=e.clientX-sx,dy=e.clientY-sy,dur=performance.now()-st;sx=sy=0;if(dur<900&&Math.max(Math.abs(dx),Math.abs(dy))>45){if(Math.abs(dx)>Math.abs(dy))switchTo(index+(dx<0?1:-1));else stepResearch(dy>0?1:-1);}});
 let cs=0;ui.cards.addEventListener('pointerdown',e=>{cs=e.clientX});ui.cards.addEventListener('pointerup',e=>{const dx=e.clientX-cs;if(Math.abs(dx)>45)switchTo(index+(dx<0?1:-1));});
 const ray=new THREE.Raycaster(),p=new THREE.Vector2();ui.canvas.addEventListener('pointerup',e=>{if(e.pointerType==='touch'||!currentModel)return;const r=ui.canvas.getBoundingClientRect();p.x=((e.clientX-r.left)/r.width)*2-1;p.y=-((e.clientY-r.top)/r.height)*2+1;ray.setFromCamera(p,camera);const hit=ray.intersectObject(currentModel,true)[0];if(!hit)return;const box=new THREE.Box3().setFromObject(currentModel),local=currentModel.worldToLocal(hit.point.clone());const n=THREE.MathUtils.clamp((local.y-box.min.y)/(box.max.y-box.min.y||1),0,1);openDetail(n>.68?0:n<.35?2:1);});
}

function tick(){requestAnimationFrame(tick);const dt=Math.min(clock3.getDelta(),.05),t=performance.now();if(currentRig){currentRig.position.x=THREE.MathUtils.lerp(currentRig.position.x,rigTarget.x,.07);currentRig.position.y=THREE.MathUtils.lerp(currentRig.position.y,rigTarget.y,.07);currentRig.rotation.x=THREE.MathUtils.lerp(currentRig.rotation.x,rigTarget.rotX,.06);if(autoRotate&&!transitionLock)currentRig.rotation.y+=.0025;else currentRig.rotation.y=THREE.MathUtils.lerp(currentRig.rotation.y,rigTarget.rotY,.06);const rs=THREE.MathUtils.lerp(currentRig.scale.x,rigTarget.scale,.06);currentRig.scale.setScalar(rs);const baseBob=Math.sin(t*.00115+index*.77)*.013;currentRig.position.y+=baseBob;
  const nodes=currentModel?.userData.motionNodes||[];nodes.forEach((m)=>{const key=currentModel.userData.speciesKey;let amp=.035,freq=.012;if(key==='dragonfly')amp=.12,freq=.018;if(key==='butterfly')amp=.10,freq=.011;if(key==='bee')amp=.08,freq=.016;if(key==='mosquito')amp=.065,freq=.020;if(key==='housefly')amp=.09,freq=.017;m.o.rotation.z=m.baseZ+Math.sin(t*freq+m.phase)*amp;m.o.rotation.x=m.baseX+Math.cos(t*freq+m.phase)*amp*.18;});}
 if(currentMixer)currentMixer.update(dt);camera.position.z=THREE.MathUtils.lerp(camera.position.z,targetCam.z,.06);camera.position.y=THREE.MathUtils.lerp(camera.position.y,targetCam.y,.06);controls.target.y=THREE.MathUtils.lerp(controls.target.y,targetCam.ty,.06);controls.update();renderer.render(scene,camera);}

async function boot(){
 bind();clock();setInterval(clock,1000);initScene();updateUI(DATA[0]);renderCards();setLoad(4,'INITIALISING OPTICAL ARRAY');
 try{
   setLoad(10,'LOADING LAB OPTICS');
   try{sharedLogoTexture=await new THREE.TextureLoader().loadAsync('./assets/logo.png');sharedLogoTexture.colorSpace=THREE.SRGBColorSpace;}catch(err){console.warn('Logo texture unavailable',err);}
   setLoad(16,'PRELOADING PRIMARY + NEIGHBOURS');
   const [primary,prev,next]=await Promise.all([loadModel(DATA[0],true),loadModel(DATA[7]),loadModel(DATA[1])]);
   // Build the complete first composition BEFORE revealing the UI.
   setupMotion(primary,DATA[0]);currentRig=buildRig(primary,DATA[0]);currentModel=primary;scene.add(currentRig);setLoad(82,'BUILDING SPECIMEN STAGE');
   await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
   setLoad(94,'CALIBRATING LIGHT + SHADOW');await new Promise(r=>setTimeout(r,120));
   setLoad(100,'CATALOGUE READY');document.body.classList.add('ready');setTimeout(()=>ui.preloader?.remove(),360);
   cache.set(DATA[7].key,cache.get(DATA[7].key));cache.set(DATA[1].key,cache.get(DATA[1].key));
   preloadNeighbors();
 }catch(err){console.error('INSECTA boot failed:',err);document.body.classList.add('ready');ui.preloader?.remove();}
 tick();
}
boot();
