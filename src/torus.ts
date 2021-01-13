import * as THREE from "three";

export class Torus {
  private torus: THREE.Mesh;

  public get rotationX(): number {
    return this.torus.rotation.x;
  }
  public set rotationX(v: number) {
    this.torus.rotation.x = v;
  }

  public get rotationY(): number {
    return this.torus.rotation.y;
  }
  public set rotationY(v: number) {
    this.torus.rotation.y = v;
  }

  constructor(
    private scene: THREE.Scene,
    radius: number,
    tube: number,
    radialSegments: number,
    tubularSegments: number,
    color: THREE.Color | string | number,
    wireframe: boolean
  ) {
    const geometry = new THREE.TorusGeometry(
      radius,
      tube,
      radialSegments,
      tubularSegments,
      Math.PI
    );
    const material = new THREE.MeshBasicMaterial({
      color,
      wireframe,
    });

    this.torus = new THREE.Mesh(geometry, material);
  }

  init() {
    this.scene.add(this.torus);
  }
}
