import { Center, OrbitControls, shaderMaterial, Sparkles, useGLTF, useTexture } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { DoubleSide, Mesh, ShaderMaterial } from 'three';
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';

// @ts-ignore
import portalVertexShader from './shaders/portal/vertex.glsl';
// @ts-ignore
import portalFragmentShader from './shaders/portal/fragment.glsl';

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#afc0c7'),
    uColorEnd: new THREE.Color('#1f9be8')
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

export default function Sketch() {
  const { nodes } = useGLTF('assets/models/portal/portal.glb');

  const bakedTexture = useTexture('assets/models/portal/baked.jpg');
  bakedTexture.flipY = false;

  const portalMatRef = useRef<ShaderMaterial>(null!);

  useFrame((state, delta) => {
    // @ts-ignore
    portalMatRef.current.uTime += delta * 3;
  });
  return <>
    <OrbitControls makeDefault />
    <color args={['#201919']} attach='background' />
    <Center>
      <mesh geometry={(nodes['baked'] as Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} side={DoubleSide} />
      </mesh>
      <mesh
        geometry={(nodes['poleLightA'] as Mesh).geometry}
        position={(nodes['poleLightA'] as Mesh).position}
      >
        <meshBasicMaterial color='#ffffe5' />
      </mesh>
      <mesh
        geometry={(nodes['poleLightB'] as Mesh).geometry}
        position={(nodes['poleLightB'] as Mesh).position}
      >
        <meshBasicMaterial color='#ffffe5' />
      </mesh>

      <mesh geometry={(nodes['portalLight'] as Mesh).geometry}
            position={(nodes['portalLight'] as Mesh).position}
            rotation={(nodes['portalLight'] as Mesh).rotation}
      >
        <portalMaterial ref={portalMatRef} />
        {/*<meshBasicMaterial color="#ffffff" />*/}
      </mesh>
      <Sparkles
        size={6}
        scale={[4, 2, 4]}
        position-y={1}
        speed={0.2}
        count={15}
        color={new THREE.Color('#1f9be8')}
        opacity={0.75}
        noise={10}
      />
    </Center>
  </>;
}
