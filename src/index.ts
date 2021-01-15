import * as THREE from "three";

import "../scss/index.scss";

let scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  sphere: THREE.Mesh,
  cube: THREE.Mesh;

let ADD = 0.02;

const createScene = () => {
  const mesh = new THREE.MeshDepthMaterial();

  const cubeGeometry = new THREE.BoxGeometry(3, 2, 4);
  cube = new THREE.Mesh(cubeGeometry, mesh);
  cube.position.x = -10;
  cube.position.z = -5;

  const sphereGeometry = new THREE.SphereGeometry(3, 30, 30);
  sphere = new THREE.Mesh(sphereGeometry, mesh);
  sphere.position.x = 0;
  sphere.position.z = 5;

  scene.add(cube);
  scene.add(sphere);
};

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // create an locate the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 15;

  createScene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  cube.position.z += ADD;
  sphere.position.z -= ADD;

  if (cube.position.z >= 6 || cube.position.z <= -6) ADD *= -1;
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
