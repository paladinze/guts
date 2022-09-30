import {
  AmbientLight,
  AxesHelper,
  Clock,
  Color,
  GridHelper,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SpotLight,
  TextureLoader, Vector3,
  WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as CANNON from 'cannon-es';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const debugParams = {
  showDuckModel: false,
  showHelmetModel: true
};

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('assets/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

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
    friction: 0.7,
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
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearAlpha(0);
  const scene = new Scene();

  // create ambient light
  const ambientLight = new AmbientLight();
  ambientLight.color = new Color(0xffffff);
  ambientLight.intensity = 0.7;
  scene.add(ambientLight);

  // create spot light
  const spotLight = new SpotLight(0xffffff, 1, 10, Math.PI * 0.2, 0.25, 1);
  spotLight.position.set(2, 5, 2);
  scene.add(spotLight);
  spotLight.target.position.set(0, 0, 0);
  scene.add(spotLight.target);


  // create font
  const textMesh = await createTextMesh(fontLoader, textureLoader);
  textMesh.position.y = 5;
  scene.add(textMesh);

  // duck mesh
  const duckMesh = await loadDuckModel();
  scene.add(duckMesh);

  // helmet mesh
  const helmetMesh = await loadHelmet();
  scene.add(helmetMesh);

  // create camera
  const cam = new PerspectiveCamera(75, 4 / 3, 0.1, 1000);
  cam.position.x = 0;
  cam.position.y = 5;
  cam.position.z = 5;
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
  controls.autoRotate = true;
  controls.autoRotateSpeed = -Math.PI * 1;
  controls.enableDamping = true;
  controls.target = new Vector3(0, 2, 0);


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

    const element = document.getElementById('root') as any;
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
  gui.add(debugParams, 'showDuckModel').onChange((val: boolean) => {
    duckMesh.visible = val;
  });
  gui.add(debugParams, 'showHelmetModel').onChange((val: boolean) => {
    helmetMesh.visible = val;
  });

  // start animation loop
  const clock = new Clock();
  renderer.setAnimationLoop((currTime) => {
    controls.update();

    // cam.rotateY(clock.getElapsedTime())

    renderer.render(scene, cam);
  });
}

main();


function loadFont(loader: FontLoader, url: string) {
  return loader.loadAsync(url);
}

async function createTextMesh(fontLoader: FontLoader, textureLoader: TextureLoader) {
  const font = await loadFont(fontLoader, 'assets/fonts/kuaile_regular.typeface.json');
  const textGeometry = new TextGeometry(
    'Models',
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

async function loadDuckModel() {
  // const gltf = await gltfLoader.loadAsync('assets/models/Duck/glTF/Duck.gltf');
  const gltf = await gltfLoader.loadAsync('assets/models/Duck/glTF-Draco/Duck.gltf');
  const mesh = gltf.scene.children[0];
  mesh.scale.setScalar(0.02);
  mesh.visible = debugParams.showDuckModel;
  return mesh;
}

async function loadHelmet() {
  const gltf = await gltfLoader.loadAsync('assets/models/FlightHelmet/glTF/FlightHelmet.gltf');
  const mesh = new Group();
  for (let child of [...gltf.scene.children]) {
    mesh.add(child);
  }
  mesh.scale.setScalar(6.5);
  mesh.visible = debugParams.showHelmetModel;
  return mesh;
}
