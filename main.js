import "./style.css"
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas")
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(30)

renderer.render(scene, camera)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 20)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

//add star function
function addStar() {
  //making a star
  const geometry = new THREE.SphereGeometry(0.25, 24.24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  //spreading stars randomly
  const [x, y, z] = new Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

//multiplying stars created by 300
Array(300).fill().forEach(addStar)


const sunTexture = new THREE.TextureLoader().load("./2k_sun.jpg")
const normalTexture = new THREE.TextureLoader().load("./assets/normal.jpg")
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(12, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture
  })
)

scene.add(sun)


function animate() {
  requestAnimationFrame(animate)
  sun.rotation.y += 0.001

  controls.update()
  renderer.render(scene, camera)
}

animate()

sun.position.z = 0
sun.position.setX(0)


function moveCamera() {
  const t = document.body.getBoundingClientRect().top
  camera.position.z = t * -0.01
  camera.position.x = t * -0.0002
  camera.rotation.y = t * 0.0002
}

document.body.onscroll = moveCamera