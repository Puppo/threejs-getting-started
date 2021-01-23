import * as THREE from "three";
import { MeshBasicMaterial } from "three";

import "../scss/index.scss";

let scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  pointLight1: THREE.PointLight,
  sun1: THREE.Mesh,
  pointLight2: THREE.PointLight,
  sun2: THREE.Mesh,
  ADD = 0.03,
  theta = 0;

const createScene = (scene: THREE.Scene) => {
  const boxGeometry = new THREE.BoxBufferGeometry(10, 10, 10);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  const box = new THREE.Mesh(boxGeometry, material);
  box.position.set(0, 5, 0);
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

  pointLight1 = new THREE.PointLight(0xffffff, 1);
  const sphereGeometry = new THREE.SphereBufferGeometry(2, 20, 20);
  sun1 = new THREE.Mesh(
    sphereGeometry,
    new MeshBasicMaterial({
      color: 0xffff00,
    })
  );
  scene.add(sun1);
  scene.add(pointLight1);

  pointLight2 = new THREE.PointLight(0xffffff, 1);
  sun2 = new THREE.Mesh(
    sphereGeometry,
    new MeshBasicMaterial({
      color: 0xffff00,
    })
  );
  scene.add(sun2);
  scene.add(pointLight2);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);

  pointLight1.position.x = 15 * Math.cos(theta);
  pointLight1.position.z = 15 * Math.sin(theta);
  sun1.position.x = pointLight1.position.x;
  sun1.position.z = pointLight1.position.z;

  pointLight2.position.y = -20 * Math.cos(theta);
  pointLight2.position.z = -20 * Math.sin(theta);
  sun2.position.y = pointLight2.position.y;
  sun2.position.z = pointLight2.position.z;

  theta += ADD;
};

init();
mainLoop();
