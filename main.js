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
    
    const geometry = new THREE.BoxGeometry(2,2,2)
    const material = new THREE.MeshBasicMaterial({color: 0x0000ff})
    cube = new THREE.Mesh(geometry, material)
    scene.add( cube )

    camera.position.z = 5    
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

window.addEventListener('resize', onWindowResize, false);

init()
animate()

onmousemove = function(e) {
    console.log("mouse location:", e.clientX, e.clientY)
    cube.position.x = e.clientX * 0.001
    cube.position.y = e.clientY * 0.001
}
