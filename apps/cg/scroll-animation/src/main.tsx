import gsap from 'gsap';
import GUI from 'lil-gui';
import {
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Clock,
  DirectionalLight,
  Group,
  Mesh,
  MeshToonMaterial,
  NearestFilter,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TextureLoader,
  TorusKnotGeometry,
  Vector2,
  WebGLRenderer
} from 'three';
import './style.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


async function main() {

  /**
   * Debug controls
   */
  const gui = new GUI();
  const debugParams = {
    materialColor: '#ba2c2c',
    backgroundColor: '#ffeded'
  };

  gui.addColor(debugParams, 'materialColor')
    .onChange(() => {
      material.color.set(debugParams.materialColor);
    });
  gui.addColor(debugParams, 'backgroundColor')
    .onChange(() => {
      particles.material.color.set(debugParams.backgroundColor);
      particles.material.needsUpdate = true;
    });

  /**
   * Base
   */
  // Canvas
  const canvas = document.querySelector('canvas.webgl');

  // Scene
  const scene = new Scene();

  // Material
  const textureLoader = new TextureLoader();
  const gradientTexture = textureLoader.load('assets/textures/gradients/5.jpg');
  gradientTexture.magFilter = NearestFilter;

  const material = new MeshToonMaterial({
    color: debugParams.materialColor,
    gradientMap: gradientTexture
  });

  /**
   * Lights
   */
  const directionalLight = new DirectionalLight('#ffffff', 1);
  directionalLight.position.set(1, 1, 0);
  scene.add(directionalLight);

  const ambientLight = new AmbientLight('#ffffff', 0.5);
  scene.add(ambientLight);

  /**
   * Mesh objects
   */
  const DISTANCE_BETWEEN_OBJECTS = 4;

  // Model
  // const mesh1 = new Mesh(
  //   new TorusGeometry(1, 0.4, 16, 60),
  //   material
  // );
  const gltfLoader = new GLTFLoader();
  const gltf = await gltfLoader.loadAsync('assets/models/Duck/glTF/Duck.gltf');
  const duckMesh = gltf.scene.children[0];
  duckMesh.position.y = -0.8;
  duckMesh.rotation.y = Math.PI;
  duckMesh.scale.setScalar(0.012);
  const mesh1 = new Group();
  mesh1.add(duckMesh);

  const mesh2 = new Mesh(
    new BoxGeometry(1.25, 1.25, 1.25),
    material
  );
  const mesh3 = new Mesh(
    new TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
  );

  mesh1.position.x = 1.9;
  mesh1.position.y = -DISTANCE_BETWEEN_OBJECTS * 0;
// mesh1.scale.set(0.5, 0.5, 0.5)

  mesh2.visible = true;
  mesh2.position.x = -1.9;
  mesh2.position.y = -DISTANCE_BETWEEN_OBJECTS * 1;
// mesh2.scale.set(0.5, 0.5, 0.5)

  mesh3.position.x = 1.9;
  mesh3.position.y = -DISTANCE_BETWEEN_OBJECTS * 2;
  mesh3.scale.setScalar(0.8);

  const meshList = [mesh1, mesh2, mesh3];
  scene.add(...meshList);


  /**
   * Create particles
   */
  const particles = createBackgroundParticles();
  scene.add(particles);

  /**
   * Mouse move handler (with coordinates normalized)
   */
  const cursor = new Vector2();
  cursor.x = 0;
  cursor.y = 0;
  window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = (event.clientY / sizes.height - 0.5) * -1;
  });

  /**
   * Window resize handler
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  const cameraGroup = new Group();
  scene.add(cameraGroup);

  const camera = new PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
  camera.position.z = 6;
  cameraGroup.add(camera);

  /**
   * Renderer
   */
  const renderer = new WebGLRenderer({
    canvas: canvas as HTMLCanvasElement,
    alpha: true // 0 by default when enabled
  });
  renderer.setClearAlpha(0);
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Scroll handler
   */
  let scrollY = window.scrollY;
  let currentSection = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;

    // animate the corresponding mesh when entering a new section
    const newSection = Math.round(scrollY / sizes.height);
    if (newSection !== currentSection) {
      currentSection = newSection;

      gsap.to(meshList[currentSection].rotation, {
        duration: 3,
        ease: 'power3.out',
        y: '+=3'
      });
    }

  });

  /**
   * Animation loop
   */
  const clock = new Clock();
  let previousTime = 0;
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    // move camera based on vertical scroll offset
    camera.position.y = -scrollY / sizes.height * DISTANCE_BETWEEN_OBJECTS;

    // parallax effect based on cursor position
    // move in opposite direction of the cursor
    const parallaxX = -cursor.x * 0.5;
    const parallaxY = -cursor.y * 0.5;
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

    // constant rotation for all meshes
    for (const mesh of meshList) {
      mesh.rotation.x += deltaTime * 0.1;
      mesh.rotation.y += deltaTime * 0.12;
    }

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();

  /**
   * Particles
   */
  function createBackgroundParticles() {
    // custom geometry
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = DISTANCE_BETWEEN_OBJECTS * (0.5 - Math.random() * meshList.length);
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const particlesGeometry = new BufferGeometry();
    particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3));

    // material
    const particlesMaterial = new PointsMaterial({
      color: debugParams.backgroundColor,
      sizeAttenuation: true,
      size: 0.03
    });

    return new Points(particlesGeometry, particlesMaterial);
  }
}

main();
