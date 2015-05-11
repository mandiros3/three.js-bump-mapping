/*
Andi Milhomme

Computer Graphics assignment 4

May 2015

*/



var camera, controls, scene, renderer;
var cross;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 50, 
		window.innerWidth/window.innerHeight, 0.1, 1000 );
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
   // camera.lookAt(scene.position);

   controls = new THREE.TrackballControls( camera );

   controls.rotateSpeed = 1.0;
   controls.zoomSpeed = 1.2;
   controls.panSpeed = 0.8;

   controls.noZoom = false;
   controls.noPan = false;

   controls.staticMoving = true;
   controls.dynamicDampingFactor = 0.3;

   controls.keys = [ 65, 83, 68 ];

   controls.addEventListener( 'change', render );





// the scene
scene = new THREE.Scene();

addLand();
addHouse();
addChimney();


//lighting
var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);
var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -40, 60, -10 );
spotLight.castShadow = true;
scene.add( spotLight );
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -10, 60, -50);
scene.add( spotLight );
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -10, -30, 20);
scene.add( spotLight );


//renderer

// I chose the webGLrender, the size is set, so you'd need a wide
            // monitor.
            renderer = new THREE.WebGLRenderer();

            renderer.setSize( 1170, 607 );
            renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.shadowMapEnabled = true;
            $("#sceneContainer").append(renderer.domElement );

            render();


        }

        function render() {

        	renderer.render( scene, camera );

        }

        function animate() {

        	requestAnimationFrame( animate );
        	controls.update();

        }


        function addLand() {

        	// load the grass texture and bump map
    var planeTexture = new THREE.ImageUtils.loadTexture('img/grass.png');
    var planeBump = new THREE.ImageUtils.loadTexture('img/grassbump.png');

    // allow the texture and bump map to tile across the plane
    planeTexture.wrapS = planeBump.wrapS = THREE.RepeatWrapping;
    planeTexture.wrapT = planeBump.wrapT = THREE.RepeatWrapping;
    planeTexture.repeat.x = planeBump.repeat.x = 4;
    planeTexture.repeat.y = planeBump.repeat.y = 4;

    // create the geometry and material for the plane
    var planeGeometry = new THREE.PlaneBufferGeometry(60, 60);
    var planeMaterial = new THREE.MeshPhongMaterial({
        map: planeTexture, bumpMap: planeBump
    });

    // create the plane and enable shadows
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

         // rotate and position the plane
         plane.rotation.x=-0.5*Math.PI;
         plane.position.x=-5
         plane.position.y=0
         plane.position.z=0

         scene.add(plane);
     }

     function addHouse()
     {
     	
     	var cubeBump = createMesh(new THREE.CubeGeometry(17, 10, 15), "brick-wall.jpg", "brickBump.jpg");
     	

     	
     	cubeBump.position.x = -5;
     	cubeBump.position.y = 4.5;
     	cubeBump.position.z = 0;
     	cubeBump.castShadow = true;
     	
     	scene.add( cubeBump );


     }


     function addChimney() {

     	var geo = new THREE.BoxGeometry(4, 13, 4);
     	var chimneyBump = createMesh(new THREE.BoxGeometry(4, 13, 4), "chimney.jpg", "chimneyBump.jpg");
     	chimneyBump.position.x = -5;
     	chimneyBump.position.y = 6.3;
     	chimneyBump.position.z = 7;
     	chimneyBump.castShadow = true;

     	scene.add(chimneyBump);

     }

     function createMesh(geom, imageFile, bump) {
     	var texture = THREE.ImageUtils.loadTexture("img/" + imageFile)
     	geom.computeVertexNormals();
     	var mat = new THREE.MeshPhongMaterial();
     	mat.map = texture;

     	var bump = THREE.ImageUtils.loadTexture("img/" + imageFile)
     	mat.bumpMap = bump;
                mat.bumpScale = 0.2;

     	var mesh = new THREE.Mesh(geom, mat);
     	return mesh;
     }

