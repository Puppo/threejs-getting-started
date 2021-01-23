import * as THREE from "three";

import "../scss/index.scss";

let scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  spotLight1: THREE.SpotLight,
  spotLight2: THREE.SpotLight,
  cubes: THREE.Mesh[] = [],
  ADD = 0.1,
  target1: THREE.Object3D,
  target2: THREE.Object3D;

const randomInRange = (from: number, to: number) => {
  let x = Math.random() * (to - from);
  return x + from;
};

const createCube = () => {
  let w = randomInRange(5, 8);
  let h = randomInRange(5, 8);
  let d = randomInRange(5, 8);
  let geometry = new THREE.BoxGeometry(w, h, d);
  let material = new THREE.MeshPhongMaterial({
    color: Math.random() * 0xffffff,
  });
  let cube = new THREE.Mesh(geometry, material);
  cube.position.x = randomInRange(-20, 20);
  cube.position.z = randomInRange(-20, 20);
  cubes.push(cube);
};

const createScene = (scene: THREE.Scene) => {
  for (let i = 0; i < 10; i++) createCube();

  cubes.forEach(cube => scene.add(cube));
};

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // create an locate the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 10, 20);

  spotLight1 = new THREE.SpotLight(0xffffff, 1);
  spotLight1.position.set(15, 20, 10);
  spotLight1.angle = Math.PI / 20;
  spotLight1.penumbra = 0.05;
  spotLight1.decay = 2;
  spotLight1.distance = 200;

  scene.add(spotLight1);

  target1 = new THREE.Object3D();
  target1.position.set(20, 0, 0);
  spotLight1.target = target1;

  scene.add(target1);

  spotLight2 = new THREE.SpotLight(0xffffff, 1);
  spotLight2.position.set(-15, 20, 10);
  spotLight2.angle = Math.PI / 20;
  spotLight2.penumbra = 0.05;
  spotLight2.decay = 2;
  spotLight2.distance = 200;

  scene.add(spotLight2);

  target2 = new THREE.Object3D();
  target2.position.set(-10, 0, 0);
  spotLight2.target = target2;

  scene.add(target2);

  createScene(scene);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);

  target1.position.x -= ADD;
  target2.position.x += ADD;
  if (target1.position.x < -20 || target1.position.x > 20) ADD *= -1;
};

init();
mainLoop();
