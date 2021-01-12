import * as THREE from 'three'

import '../scss/index.scss'

let scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.Renderer;

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

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.append(renderer.domElement)
}



const mainLoop = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(mainLoop);
}

init()
mainLoop()