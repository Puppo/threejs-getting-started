import * as THREE from "three";
import { Sphere } from "./sphere";

import "../scss/index.scss";

let scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  sphere: Sphere;

let ADD = 0.01;

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#ededed");

  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 5;

  //   sphere = new Sphere(scene, 1, 0x000000, true);
  //   sphere = new Sphere(scene, 1, 0x000000, true, 1, Math.PI);
  sphere = new Sphere(scene, 1, 0x000000, true, 1, Math.PI, 0, Math.PI / 2);
  sphere.init();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  sphere.rotationX += ADD;
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
