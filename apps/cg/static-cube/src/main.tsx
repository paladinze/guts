import {
  AxesHelper, BufferAttribute, BufferGeometry,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.getElementById('webgl')!;
const renderer = new WebGLRenderer({ canvas, antialias: true });

const scene = new Scene();

// create cube
const mat = new MeshBasicMaterial({
  wireframe: false,
  color: 'red'
});
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
    vertices[i] = Math.random() * 2 - 0.5;
  }
  geometry.setAttribute('position', new BufferAttribute(vertices, componentsPerVertex));

  return geometry;
}
