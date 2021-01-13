import * as THREE from "three";
import { Torus } from "./torus";

export class Donut extends Torus {
  constructor(
    scene: THREE.Scene,
    position: { x: number; z: number },
    rotation: {
      x: number;
      y: number;
    }
  ) {
    super(scene, 0.8, 0.5, 30, 30, Math.random() * 0xffffff, false);

    this.torus.position.x = position.x;
    this.torus.position.z = position.z;
    this.positionY = 15;
    this.rotationX = rotation.x;
    this.rotationY = rotation.y;
  }
}
