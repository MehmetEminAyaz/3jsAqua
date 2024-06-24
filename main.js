import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { DragControls } from 'three/addons/controls/DragControls.js';
//import * as dat from 'dat.gui';
//import {GUI} from './public/dat.gui.module.js'




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




controls.target = new THREE.Vector3(0, 3, 0);
controls.update();

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



const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2();  // create once
const moveMouse = new THREE.Vector2();   // create once
let draggableObject;

const found = raycaster.intersectObjects(scene.children, true);
  if (found.length) {
  // Cycle upwards through every parent until it reaches the topmost layer (the Group)
  let current = found[0].object;
  while (current.parent.parent !== null) {
    current = current.parent;
  }
  if (current.isDraggable) {
    draggableModel = current;
  }
}



window.addEventListener('click', event => {
  // If 'holding' object on-click, set container to <undefined> to 'drop’ the object.
  if (draggableObject) {
    draggableObject= undefined;
    return;
  }

  // If NOT 'holding' object on-click, set container to <object> to 'pick up' the object.
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(clickMouse, camera);
  const found = raycaster.intersectObjects(scene.children, true);
  if (found.length && found[0].object.isDraggable) {
    draggableObject = found[0].object;
  }
});

window.addEventListener('mousemove', event => {
  moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

function dragObject() {
  // If 'holding' an object, move the object
  if (draggableObject) {
  const found = raycaster.intersectObjects(scene.children);
  // `found` is the metadata of the objects, not the objetcs themsevles  
    if (found.length) {
      for (let obj3d of found) {
        if (!obj3d.object.isDraggablee) {
          draggableObject.position.x = obj3d.point.x;
          draggableObject.position.z = obj3d.point.z;
          break;
        }
      }
    }
  }
};
window.addEventListener('mousemove', event => {
  dragObject();
  moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
});



function animate() {
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