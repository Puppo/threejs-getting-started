import * as THREE from "three";

export abstract class Shape {
  protected _object: THREE.Object3D;

  get value(): THREE.Object3D {
    return this._object;
  }

  setRotation(rotation: { x: number; y: number; z: number }): void {
    this._object.rotation.x = rotation.x;
    this._object.rotation.y = rotation.y;
    this._object.rotation.z = rotation.z;
  }
}
