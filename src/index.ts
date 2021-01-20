import * as THREE from "three";

import "../scss/index.scss";

let scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.Renderer;
const fragments: Fragment[] = [];
class Fragment {
  public shape: THREE.Mesh;
  private rotation = 0.05;
  private moveCount = 0;

  constructor(
    position: any,
    public velocity: THREE.Vector3,
    g: THREE.Geometry
  ) {
    this.velocity = velocity;
    this.velocity.multiplyScalar(0.02);

    let material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: 0xffffff,
      emissive: 0xfafafa,
      emissiveIntensity: 0.4,
      shininess: 100,
      specular: 0x9d0a00,
      vertexColors: true,
    });

    this.shape = new THREE.Mesh(g, material);
    this.shape.position.copy(position);
  }

  move() {
    this.shape.position.add(this.velocity);
    this.shape.rotation.x += this.rotation;
    this.moveCount++;

    if (this.moveCount % 100 === 0) {
      this.rotation *= -1;
      this.velocity = new THREE.Vector3(
        this.velocity.x * -1,
        this.velocity.y * -1,
        this.velocity.z * -1
      );
    }
  }
}

const createTriangle = (
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  p3: THREE.Vector3
) => {
  let geometry = new THREE.Geometry();
  geometry.vertices.push(p1, p2, p3);
  geometry.faces.push(new THREE.Face3(0, 1, 2));
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  return geometry;
};

const createScene = () => {
  let p1 = new THREE.Vector3(0, 1, 0);
  let p2 = new THREE.Vector3(1, 0, 1);
  let p3 = new THREE.Vector3(-1, 0, 1);
  let p4 = new THREE.Vector3(-1, 0, -1);
  let p5 = new THREE.Vector3(1, 0, -1);
  let p6 = new THREE.Vector3(0, -1, 0);

  fragments.push(
    new Fragment(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 6),
      createTriangle(p1, p2, p3)
    )
  );

  fragments.push(
    new Fragment(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-2, 4, 0),
      createTriangle(p1, p3, p4)
    )
  );
  fragments.push(
    new Fragment(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 5, -4),
      createTriangle(p1, p4, p5)
    )
  );
  fragments.push(
    new Fragment(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(2, 3, 0),
      createTriangle(p1, p5, p2)
    )
  );
  fragments.push(
    new Fragment(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -5, 3),
      createTriangle(p3, p2, p6)
    )
  );
  fragments.push(
    new Fragment(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-4, -3, 0),
      createTriangle(p6, p3, p4)
    )
  );
  fragments.push(
    new Fragment(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -4, -4),
      createTriangle(p6, p4, p5)
    )
  );
  fragments.push(
    new Fragment(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(3, -3, 0),
      createTriangle(p6, p2, p5)
    )
  );

  fragments.forEach(f => scene.add(f.shape));
};

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#ededed");

  // create an locate the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    150
  );

  camera.position.set(0, 1, 45);

  createScene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.append(renderer.domElement);
};

const mainLoop = () => {
  fragments.forEach(f => f.move());
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
