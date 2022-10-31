import * as THREE from 'three';
import {
  BoxGeometry,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial, SphereGeometry, TextureLoader,
  WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fragmentShader from './shaders/fragment-shader.glsl';
import vertexShader from './shaders/vertex-shader.glsl';
import { Geometry } from 'three/examples/jsm/deprecated/Geometry';

interface sketchOptions {
  dom: HTMLElement;
}

export default class Sketch {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private time: number;
  private renderer: WebGLRenderer;
  private mesh: Mesh<SphereGeometry, ShaderMaterial>;
  private width: number;
  private height: number;
  private container: HTMLElement;
  private controls: OrbitControls;
  private material: ShaderMaterial;

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
    // this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = -Math.PI * 0.5;
    this.controls.enableDamping = true;
  }

  addObjects() {
    // const geometry = new THREE.PlaneGeometry(1, 1, 50, 50);
    const geometry = new THREE.SphereGeometry(0.4, 50, 50);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        time: { value: this.time },
        oceanTexture: {
          value: new TextureLoader().load('assets/imgs/ocean.jpg')
        }
      },
      wireframe: true,
      side: THREE.DoubleSide
    })
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

  }

  render() {
    this.time += 0.05;
    this.material.uniforms['time'].value = this.time;
    this.renderer.render(this.scene, this.camera);

    this.controls.update();
    window.requestAnimationFrame(this.render.bind(this));
  }
}
