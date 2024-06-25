import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';

import {Path} from '/node_modules/yuka/build/yuka.module.js';
import { Vector3 } from '/node_modules/yuka/build/yuka.module.js';
import { EntityManager} from '/node_modules/yuka/build/yuka.module.js';
import {Vehicle} from '/node_modules/yuka/build/yuka.module.js';
import { Time } from '/node_modules/yuka/build/yuka.module.js';
import { OnPathBehavior } from '/node_modules/yuka/build/yuka.module.js';
import { FollowPathBehavior } from '/node_modules/yuka/build/yuka.module.js';/*
import {Path} from 'yuka/build/yuka.module.js';
import { Vector3 } from 'yuka/build/yuka.module.js';
import { EntityManager} from '/yuka/build/yuka.module.js';
import {Vehicle} from '/yuka/build/yuka.module.js';
import { Time } from '/yuka/build/yuka.module.js';
import { OnPathBehavior } from '/yuka/build/yuka.module.js';
import { FollowPathBehavior } from '/yuka/build/yuka.module.js';*/
//import { DragControls } from 'three/addons/controls/DragControls.js';
//import * as dat from 'dat.gui';
//import {GUI} from './public/dat.gui.module.js'



var speed = 2;


const renderer = new THREE.WebGLRenderer(/*{ antialias: true }*/);
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(50, 50, 50);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.enablePan = false;
controls.minDistance = 0;
//controls.maxDistance = 100;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;

////orbit controls
controls.maxAzimuthAngle=Math.PI/1.50;
controls.minAzimuthAngle=-Math.PI/8;

controls.keys={
  LEFT:'ArrowLeft',
  UP:'ArrowUp',
  RIGHT:'ArrowRight',
  BOTTOM:'ArrowDown'

}
controls.listenToKeyEvents(window);




controls.target = new THREE.Vector3(0, 3, 0);
controls.update();

var objects = [];
var controlss = new DragControls( objects, camera, renderer.domElement );
		controlss.addEventListener( 'dragstart', function ( event ) {
						event.object.material.color.set( 'crimson' );
				} );
		controlss.addEventListener( 'dragend', function ( event ) {
						event.object.material.color.set( 'tan' );
				} );


function createFloor() {
  const pos = { x: 0, y: 0, z: 0 };
  const scale = { x: 50, y: 2, z:50 };

  const blockPlane = new THREE.Mesh(new THREE.BoxGeometry(),
       new THREE.MeshPhongMaterial({ color:0xaaaaaa }));
  blockPlane.position.set(pos.x, pos.y, pos.z);
  blockPlane.scale.set(scale.x, scale.y, scale.z);
  blockPlane.castShadow = false;
  blockPlane.receiveShadow = true;
  scene.add(blockPlane);

 // blockPlane.userData.ground = true
}
const textureLoader=new THREE.TextureLoader();

const box2Geometry=new THREE.BoxGeometry(2,30,50);
const box2Material=new THREE.MeshBasicMaterial({color:0xaaaaaa
});
const box2=new THREE.Mesh(box2Geometry,box2Material);
scene.add(box2);
box2.position.set(-24,16,0);

const box3Geometry=new THREE.BoxGeometry(50,30,2);
const box3Material=new THREE.MeshBasicMaterial({color:0xaaaaaa,
});
const box3=new THREE.Mesh(box3Geometry,box3Material);
scene.add(box3);
box3.position.set(0,16,-24);



const ambientLight=new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 5000, 50, 1, 1);
spotLight.position.set(0, 40, 0);
spotLight.castShadow = true;
spotLight.intensity=15500;
scene.add(spotLight);
const sLightHelper=new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);


//directional light
const directionalLight=new THREE.DirectionalLight(0xFFFFFF,0.8);
scene.add(directionalLight);
directionalLight.position.set(0,40,0);
directionalLight.castShadow=true;
directionalLight.intensity=1;
directionalLight.shadow.camera.bottom=-12;
directionalLight.shadow.camera.top=12;

const dLightHelper=new THREE.DirectionalLightHelper(directionalLight,10);
scene.add(dLightHelper);

const aquariumLoader = new GLTFLoader().setPath('public/aquarium/');
aquariumLoader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(5.000,5.000,11.000);
  console.log('loading model');
  const meshAqua = gltf.scene;
  meshAqua.isDraggable=true;
  meshAqua.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  
  meshAqua.position.set(0, 6.3, 0);
  
  scene.add(meshAqua);
});

const shellLoader = new GLTFLoader().setPath('public/shell/');
shellLoader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(5.000,5.000,11.000);
  console.log('loading model');
  const meshShell = gltf.scene;
  meshShell.isDraggable=true;
  meshShell.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  
  meshShell.position.set(-2.6, 7, 8);
   //meshShell.rotation.y=21;
  scene.add(meshShell);
});

const grassLoader = new GLTFLoader().setPath('public/grass/');
grassLoader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(0.03,0.03,0.03);

  const meshGrass = gltf.scene;
  meshGrass.isDraggable=true;
  meshGrass.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  objects.push(meshGrass);
  meshGrass.position.set(1, 7, -6);
   //meshShell.rotation.y=21;
  scene.add(meshGrass);
});

const grass2Loader = new GLTFLoader().setPath('public/grass/');
grass2Loader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(0.03,0.03,0.03);

  const meshGrass2 = gltf.scene;
  meshGrass2.isDraggable=true;
  meshGrass2.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  objects.push(meshGrass2);
  meshGrass2.position.set(-1, 7, 6);
   //meshShell.rotation.y=21;
  scene.add(meshGrass2);
});


const shipLoader = new GLTFLoader().setPath('public/ship/');
shipLoader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(1,1,1);

  const meshship = gltf.scene;
  meshship.isDraggable=true;
  meshship.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  
  meshship.position.set(-3, 7,-3);
   //meshShell.rotation.y=21;
  scene.add(meshship);
});


const sofaLoader = new GLTFLoader().setPath('public/sofa/');
sofaLoader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(0.4,0.4,0.4);

  const meshsofa = gltf.scene;
  meshsofa.isDraggable=true;
  meshsofa.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  objects.push(meshsofa);
  meshsofa.rotation.y=1.58;
  meshsofa.position.set(3, 6.5,6);
   //meshShell.rotation.y=21;
  scene.add(meshsofa);
});

const sandLoader = new GLTFLoader().setPath('public/sand/');
sandLoader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(0.16,0.2,0.38);
  
  const meshsand = gltf.scene;
  meshsand.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  //meshsand.rotation.y=21;
  
  
  meshsand.position.set(0,6.7,0.5);
  scene.add(meshsand); 
});

const tableLoader = new GLTFLoader().setPath('public/table/');
tableLoader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(9.5,8.000,10.8);
  
  
  
  console.log('loading model');
  const meshTable = gltf.scene;
  meshTable.isDraggable=true;
  meshTable.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  meshTable.position.set(0, 0, 0);
  scene.add(meshTable); 
});


console.log('loading model');
const plantLoader = new GLTFLoader().setPath('public/plant/');
plantLoader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(101,100,100);
  
  const meshPlant = gltf.scene;
  meshPlant.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  objects.push(meshPlant);
  meshPlant.position.set(15, 1, -18);
  scene.add(meshPlant); 
});

const panelLoader = new GLTFLoader().setPath('public/panel1/');
panelLoader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(0.1,0.1,0.1);
  
  const meshPanel = gltf.scene;
  meshPanel.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  meshPanel.rotation.y=1.58;
  meshPanel.position.set(-23,5,9);
  scene.add(meshPanel); 
});

const crateLoader = new GLTFLoader().setPath('public/crate/');
crateLoader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(2.5,2.5,2.5);
  
  const meshCrate = gltf.scene;
  meshCrate.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  objects.push(meshCrate);
  meshCrate.rotation.y=1.58;
  meshCrate.position.set(-19,3.7,17.5);
  scene.add(meshCrate); 
});

const deskLoader = new GLTFLoader().setPath('public/desk/');
deskLoader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(10.5,10.5,10.5);
  
  const meshdesk = gltf.scene;
  meshdesk.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  objects.push(meshdesk);
  meshdesk.rotation.y=1.58;
  meshdesk.position.set(-29,22,10.8);
  scene.add(meshdesk); 
});

const plant2Loader = new GLTFLoader().setPath('public/plant2/');
plant2Loader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(3.5,3.5,3.5);
  
  const meshp2 = gltf.scene;
  meshp2.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  meshp2.rotation.y=1.58;
  meshp2.position.set(-20,10.3,-20);
  scene.add(meshp2); 
});

const terminal2Loader = new GLTFLoader().setPath('public/terminal2/');
terminal2Loader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(5.5,5.5,5,5);
  
  const mesht2 = gltf.scene;
  mesht2.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  objects.push(mesht2);
  mesht2.rotation.y=-1.58;
  mesht2.position.set(-1.4,11.5,-4.3);
  scene.add(mesht2); 
});

const mandoLoader = new GLTFLoader().setPath('public/helmet/');
mandoLoader.load('scene.gltf', (gltf) => {
  gltf.scene.scale.set(0.1,0.1,0.1);
  
  const meshmando = gltf.scene;
  meshmando.traverse((child) => {
    if (child.isMesh) {
     
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  objects.push(meshmando);
  meshmando.rotation.y=21;
  meshmando.position.set(-21,-9.5,22);
  scene.add(meshmando); 
});



function createSphere() {
  let radius = 4;
  let pos = { x: 15, y: radius, z: -5 };

  let sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), 
      new THREE.MeshPhongMaterial({ color: 0x43a1f4 }))
  sphere.position.set(pos.x, pos.y, pos.z)
  sphere.castShadow = true
  sphere.receiveShadow = true
  sphere.isDraggable=true;
  scene.add(sphere)
//sphere.name='sph'

}





const vehicleGeometry = new THREE.ConeGeometry(0.1,0.5,8);
vehicleGeometry.rotateX(Math.PI * 0.5);
const vehicleMaterial = new THREE.MeshNormalMaterial();

const vehicle = new Vehicle();
const time = new Time();
const clock = new THREE.Clock();

function sync(entity, setRenderComponent){
  setRenderComponent.matrix.copy(entity.worldMatrix);
}

function getRandomDifferentValues() {
  const values = [];
  while (values.length < 5) {
      const rand = (Math.random() * 10) - 5;
      if (!values.includes(rand)) {
          values.push(rand);
      }
  }
  return values;
}

/*document.getElementById("slider").onchange = function(event) {
  speed = event.target.value;
  console.log('speed changed');
  
};*/




//fish1
const entityManager = new EntityManager();
  let [rand1, rand2, rand3, rand4,rand5] = getRandomDifferentValues();
  let [rand6, rand7, rand8, rand9 , rand10] = getRandomDifferentValues();
  let [rand11,rand12,rand13,rand14,rand15] = getRandomDifferentValues();
  let path = new Path();

  path.add( new Vector3(rand1/1.5, (rand11/2)+10, rand2*2));
  path.add( new Vector3(rand3/1.5, (rand12/2)+10, rand4*2));
  path.add( new Vector3(rand5/1.5, (rand13/2)+10, rand6*2));
  path.add( new Vector3(rand7/1.5, (rand14/2)+10, rand8*2));
  path.add( new Vector3(rand9/1.5, (rand15/2)+10, rand10*2));

  path.loop = true;

  vehicle.position.copy(path.current());

  const followPathBehavior = new FollowPathBehavior(path, 1);
  vehicle.steering.add(followPathBehavior);

  const onPathBehavior = new OnPathBehavior(path);
  vehicle.steering.add(onPathBehavior);
  vehicle.maxSpeed = speed;

  
  entityManager.add(vehicle);
    const position = [];
  for(let i =0; i<path._waypoints.length; i++){
    const waypoint = path._waypoints[i];
    position.push(waypoint.x,waypoint.y,waypoint.z);
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));

  const lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
  const lines = new THREE.LineLoop(lineGeometry,lineMaterial);
  //scene.add(lines);

  const loader = new GLTFLoader().setPath('public/fish/');
  loader.load('scene.gltf', (gltf) => {
    console.log('loading model');
    const meshfish = gltf.scene;
    scene.add(meshfish);
    
    meshfish.matrixAutoUpdate = false;
    vehicle.scale = new Vector3(4,4,4);
    vehicle.setRenderComponent(meshfish, sync);
  });

//fish2
const vehicle2 = new Vehicle();
const entityManager2 = new EntityManager();
[rand1, rand2, rand3, rand4,rand5] = getRandomDifferentValues();
[rand6, rand7, rand8, rand9 , rand10] = getRandomDifferentValues();
[rand11,rand12,rand13,rand14,rand15] = getRandomDifferentValues();
const path2 = new Path();

path2.add( new Vector3(rand1/1.5, (rand11/2)+10, rand2*2));
path2.add( new Vector3(rand3/1.5, (rand12/2)+10, rand4*2));
path2.add( new Vector3(rand5/1.5, (rand13/2)+10, rand6*2));
path2.add( new Vector3(rand7/1.5, (rand14/2)+10, rand8*2));
path2.add( new Vector3(rand9/1.5, (rand15/2)+10, rand10*2));

path2.loop = true;

vehicle2.position.copy(path2.current());

const followPathBehavior2 = new FollowPathBehavior(path2, 1);
vehicle2.steering.add(followPathBehavior2);

const onPathBehavior2 = new OnPathBehavior(path2);
vehicle2.steering.add(onPathBehavior2);
vehicle2.maxSpeed = speed;


entityManager2.add(vehicle2);
  const position2 = [];
for(let i =0; i<path._waypoints.length; i++){
  const waypoint2 = path2._waypoints[i];
  position2.push(waypoint2.x,waypoint2.y,waypoint2.z);
}

const lineGeometry2 = new THREE.BufferGeometry();
lineGeometry2.setAttribute('position', new THREE.Float32BufferAttribute(position2, 3));

const lineMaterial2 = new THREE.LineBasicMaterial({color: 0xffffff});
const lines2 = new THREE.LineLoop(lineGeometry2,lineMaterial2);
//scene.add(lines2);

loader.setPath('public/fish3/');
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  const meshfish = gltf.scene;
  scene.add(meshfish);
  
  meshfish.matrixAutoUpdate = false;
  vehicle2.scale = new Vector3(6,6,6);
  vehicle2.setRenderComponent(meshfish, sync);
});

//fish3
const vehicle3 = new Vehicle();
const entityManager3 = new EntityManager();
[rand1, rand2, rand3, rand4,rand5] = getRandomDifferentValues();
[rand6, rand7, rand8, rand9 , rand10] = getRandomDifferentValues();
[rand11,rand12,rand13,rand14,rand15] = getRandomDifferentValues();
const path3 = new Path();

path3.add( new Vector3(rand1/1.5, (rand11/2)+10, rand2*2));
path3.add( new Vector3(rand3/1.5, (rand12/2)+10, rand4*2));
path3.add( new Vector3(rand5/1.5, (rand13/2)+10, rand6*2));
path3.add( new Vector3(rand7/1.5, (rand14/2)+10, rand8*2));
path3.add( new Vector3(rand9/1.5, (rand15/2)+10, rand10*2));

path3.loop = true;

vehicle3.position.copy(path3.current());

const followPathBehavior3 = new FollowPathBehavior(path3, 1);
vehicle3.steering.add(followPathBehavior3);

const onPathBehavior3 = new OnPathBehavior(path3);
vehicle3.steering.add(onPathBehavior3);
vehicle3.maxSpeed = speed;


entityManager3.add(vehicle3);
  const position3 = [];
for(let i =0; i<path._waypoints.length; i++){
  const waypoint = path3._waypoints[i];
  position3.push(waypoint.x,waypoint.y,waypoint.z);
}

const lineGeometry3 = new THREE.BufferGeometry();
lineGeometry3.setAttribute('position', new THREE.Float32BufferAttribute(position3, 3));

const lineMaterial3 = new THREE.LineBasicMaterial({color: 0xffffff});
const lines3 = new THREE.LineLoop(lineGeometry3,lineMaterial3);
//scene.add(lines3);

loader.setPath('public/fish4/');
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  const meshfish = gltf.scene;
  scene.add(meshfish);
  
  meshfish.matrixAutoUpdate = false;
  vehicle3.scale = new Vector3(0.2,0.2,0.2);
  vehicle3.setRenderComponent(meshfish, sync);
});

//fish4
const vehicle4 = new Vehicle();
const entityManager4 = new EntityManager();
[rand1, rand2, rand3, rand4,rand5] = getRandomDifferentValues();
[rand6, rand7, rand8, rand9 , rand10] = getRandomDifferentValues();
[rand11,rand12,rand13,rand14,rand15] = getRandomDifferentValues();
const path4 = new Path();

path4.add( new Vector3(rand1/1.5, (rand11/2)+10, rand2*2));
path4.add( new Vector3(rand3/1.5, (rand12/2)+10, rand4*2));
path4.add( new Vector3(rand5/1.5, (rand13/2)+10, rand6*2));
path4.add( new Vector3(rand7/1.5, (rand14/2)+10, rand8*2));
path4.add( new Vector3(rand9/1.5, (rand15/2)+10, rand10*2));

path4.loop = true;

vehicle4.position.copy(path4.current());

const followPathBehavior4 = new FollowPathBehavior(path4, 1);
vehicle4.steering.add(followPathBehavior4);

const onPathBehavior4 = new OnPathBehavior(path4);
vehicle4.steering.add(onPathBehavior4);
vehicle4.maxSpeed = speed;


entityManager4.add(vehicle4);
  const position4 = [];
for(let i =0; i<path._waypoints.length; i++){
  const waypoint = path4._waypoints[i];
  position4.push(waypoint.x,waypoint.y,waypoint.z);
}

const lineGeometry4 = new THREE.BufferGeometry();
lineGeometry4.setAttribute('position', new THREE.Float32BufferAttribute(position4, 5));

const lineMaterial4 = new THREE.LineBasicMaterial({color: 0xffffff});
const lines4 = new THREE.LineLoop(lineGeometry4,lineMaterial4);
//scene.add(lines4);

loader.setPath('public/koi_fish/');
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  const meshfish = gltf.scene;
  
  scene.add(meshfish);
  
  meshfish.matrixAutoUpdate = false;
  
  vehicle4.scale = new Vector3(0.004,0.004,0.004);
  vehicle4.setRenderComponent(meshfish, sync);
});

//fish5
const vehicle5 = new Vehicle();
const entityManager5 = new EntityManager();
[rand1, rand2, rand3, rand4,rand5] = getRandomDifferentValues();
[rand6, rand7, rand8, rand9 , rand10] = getRandomDifferentValues();
[rand11,rand12,rand13,rand14,rand15] = getRandomDifferentValues();
const path5 = new Path();

path5.add( new Vector3(rand1/1.5, (rand11/2)+10, rand2*2));
path5.add( new Vector3(rand3/1.5, (rand12/2)+10, rand4*2));
path5.add( new Vector3(rand5/1.5, (rand13/2)+10, rand6*2));
path5.add( new Vector3(rand7/1.5, (rand14/2)+10, rand8*2));
path5.add( new Vector3(rand9/1.5, (rand15/2)+10, rand10*2));

path5.loop = true;

vehicle5.position.copy(path5.current());

const followPathBehavior5 = new FollowPathBehavior(path5, 1);
vehicle5.steering.add(followPathBehavior5);

const onPathBehavior5 = new OnPathBehavior(path5);
vehicle5.steering.add(onPathBehavior5);
vehicle5.maxSpeed = speed;


entityManager5.add(vehicle5);
  const position5 = [];
for(let i =0; i<path._waypoints.length; i++){
  const waypoint = path5._waypoints[i];
  position5.push(waypoint.x,waypoint.y,waypoint.z);
}

const lineGeometry5 = new THREE.BufferGeometry();
lineGeometry5.setAttribute('position', new THREE.Float32BufferAttribute(position5, 5));

const lineMaterial5 = new THREE.LineBasicMaterial({color: 0xffffff});
const lines5 = new THREE.LineLoop(lineGeometry5,lineMaterial5);
//scene.add(lines5);

loader.setPath('public/blue_2fish/');
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  const meshfish = gltf.scene;
  
  scene.add(meshfish);
  
  meshfish.matrixAutoUpdate = false;
  
  vehicle5.scale = new Vector3(3,3,3);
  vehicle5.setRenderComponent(meshfish, sync);
});

//fish6
const vehicle6 = new Vehicle();
const entityManager6 = new EntityManager();
[rand1, rand2, rand3, rand4,rand5] = getRandomDifferentValues();
[rand6, rand7, rand8, rand9 , rand10] = getRandomDifferentValues();
[rand11,rand12,rand13,rand14,rand15] = getRandomDifferentValues();
const path6 = new Path();

path6.add( new Vector3(rand1/1.5, (rand11/2)+10, rand2*2));
path6.add( new Vector3(rand3/1.5, (rand12/2)+10, rand4*2));
path6.add( new Vector3(rand5/1.5, (rand13/2)+10, rand6*2));
path6.add( new Vector3(rand7/1.5, (rand14/2)+10, rand8*2));
path6.add( new Vector3(rand9/1.5, (rand15/2)+10, rand10*2));

path6.loop = true;

vehicle6.position.copy(path6.current());

const followPathBehavior6 = new FollowPathBehavior(path6, 1);
vehicle6.steering.add(followPathBehavior6);

const onPathBehavior6 = new OnPathBehavior(path6);
vehicle6.steering.add(onPathBehavior6);
vehicle6.maxSpeed = speed;


entityManager6.add(vehicle6);
  const position6 = [];
for(let i =0; i<path._waypoints.length; i++){
  const waypoint = path6._waypoints[i];
  position6.push(waypoint.x,waypoint.y,waypoint.z);
}

const lineGeometry6 = new THREE.BufferGeometry();
lineGeometry6.setAttribute('position', new THREE.Float32BufferAttribute(position6, 5));

const lineMaterial6 = new THREE.LineBasicMaterial({color: 0xffffff});
const lines6 = new THREE.LineLoop(lineGeometry6,lineMaterial6);
//scene.add(lines6);

loader.setPath('public/orange_fish/');
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  const meshfish = gltf.scene;
  
  scene.add(meshfish);
  
  meshfish.matrixAutoUpdate = false;
  
  vehicle6.scale = new Vector3(0.8,0.8,0.8);
  vehicle6.setRenderComponent(meshfish, sync);
});


function animate() {
  

  const delta = time.update().getDelta();
  entityManager.update(delta);
  entityManager2.update(delta);
  entityManager3.update(delta);
  entityManager4.update(delta);
  entityManager5.update(delta);
  entityManager6.update(delta);
  controls.update();
  requestAnimationFrame(animate);
  
  renderer.render(scene, camera);
}
createSphere();
createFloor()
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});