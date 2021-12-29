let scene, camera, renderer, cube

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
    
    const texture = new THREE.TextureLoader().load('textures/flare.png');

    const geometry = new THREE.PlaneGeometry(1,1)
    const material = new THREE.MeshPhongMaterial({map: texture})
    cube = new THREE.Mesh(geometry, material)
    scene.add( cube )

    camera.position.z = 12.5   
}

const animate = () => {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

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
}
