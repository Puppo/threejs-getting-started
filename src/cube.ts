import * as THREE from 'three'

export class Cube {
    private cube: THREE.Mesh;

    public get rotationY() : number {
        return this.cube.rotation.y;
    }
    public set rotationY(v : number) {
        this.cube.rotation.y = v;
    }

    constructor(
        private readonly scene: THREE.Scene,
        width: number,
        height: number,
        depth: number,
        color: THREE.Color | string | number
    ) {
        const geometry = new THREE.BoxGeometry(width, height, depth)
        const mesh = new THREE.MeshBasicMaterial({ color })
        this.cube = new THREE.Mesh(geometry, mesh)
    }

    init(): void {
        this.scene.add(this.cube)
    }

}