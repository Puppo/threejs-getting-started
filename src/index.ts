import * as THREE from "three";
import { Mesh } from "three";

import "../scss/index.scss";
import { fontJSON } from "./font";

let scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  text: THREE.Mesh;
const ADD = 0.1;

const createText = () => {
  const titles =
    "99 bottles of beer on the wall,\n99 bottles of beer.\nTake one down, pass it around,\n98 bottles of beer on the wall,\n98 bottles of beer.\nTake one down, pass it around,\n97 bottles of beer on the wall,\n97 bottles of beer.\nTake one down, pass it around,\n96 bottles of beer on the wall,\n96 bottles of beer.\nTake one down, pass it around,\n95 bottles of beer on the wall,\n95 bottles of beer.";
  const fontLoader = new THREE.FontLoader();
  const font = fontLoader.parse(fontJSON);

  const geometry = new THREE.TextGeometry(titles, {
    font,
    size: 3,
    height: 0.1,
  });
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const text = new Mesh(geometry, material);
  text.position.x = -25;
  text.rotation.x = -0.9;
  return text;
};

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#000000");

  text = createText();
  scene.add(text);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    150
  );

  camera.position.set(0, 5, 40);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  text.position.z -= ADD;
  text.position.y += ADD / 2;
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
