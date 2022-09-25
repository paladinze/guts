import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  SpotLight,
  SpotLightHelper,
  TextureLoader,
  WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import gsap from 'gsap';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


async function main() {
  const debugParams = {
    triangleCount: 300,
    color: 0xff0000,
    spin() {
      gsap.to(cubeMesh.rotation, { duration: 1, y: cubeMesh.rotation.y + Math.PI * 2 });
    }
  };

  // loaders
  const fontLoader = new FontLoader();
  const textureLoader = new TextureLoader();

  // get Canvas and create scene
  const canvas = document.getElementById('webgl')!;
  const renderer = new WebGLRenderer({ canvas, antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;


  const scene = new Scene();

  // create ambient light
  const ambientLight = new AmbientLight();
  ambientLight.color = new Color(0xffffff);
  ambientLight.intensity = 0.1;
  scene.add(ambientLight);

  // create directional light
  const directionalLight = new DirectionalLight(0xff0000, 0.5);
  directionalLight.position.set(3, 5, 2);
  // scene.add(directionalLight);

  // create spot light
  const spotLight = new SpotLight(0xff0000, 2.0, 10, Math.PI * 0.2, 0.25, 1);
  spotLight.position.set(2, 5, 2);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.mapSize.width = 2048;
  // spotLight.shadow.radius = 3;
  scene.add(spotLight);
  spotLight.target.position.set(0, 0, 0);
  scene.add(spotLight.target);
  const spotLightHelper = new SpotLightHelper(spotLight, 'red');
  scene.add(spotLightHelper);


  // create font
  const textMesh = await createTextMesh(fontLoader, textureLoader);
  textMesh.position.y = 3.3;
  scene.add(textMesh);

  // create cube using random triangles
  // const { cubeMesh, cubeMat, cubeGeo } = createCubeMesh(debugParams);
  // scene.add(cubeMesh);

  // create cube using PBR material
  const { cubeMesh, cubeMat, cubeGeo } = createPbrCubeMesh();
  cubeMesh.position.y = 1;
  cubeMesh.castShadow = true;
  scene.add(cubeMesh);

  // create ground
  const ground = createGround();
  ground.position.y = -0.01;
  ground.receiveShadow = true;
  scene.add(ground);

  // create camera
  const cam = new PerspectiveCamera(75, 4 / 3, 0.1, 1000);
  cam.position.x = 0;
  cam.position.y = 2;
  cam.position.z = 7;
  cam.lookAt(0, 0, 0);
  scene.add(cam);


  // create helpers
  const size = 10;
  const divisions = 10;
  const gridHelper = new GridHelper(size, divisions);
  gridHelper.position.y = -0.01;
  scene.add(gridHelper);

  const axesHelper = new AxesHelper(5);
  axesHelper.position.y = 0.05  ;
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
  gui
    .add(cubeMesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation');
  gui.add(cubeMesh, 'visible');
  gui.add(cubeMat, 'wireframe');
  gui
    .addColor(debugParams, 'color')
    .onChange(() => {
      cubeMat.color.set(debugParams.color);
    });
  gui.add(debugParams, 'spin');
  gui.add(debugParams, 'triangleCount')
    .min(0)
    .max(5000)
    .step(1)
    .onChange((val: number) => {
      cubeGeo.setDrawRange(0, val * 3);
    });
  gui.close();

  // start animation loop
  renderer.setAnimationLoop((currTime) => {
    controls.update();
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
    'A Random Cube',
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
  // const textMaterial = new MeshBasicMaterial({
  //   color: '0xDDDDDD',
  //   wireframe: true
  // });

  const texture = await textureLoader.loadAsync('assets/textures/matcap_05.png');
  const textMaterial = new MeshMatcapMaterial({
    matcap: texture
  });

  // center the text geometry inside the mesh
  // textGeometry.center();
  textGeometry.computeBoundingBox();
  textGeometry.translate(
    -textGeometry.boundingBox!.max.x * 0.5,
    -textGeometry.boundingBox!.max.y * 0.5,
    -textGeometry.boundingBox!.max.z * 0.5
  );
  return new Mesh(textGeometry, textMaterial);
}

/**
 * A cube made of tons of random triangles
 * @param debugParams
 */
function createCubeMesh(debugParams: any) {
  const mat = new MeshBasicMaterial({
    wireframe: false,
    side: DoubleSide,
    color: debugParams.color
  });
  const geo = createCustomGeometry(debugParams);
  return {
    cubeMesh: new Mesh(geo, mat),
    cubeMat: mat,
    cubeGeo: geo
  };
}

function createGround() {
  const mat = new MeshStandardMaterial();
  const geo = new BoxGeometry(20, 0.1, 20);
  return new Mesh(geo, mat);
}


function createPbrCubeMesh() {
  const mat = new MeshStandardMaterial({
    wireframe: false,
    roughness: 0.4,
    side: DoubleSide
  });
  const geo = new BoxGeometry(2, 2, 2);
  return {
    cubeMesh: new Mesh(geo, mat),
    cubeMat: mat,
    cubeGeo: geo
  };
}

function createCustomGeometry(debugParams: any) {
  const triangleCount = 50000;
  const vertexPerTriangle = 3;
  const componentsPerVertex = 3;
  const totalComponents = triangleCount * vertexPerTriangle * componentsPerVertex;

  const geometry = new BufferGeometry();
  const vertices = new Float32Array(totalComponents);
  for (let i = 0; i < totalComponents; i++) {
    vertices[i] = Math.random() * 2;
  }
  geometry.setAttribute('position', new BufferAttribute(vertices, componentsPerVertex));
  geometry.setDrawRange(0, debugParams.triangleCount);

  return geometry;
}
