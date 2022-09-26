import {
  AdditiveBlending,
  AxesHelper,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Fog,
  GridHelper,
  Mesh,
  MeshMatcapMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  TextureLoader,
  WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


async function main() {
  const debugParams = {
    pointCount: 500,
    waveAnimation: false,
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

  // create directional light
  // const directionalLight = new DirectionalLight(0xff0000, 0.5);
  // directionalLight.position.set(3, 5, 2);
  // scene.add(directionalLight);

  // create font
  const textMesh = await createTextMesh(fontLoader, textureLoader);
  textMesh.position.y = 3.3;
  scene.add(textMesh);

  // primitive shape particles
  const primitiveParticles = createParticlesUsingPrimitive();
  scene.add(primitiveParticles);

  // custom particles
  const { points, geo } = await createParticlesUsingCustomGeometry(debugParams, textureLoader);
  scene.add(points);

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
  gui
    .add(debugParams, 'pointCount')
    .min(10)
    .max(10000)
    .step(100)
    .name('pointCount')
    .onChange((val: number) => {
      geo.setDrawRange(0, val);
    });
  gui.add(debugParams, 'waveAnimation');

  // start animation loop
  const clock = new Clock();
  renderer.setAnimationLoop(() => {
    controls.update();

    // sine wave animation
    if (debugParams.waveAnimation) {
      const { pointCount } = debugParams;
      const posAttrib = geo.attributes['position'];
      for (let i = 0; i < pointCount; i++) {
        const x = posAttrib.getX(i);
        posAttrib.setY(i, Math.sin(x + clock.getElapsedTime()));
      }
      posAttrib.needsUpdate = true;
    } else {
      points.rotation.y  = Math.sin(clock.getElapsedTime() * 0.1);
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
    'Particles',
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

  const texture = await textureLoader.loadAsync('assets/textures/matcap_04.png');
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

function createParticlesUsingPrimitive() {
  const mat = new PointsMaterial({
    size: 0.2,
    sizeAttenuation: true
  });
  const geo = new SphereGeometry(2.5);
  return new Points(geo, mat);
}

async function createParticlesUsingCustomGeometry(debugParams: any, textureLoader: TextureLoader) {
  const pointCount = 5000000;
  const componentsCount = pointCount * 3;
  const vertices = new Float32Array(componentsCount);
  const vertexColors = new Float32Array(componentsCount);

  const texture = await textureLoader.loadAsync('assets/textures/transparent/star_09.png');

  for (let i = 0; i < vertices.length; i++) {
    vertices[i] = (Math.random() - 0.5) * 10;
  }

  for (let i = 0; i < vertices.length; i += 3) {
    vertexColors[i] = 1.0;
    // vertexColors[i] = Math.max(0.75, Math.random());
  }

  const customGeometry = new BufferGeometry();
  const positionAttributes = new BufferAttribute(vertices, 3);
  const colorAttributes = new BufferAttribute(vertexColors, 3);
  customGeometry.setAttribute('position', positionAttributes);
  customGeometry.setAttribute('color', colorAttributes);

  const mat = new PointsMaterial({
    size: 0.3,
    sizeAttenuation: true,
    transparent: true,
    alphaMap: texture,
    alphaTest: 0.01,
    vertexColors: true
  });
  mat.blending = AdditiveBlending;
  mat.depthWrite = false;

  const points = new Points(customGeometry, mat);
  customGeometry.setDrawRange(0, debugParams.pointCount);
  return {
    points: points,
    geo: customGeometry
  };
}
