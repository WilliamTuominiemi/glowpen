import './style.css'

import * as THREE from 'three';

import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";

let scene, camera, renderer, light

let i = 0
let objects = []

let bloomComposer, renderScene, bloomPass

const init = () => {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    
    renderer = new THREE.WebGLRenderer({antialias: true})
    
    renderer.autoClear = false;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    renderer.setClearColor(0x000000, 0.0);

    renderScene = new RenderPass(scene, camera);
    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 2;
    bloomPass.radius = 0;
    bloomComposer = new EffectComposer(renderer);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.renderToScreen = true;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 15), new THREE.MeshBasicMaterial({ color: new THREE.Color("#FDB813") }));
    sphere.position.set(0, 0, 0);
    sphere.layers.set(1);
    scene.add(sphere);

    document.body.appendChild(renderer.domElement)

    light = new THREE.PointLight( new THREE.Color( 1, 1, 1 ), 1 );
    light.position.set( 0, 5, 5 );
    scene.add( light );

    const ambientlight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientlight);

    camera.position.z = 12.5   
}

const animate = () => {
    requestAnimationFrame(animate)
    bloomComposer.render();
    renderer.render(scene, camera)
}

const onWindowResize = () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
}

let mouse = new THREE.Vector2()

onmousemove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    
    light.color = new THREE.Color( 1, mouse.x, mouse.y );

    const geometry = new THREE.SphereGeometry(0.5, 32, 16)
    const material = new THREE.MeshPhongMaterial({color: 0xffffff})
    let object = new THREE.Mesh(geometry, material)

    object.position.x = mouse.x * window.innerWidth / 100
    object.position.y = mouse.y * window.innerHeight / 100

    object.name = i
    i += 1

    object.material.color = new THREE.Color( Math.random(), Math.random(), Math.random() );

    objects.push(object)

    if(objects.length > 100) {
      scene.remove(objects[0]);
      objects.shift();
    }

    scene.add( object )
}

window.addEventListener('resize', onWindowResize, false);
init()
animate()