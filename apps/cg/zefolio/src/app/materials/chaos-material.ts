import portalVertexShader from '../shaders/portal/vertex.glsl';
import portalFragmentShader from '../shaders/portal/fragment.glsl';
import { shaderMaterial } from '@react-three/drei';
import { ShaderMaterial } from 'three';
import * as THREE from 'three';
import { extend, ReactThreeFiber } from '@react-three/fiber';

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#B25068'),
    uColorEnd: new THREE.Color('#4C3A51')
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'portalMaterial': ReactThreeFiber.Object3DNode<ShaderMaterial, typeof PortalMaterial>;
    }
  }
}

export default PortalMaterial;
