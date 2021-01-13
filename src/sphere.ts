import * as THREE from "three";
import { Shape } from "./shape";

export class Sphere extends Shape {
  constructor(
    private readonly radius: number,
    private readonly widthSegments: number,
    private readonly heightSegments: number,
    private readonly color: string | number
  ) {
    super();
    this._object = new THREE.Mesh(this.createGeometry(), this.createMaterial());
  }

  protected createGeometry(): THREE.SphereGeometry {
    return new THREE.SphereGeometry(
      this.radius,
      this.widthSegments,
      this.heightSegments
    );
  }

  protected createMaterial(): THREE.MeshBasicMaterial {
    console.log("color", this.color);
    return new THREE.MeshBasicMaterial({
      color: this.color,
    });
  }
}
