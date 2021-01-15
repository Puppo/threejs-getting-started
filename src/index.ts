import * as THREE from "three";
import { FaceNormalsHelper } from "three/examples/jsm/helpers/FaceNormalsHelper";

import "../scss/index.scss";

let scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  mesh: THREE.Mesh,
  normals: FaceNormalsHelper;
let ADD = 0.02;

let createGeometry = function () {
  let geometry = new THREE.BoxGeometry(5, 5, 5);
  // let geometry = new THREE.SphereGeometry(5, 30, 30);
  // let geometry = new THREE.TorusGeometry(5, 2, 10, 12);

  let material = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.8,
  });

  mesh = new THREE.Mesh(geometry, material);

  normals = new FaceNormalsHelper(mesh, 5);

  scene.add(mesh);
  scene.add(normals);
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

  createGeometry();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  mesh.rotation.x += ADD;
  mesh.rotation.y += ADD;
  normals.update();

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
