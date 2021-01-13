import * as THREE from "three";
import { Shape } from "./shape";

export class Torus extends Shape {
  constructor(
    private readonly radius: number,
    private readonly tube: number,
    private readonly radialSegments: number,
    private readonly tubularSegments: number,
    private readonly color: string | number
  ) {
    super();
    this._object = new THREE.Mesh(this.createGeometry(), this.createMaterial());
  }

  protected createGeometry(): THREE.TorusGeometry {
    return new THREE.TorusGeometry(
      this.radius,
      this.tube,
      this.radialSegments,
      this.tubularSegments
    );
  }

  protected createMaterial(): THREE.MeshBasicMaterial {
    return new THREE.MeshBasicMaterial({
      color: this.color,
    });
  }
}
