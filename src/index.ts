import * as THREE from 'three'
import { Cube } from './cube'

import '../scss/index.scss'

let scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.Renderer, cube: Cube;
let ADD = -0.10

const init = () => {
    scene = new THREE.Scene()
    scene.background = new THREE.Color('#ededed')

    camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )
    camera.position.z = 5

    cube = new Cube(scene, 1, 1, 1, 0x00a1cb)
    cube.init()

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.append(renderer.domElement)
}



const mainLoop = () => {
    cube.rotationY -= ADD

    renderer.render(scene, camera)
    requestAnimationFrame(mainLoop);
}

init()
mainLoop()