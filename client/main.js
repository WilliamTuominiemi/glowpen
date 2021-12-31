import './style.css'

import * as THREE from 'three';

let scene, camera, renderer, light

let i = 0
let objects = []

const init = () => {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    
    renderer = new THREE.WebGLRenderer({antialias: true})
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    document.body.appendChild(renderer.domElement)

    light = new THREE.PointLight( new THREE.Color( 1, 1, 1 ), 1 );
    light.position.set( 0, 5, 5 );
    scene.add( light );

    camera.position.z = 12.5   
}

const animate = () => {
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
}

const onWindowResize = () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
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