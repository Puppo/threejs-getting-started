import * as THREE from "three";

import "../scss/index.scss";

let scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  ADD = 0.01,
  ambientLight: THREE.AmbientLight;

const createScene = (scene: THREE.Scene) => {
  const boxGeometry = new THREE.BoxBufferGeometry(5, 5, 5);
  const material = new THREE.MeshPhongMaterial({
    color: 0x0f1d89,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  const box = new THREE.Mesh(boxGeometry, material);
  box.position.set(-10, 0, -10);
  scene.add(box);

  const coneGeometry = new THREE.ConeGeometry(3, 4, 20, 1, true);
  const cone = new THREE.Mesh(coneGeometry, material);
  cone.position.set(10, 0, 10);
  scene.add(cone);

  const planeGeometry = new THREE.PlaneBufferGeometry(1000, 1000, 50, 50);
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x693421,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotateX(-Math.PI / 2);

  scene.add(plane);
};

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#ededed");

  // create an locate the camera
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    150
  );

  camera.position.set(0, 5, 40);

  createScene(scene);

  ambientLight = new THREE.AmbientLight(0xffffff, 1);
  ambientLight.position.set(0, 50, 0);
  scene.add(ambientLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);

  ambientLight.intensity += ADD;
  if (ambientLight.intensity >= 8 || ambientLight.intensity < 1) {
    ADD *= -1;
  }
};

init();
mainLoop();
