import * as THREE from "three";
import { Sphere } from "./sphere";
import { Torus } from "./torus";
import { Planet } from "./planet";

import "../scss/index.scss";

let scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  planet: Planet;
let ADD = 0.005;

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#ededed");

  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 10;

  planet = new Planet(scene);
  planet.add(new Sphere(0.4, 30, 30, 0x8d5524));
  const torus1 = new Torus(0.6, 0.1, 2, 100, 0xffe39f);
  planet.add(torus1);
  const torus2 = new Torus(0.9, 0.1, 2, 100, 0xffad60);
  planet.add(torus2);
  const torus3 = new Torus(1.2, 0.1, 2, 50, 0xeac086);
  planet.add(torus3);
  planet.value.rotation.x += 1.7;
  planet.value.rotation.y += 0.5;
  planet.init();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  camera.position.y += ADD;

  if (camera.position.y <= -1 || camera.position.y >= 1) {
    ADD *= -1;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
