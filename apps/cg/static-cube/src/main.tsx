import {
  AxesHelper, BufferAttribute, BufferGeometry, DoubleSide,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import gsap from 'gsap';

const debugParams = {
  triangleCount: 50,
  color: 0xff0000,
  spin() {
    gsap.to(triangle.rotation, { duration: 1, y: triangle.rotation.y + Math.PI * 2 })
  }
}

const canvas = document.getElementById('webgl')!;
const renderer = new WebGLRenderer({ canvas, antialias: true });

const scene = new Scene();

// create cube using random triangles
const mat = new MeshBasicMaterial({
  wireframe: false,
  color: debugParams.color
});
mat.side = DoubleSide;
const geo = createCustomGeometry();
const triangle = new Mesh(geo, mat);
scene.add(triangle);

// create camera
const cam = new PerspectiveCamera(75, 4 / 3, 0.1, 1000);
cam.position.x = 3;
cam.position.y = 3;
cam.position.z = 3;
cam.lookAt(0, 0, 0);
scene.add(cam);


// create helpers
const size = 10;
const divisions = 10;
const gridHelper = new GridHelper(size, divisions);
gridHelper.position.y = -0.01;
scene.add(gridHelper);

const axesHelper = new AxesHelper(5);
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
  width: 350,
});
gui
  .add(triangle.position, 'y')
  .min(- 3)
  .max(3)
  .step(0.01)
  .name('elevation')
gui.add(triangle, 'visible')
gui.add(mat, 'wireframe')
gui
  .addColor(debugParams, 'color')
  .onChange(() => {
    mat.color.set(debugParams.color)
  })
gui.add(debugParams, 'spin');
gui.add(debugParams, 'triangleCount')
  .min(0)
  .max(5000)
  .step(1)
  .onChange((val: number) => {
    geo.setDrawRange(0, val * 3);
  });

// start animation loop
renderer.setAnimationLoop((currTime) => {
  controls.update();
  renderer.render(scene, cam);
});


function createCustomGeometry() {
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

  return geometry;
}
