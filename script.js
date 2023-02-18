import * as THREE from 'three'

const Scene = new Three.Scene()

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: "red" } );
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh);

const sizes = {
    width: 1600,
    height: 1200
}

const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3

scene.add(camera)

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(camera, scene)