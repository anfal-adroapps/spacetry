import * as THREE from './modules/three.module.min.js'
import { OrbitControls } from './modules/OrbitControls.js'
// import sunTexture from './textures/sun.jpg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const textureLoader = new THREE.TextureLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

scene.background = new THREE.CubeTextureLoader().setPath("./textures/").load([
    "stars.jpg",
    "stars.jpg",
    "stars.jpg",
    "stars.jpg",
    "stars.jpg",
    "stars.jpg"
]);


const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("./textures/sun.jpg")
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanete(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

const mercury = createPlanete(3.2, './textures/mercury.jpg', 50);
const venus = createPlanete(5.8, './textures/venus.jpg', 75);
const earth = createPlanete(6, './textures/earth.jpg', 100);
const mars = createPlanete(4, './textures/mars.jpg', 125);
const jupiter = createPlanete(12, './textures/jupiter.jpg', 150);
const saturn = createPlanete(10, './textures/saturn.jpg', 175, {
    innerRadius: 10,
    outerRadius: 20,
    texture: './textures/saturn ring.png'
});
const uranus = createPlanete(7, './textures/uranus.jpg', 200, {
    innerRadius: 7,
    outerRadius: 12,
    texture: './textures/uranus ring.png'
});
const neptune = createPlanete(7, './textures/neptune.jpg', 225);
const pluto = createPlanete(2.8, './textures/pluto.jpg', 250);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);



camera.position.z = 5;

controls.update();
function animate() {
    //Self-rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    //Around-sun-rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});