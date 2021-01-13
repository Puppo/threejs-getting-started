import * as THREE from "three";
import { Torus } from "./torus";
import { Donut } from "./donut";

import "../scss/index.scss";

let scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  donuts: Torus[] = [];

const ADD = 0.1;

const randomRange = (to: number, from: number) =>
  Math.random() * (from - to) + to;

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

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  if (Math.random() < 0.2) {
    const donut = new Donut(
      scene,
      {
        x: randomRange(-15, 15),
        z: randomRange(-15, 15),
      },
      {
        x: randomRange(-0.5, 0.5),
        y: randomRange(-0.5, 0.5),
      }
    );
    donut.init();
    donuts.push(donut);
  }

  donuts.forEach(donut => (donut.positionY -= ADD));
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
