import * as THREE from "three";
import { Shape } from "./shape";

export class Planet extends Shape {
  constructor(protected scene: THREE.Object3D) {
    super();
    this._object = new THREE.Group();
  }

  add(shape: Shape) {
    this._object.add(shape.value);
  }

  init() {
    this.scene.add(this.value);
  }
}
