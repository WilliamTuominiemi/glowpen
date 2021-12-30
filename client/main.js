import './style.css'

import * as THREE from 'three';

let obejcts = []

let scene, camera, renderer, cube, lightColor, light

let r,g,b

r = 1
g = 0
b = 0

lightColor = new THREE.Color( r, g, b );

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
    
    const geometry = new THREE.OctahedronGeometry(0.5,1)
    const material = new THREE.MeshPhongMaterial({color: 0xffffff})
    cube = new THREE.Mesh(geometry, material)
    scene.add( cube )

    light = new THREE.PointLight( lightColor, 1 );
    light.position.set( 0, 5, 5 );
    scene.add( light );

    camera.position.z = 12.5   
}

const animate = () => {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    cube.rotation.z += 0.01

    renderer.render(scene, camera)
}

const onWindowResize = () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init()
animate()

let mouse = new THREE.Vector2()


onmousemove = function(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

    cube.position.x = mouse.x * window.innerWidth / 100
    cube.position.y = mouse.y * window.innerHeight / 100

    r = Math.random()
    g = Math.random()
    b = Math.random()

    lightColor = new THREE.Color( mouse.x, mouse.y, 1 );
    
    light.color = lightColor


}
