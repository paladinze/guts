import portalVertexShader from '../shaders/sphere/vertex.glsl';
import portalFragmentShader from '../shaders/sphere/fragment.glsl';
import { shaderMaterial } from '@react-three/drei';
import { ShaderMaterial } from 'three';
import * as THREE from 'three';
import { extend, ReactThreeFiber } from '@react-three/fiber';
import { SPHERE_SHADER_COLOR_END, SPHERE_SHADER_COLOR_START } from '../constants';

const ChaosMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color(SPHERE_SHADER_COLOR_START),
    uColorEnd: new THREE.Color(SPHERE_SHADER_COLOR_END)
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ ChaosMaterial: ChaosMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'chaosMaterial': ReactThreeFiber.Object3DNode<ShaderMaterial, typeof ChaosMaterial>;
    }
  }
}

export default ChaosMaterial;
