import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene;
scene.background=new THREE.Color(0xffffff)
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( {color: 0x00ff00, opacity:0.5, transparent:true} );
const box = new THREE.Mesh( geometry, material );
scene.add(box)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)


const camera = new THREE.PerspectiveCamera(46, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z=3;
renderer.render(scene, camera);


const controls=new OrbitControls(camera, renderer.domElement)

document.body.appendChild(renderer.domElement);




const fbxLoader = new FBXLoader()
fbxLoader.load(
    '../assets/dragon.fbx',
    (object) => {
        object.traverse(function (child) {
            if (child.isMesh) {
                console.log(object)
            }
        })
        object.scale.set(.01, .01, .01)
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)




window.addEventListener('resize', onWindowResize, false)

const stats = Stats()
document.body.appendChild(stats.dom)

scene.add(new THREE.AxesHelper(1))

const light = new THREE.PointLight()
light.position.set(0.8, 1.4, 1.0)
scene.add(light)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()