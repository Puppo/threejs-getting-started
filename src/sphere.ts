import * as THREE from "three";

export class Sphere {
  private sphere: THREE.Mesh;

  public get rotationX(): number {
    return this.sphere.rotation.x;
  }
  public set rotationX(v: number) {
    this.sphere.rotation.x = v;
  }

  public get rotationY(): number {
    return this.sphere.rotation.y;
  }
  public set rotationY(v: number) {
    this.sphere.rotation.y = v;
  }

  constructor(
    private scene: THREE.Scene,
    rad: number,
    color: THREE.Color | string | number,
    wireframe?: boolean,
    phiStart?: number,
    phiLength?: number,
    thetaStart?: number,
    thetaLength?: number
  ) {
    const geometry = new THREE.SphereBufferGeometry(
      rad,
      30,
      30,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength
    );
    const material = new THREE.MeshBasicMaterial({ color, wireframe });
    this.sphere = new THREE.Mesh(geometry, material);
  }

  init() {
    this.scene.add(this.sphere);
  }
}
