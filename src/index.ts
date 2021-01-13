import * as THREE from "three";

import "../scss/index.scss";

let scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  geometry: THREE.Geometry,
  butterfly: THREE.Mesh<THREE.Geometry>;

let ADD = 0.8;

let createButterfly = function () {
  let geometry = new THREE.Geometry();

  let material = new THREE.MeshBasicMaterial({
    color: 0xff4606,
    side: THREE.DoubleSide,
  });

  butterfly = new THREE.Mesh(geometry, material);

  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(5, 0, 0));
  geometry.vertices.push(new THREE.Vector3(2, 4, 3));
  geometry.vertices.push(new THREE.Vector3(2, 4, -3));

  let wing = new THREE.Face3(0, 1, 2);
  geometry.faces.push(wing);
  wing = new THREE.Face3(0, 1, 3);
  geometry.faces.push(wing);

  butterfly.rotation.z = 0.7;
  butterfly.rotation.x = 0.6;

  scene.add(butterfly);
};

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#ededed");

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 40;

  createButterfly();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  butterfly.geometry.vertices[2].y += ADD;
  butterfly.geometry.vertices[3].y += ADD;
  butterfly.geometry.verticesNeedUpdate = true;

  if (
    butterfly.geometry.vertices[2].y < -4 ||
    butterfly.geometry.vertices[2].y > 4
  )
    ADD *= -1;

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
