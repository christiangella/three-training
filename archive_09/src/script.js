
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( '#f2f2f2' );

// axis
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const wetTexture = textureLoader.load('/textures/matcaps/wettestmatcap3.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/Xhers_Regular.json',
    (font) => {
        const material = new THREE.MeshNormalMaterial()

        const textGeometry = new TextGeometry(
            'manong', {
                font: font,
                size: 0.5,
                height: 0.1,
                curveSegments: 2,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.001,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )

        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x * 0.5) * 0.5,
        //     - (textGeometry.boundingBox.max.y * 0.5) * 0.5,
        //     - textGeometry.boundingBox.max.z * 1.5
        // )
        textGeometry.center()

        const textMaterial = new THREE.MeshNormalMaterial()
        textMaterial.flatShading = true
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        const donutGeometry = new THREE.OctahedronGeometry(0.13,0)

        for(let i = 0; i < 200; i++)
        {
            const donut = new THREE.Mesh(donutGeometry, material)
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }
    }
)

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0.65
camera.position.y = -0.9
camera.position.z = 2.1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()