import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xffcc5d })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// let time = Date.now()
const clock = new THREE.Clock()


const tick = () => {

    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime

    const elapsedTime = clock.getElapsedTime()

    mesh.rotation.y += Math.sin(elapsedTime) * .02
    mesh.rotation.x += Math.cos(elapsedTime) * .02
    camera.lookAt(mesh.position)
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
}

tick()