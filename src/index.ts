import * as THREE from "three";
import { Torus } from "./torus";

import "../scss/index.scss";

let scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  torus: Torus;

const ADD = 0.01;

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#ededed");

  torus = new Torus(scene, 1, 0.2, 30, 30, 0xffffff, true);
  torus.init();

  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  torus.rotationX += ADD;
  torus.rotationY += ADD;
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
