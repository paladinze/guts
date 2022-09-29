import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  Clock,
  Color,
  DoubleSide,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  TextureLoader,
  Vector3,
  WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as CANNON from 'cannon-es';
import GUI from 'lil-gui';

const debugParams = {
  left2RightWind: true,
  right2LeftWind: true,
};


async function main() {
  /**
   * Physics
   */
  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);

  // physics material
  const glassMat = new CANNON.Material('glass');
  const plasticMat = new CANNON.Material('plastic');
  const contactMat = new CANNON.ContactMaterial(glassMat, plasticMat, {
    friction: 0.7 ,
    restitution: 0.2
  });
  world.addContactMaterial(contactMat);

  // static floor
  const floorBody = new CANNON.Body();
  floorBody.addShape(new CANNON.Plane());
  floorBody.material = glassMat;
  floorBody.mass = 0; // static
  floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0),
    Math.PI * 0.5
  );
  world.addBody(floorBody);

  // loaders
  const fontLoader = new FontLoader();
  const textureLoader = new TextureLoader();

  // get Canvas and create scene
  const canvas = document.getElementById('webgl')!;
  const renderer = new WebGLRenderer({ canvas, antialias: true });
  const scene = new Scene();

  // create ambient light
  const ambientLight = new AmbientLight();
  ambientLight.color = new Color(0xffffff);
  ambientLight.intensity = 0.1;
  scene.add(ambientLight);

  // create font
  const textMesh = await createTextMesh(fontLoader, textureLoader);
  textMesh.position.y = 7;
  scene.add(textMesh);

  // create mesh
  const sphereMesh = createSphereMesh();
  sphereMesh.position.y = 5;
  scene.add(sphereMesh);

  // rigid body for the mesh
  const sphereShape = new CANNON.Sphere(0.5);
  const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(
      sphereMesh.position.x,
      sphereMesh.position.y,
      sphereMesh.position.z
    ),
    shape: sphereShape
  });
  sphereBody.material = plasticMat;
  world.addBody(sphereBody);

  // starting force
  // sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0));

  // create camera
  const cam = new PerspectiveCamera(75, 4 / 3, 0.1, 1000);
  cam.position.x = 0;
  cam.position.y = 5;
  cam.position.z = 12;
  cam.lookAt(0, 0, 0);
  scene.add(cam);

  // create helpers
  const size = 10;
  const divisions = 10;
  const gridHelper = new GridHelper(size, divisions);
  gridHelper.position.y = -0.01;
  scene.add(gridHelper);

  const axesHelper = new AxesHelper(5);
  axesHelper.position.y = 0.05;
  scene.add(axesHelper);

// camera controls
  const controls = new OrbitControls(cam, canvas);
  controls.enableDamping = true;


// set viewport resolution and canvas size
  function resize() {
    const dpr = window.devicePixelRatio;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const resolutionX = width * dpr;
    const resolutionY = height * dpr;

    cam.aspect = width / height;
    cam.updateProjectionMatrix();

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    renderer.setSize(resolutionX, resolutionY, false);
  }

  resize();
  window.onresize = resize;

  // handle fullscreen mode
  window.addEventListener('dblclick', () => {
    // @ts-ignore
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      // @ts-ignore
      (document.exitFullscreen || document.webkitExitFullscreen).apply(document);
      return;
    }

    const element = canvas as any;
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen(); // Safari hack
    else if (element.mozRequestFullScreen) element.mozRequestFullScreen(); // Careful to the capital S
    else if (element.msRequestFullscreen) element.msRequestFullscreen();
    else if (element.webkitEnterFullscreen) element.webkitEnterFullscreen(); // Magic is here for iOS
  });

  // create debug GUI
  const gui = new GUI({
    width: 350
  });
  gui.add(debugParams, 'left2RightWind');
  gui.add(debugParams, 'right2LeftWind');

  // start animation loop
  renderer.setAnimationLoop((currTime) => {
    controls.update();
    renderer.render(scene, cam);
  });

  const clock = new Clock();
  let oldElapsedTime = 0;
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;

    // Update physics
    if (debugParams.left2RightWind) {
      sphereBody.applyForce(new CANNON.Vec3(0.15, 0, 0), sphereBody.position); // simulate wind
    }
    if (debugParams.right2LeftWind) {
      sphereBody.applyForce(new CANNON.Vec3(-0.15, 0, 0), sphereBody.position); // simulate wind
    }
    world.step(1 / 60, deltaTime);
    sphereMesh.position.copy(new Vector3(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z));

    requestAnimationFrame(tick);
  };
  tick();
}

main();


function loadFont(loader: FontLoader, url: string) {
  return loader.loadAsync(url);
}

async function createTextMesh(fontLoader: FontLoader, textureLoader: TextureLoader) {
  const font = await loadFont(fontLoader, 'assets/fonts/kuaile_regular.typeface.json');
  const textGeometry = new TextGeometry(
    'Physics',
    {
      font: font,
      size: 0.7,
      height: 0.2,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 3
    }
  );

  const texture = await textureLoader.loadAsync('assets/textures/matcap_05.png');
  const textMaterial = new MeshMatcapMaterial({
    matcap: texture
  });

  // center the text geometry inside the mesh
  textGeometry.center();
  return new Mesh(textGeometry, textMaterial);
}

function createSphereMesh() {
  const geo = new SphereGeometry(0.5);
  const mat = new MeshBasicMaterial({
    color: 'red'
  });
  return new Mesh(geo, mat);
}

function createCubeMesh() {
  const mat = new MeshBasicMaterial({
    wireframe: false,
    color: 'red',
    side: DoubleSide
  });
  const geo = new BoxGeometry(1, 1, 1);
  return {
    cubeMesh: new Mesh(geo, mat),
    cubeMat: mat,
    cubeGeo: geo
  };
}
