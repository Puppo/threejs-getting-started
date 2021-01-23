import * as THREE from "three";
import { MeshBasicMaterial } from "three";

import "../scss/index.scss";

let scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  pointLight: THREE.SpotLight,
  ADD = 0.1;

const createScene = (scene: THREE.Scene) => {
  const boxGeometry = new THREE.BoxBufferGeometry(10, 10, 10);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  const box = new THREE.Mesh(boxGeometry, material);
  box.position.set(5, 5, 0);
  box.rotateX(5);
  box.rotateZ(5);
  scene.add(box);
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

  pointLight = new THREE.SpotLight(0xffffff, 1, 200, Math.PI / 2, 0.5, 0.5);
  pointLight.position.set(15, 15, 0);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);

  pointLight.position.y += ADD;
  if (pointLight.position.y <= 11 || pointLight.position.y >= 25) {
    ADD *= -1;
  }
};

init();
mainLoop();
