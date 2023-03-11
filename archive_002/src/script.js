import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(2, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xf2a700 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(2.5, 0,0)
mesh.scale.set(.2,.3,.5)
scene.add(mesh)

mesh.rotation.reorder('XYZ')
mesh.rotation.x = Math.PI * .4
mesh.rotation.y = 1


const axesHelper = new THREE.AxesHelper(  );
scene.add( axesHelper );

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000})
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00})
)
cube2.position.x = -2
group.add(cube2)

/**
 * Sizes
 */
const sizes = {
    width: 900,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height)
camera.position.x = 1
camera.position.y = 
camera.position.z = 3
scene.add(camera)

console.log(mesh.position.distanceTo(camera.position))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)