import {
  AmbientLight,
  ArrowHelper,
  AxesHelper,
  BoxGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  Fog,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Raycaster,
  Scene,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


async function main() {

  // handle mouse inputs
  const mouse = new Vector2();
  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (1 - event.clientY / window.innerHeight) * 2 - 1;
    console.log(mouse);
  });

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


  // create font
  const textMesh = await createTextMesh(fontLoader, textureLoader);
  textMesh.position.y = 3.3;
  scene.add(textMesh);

  // create cubes
  const cube1 = createCube();
  cube1.mesh.position.y = 1;
  scene.add(cube1.mesh);

  const cube2 = createCube();
  cube2.mesh.position.x = -2.5;
  cube2.mesh.position.y = 1;
  scene.add(cube2.mesh);

  const cube3 = createCube();
  cube3.mesh.position.y = -2;
  cube3.mesh.position.x = 2.5;
  scene.add(cube3.mesh);


  // create camera
  const cam = new PerspectiveCamera(75, 4 / 3, 0.1, 1000);
  cam.position.x = 0;
  cam.position.y = 2;
  cam.position.z = 7;
  cam.lookAt(0, 0, 0);
  scene.add(cam);

  // create fog
  const fogColor = '#222222';
  scene.fog = new Fog(fogColor, 1, 15);
  // set clear color to match fog color
  renderer.setClearColor(fogColor);

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

  // static raycaster
  const rayOrigin = new Vector3(-5, 1, 0);
  const rayDir = (new Vector3(5, 0, 0)).normalize();
  const staticRaycaster = new Raycaster(rayOrigin, rayDir);
  scene.add(new ArrowHelper(staticRaycaster.ray.direction, staticRaycaster.ray.origin, 12, 0x0000ff));

  // mouse raycaster
  const mouseRaycaster = new Raycaster();


  // start animation loop
  renderer.setAnimationLoop((currTime) => {
    controls.update();

    // raycaster
    const testObjects = [cube1.mesh, cube2.mesh, cube3.mesh];
    for (const testObj of testObjects) {
      const mat = testObj.material as MeshBasicMaterial;
      mat.color.set('#dddddd');
    }

    // update static intersects
    const staticIntersects = staticRaycaster.intersectObjects(testObjects);
    for (const intersect of staticIntersects) {
      const mat = (intersect.object as Mesh).material as MeshBasicMaterial;
      mat.color.set('red');
    }

    // update mouse selection
    mouseRaycaster.setFromCamera(mouse, cam);
    const mouseIntersects = mouseRaycaster.intersectObjects(testObjects);
    for (const intersect of mouseIntersects) {
      const mat = (intersect.object as Mesh).material as MeshBasicMaterial;
      mat.color.set('blue');
    }

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
    'Raycast',
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
  // textGeometry.center();
  textGeometry.computeBoundingBox();
  textGeometry.translate(
    -textGeometry.boundingBox!.max.x * 0.5,
    -textGeometry.boundingBox!.max.y * 0.5,
    -textGeometry.boundingBox!.max.z * 0.5
  );
  return new Mesh(textGeometry, textMaterial);
}

function createCube() {
  const mat = new MeshBasicMaterial({
    wireframe: false,
    side: DoubleSide,
    color: '#dddddd'
  });
  const geo = new BoxGeometry(2, 2, 2);
  return {
    mesh: new Mesh(geo, mat),
    mat: mat,
    geo: geo
  };
}
