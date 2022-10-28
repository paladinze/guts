import * as THREE from 'three';
import { BoxGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, ShaderMaterial, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fragmentShader from './shaders/fragment-shader.glsl';
import vertexShader from './shaders/vertex-shader.glsl';

interface sketchOptions {
  dom: HTMLElement;
}

export default class Sketch {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private time: number;
  private renderer: WebGLRenderer;
  private mesh: Mesh<BoxGeometry, ShaderMaterial>;
  private width: number;
  private height: number;
  private container: HTMLElement;
  private controls: OrbitControls;

  constructor(options: sketchOptions) {
    this.setupScene(options);
    this.setupControls();
    this.addObjects();
    this.render();
    this.setupResize();
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  /**
   * set viewport resolution and canvas size
   */
  resize() {
    // const dpr = window.devicePixelRatio;
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    // const resolutionX = width * dpr;
    // const resolutionY = height * dpr;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    // this.container.style.width = `${width}px`;
    // this.container.style.height = `${height}px`;
    this.renderer.setSize(width, height);
  }

  setupScene(options: sketchOptions) {
    const { dom } = options;
    this.container = dom;
    this.time = 0;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.scene = new Scene();
    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 10);
    this.camera.position.z = 1;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);

    this.container.appendChild(this.renderer.domElement);
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.container);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = -Math.PI * 0.5;
    this.controls.enableDamping = true;
  }

  addObjects() {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    // const material = new THREE.MeshNormalMaterial();
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    })
    this.mesh = new THREE.Mesh(geometry, shaderMaterial);
    this.scene.add(this.mesh);

  }

  render() {
    this.renderer.render(this.scene, this.camera);

    this.controls.update();
    window.requestAnimationFrame(this.render.bind(this));
  }
}
