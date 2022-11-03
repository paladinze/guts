import { Environment, Float, PresentationControls, Sparkles, Text } from '@react-three/drei';
import LaptopModel from './components/laptop-model';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh, ShaderMaterial } from 'three';
import { useRef } from 'react';
import './materials/chaos-material';
import StarModel from './components/star-model';
import BoxModel from './components/box-model';

export default function HomeSketch() {

  const portalMatRef = useRef<ShaderMaterial>(null!);

  const sphereRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    // @ts-ignore
    portalMatRef.current.uTime += delta * 3;
  });

  return <>
    <ambientLight intensity={1.0} />

    <Environment preset={'city'} />

    <PresentationControls
      enabled={true}
      global={false}
      rotation={[0.13, 0.1, 0]}
      polar={[-0.4, 0.2]}
      azimuth={[-1, 0.75]}
      config={{ mass: 2, tension: 300 }}
      snap={{ mass: 4, tension: 300 }}
    >
      <Float rotationIntensity={0.2}>
        <rectAreaLight
          width={2.5}
          height={1.65}
          intensity={65}
          color={'#e38f56'}
          rotation={[-0.1, Math.PI, 0]}
          position={[0, 0.55, -1.15]}
        />
        <LaptopModel position-y={-1.2} scale={1.2} />
        <Text
          font='assets/fonts/Bangers-Regular.ttf'
          fontSize={1.5}
          position={[-3.5, 0.75, 0.75]}
          rotation-y={1.3}
          outlineWidth={0.05}
          outlineColor={'salmon'}
          outlineOpacity={0.7}
          maxWidth={2}
          textAlign={'center'}
        >
          Ze Cheng
        </Text>
        <Sparkles
          count={15}
          size={3}
          scale={[4, 3, 3]}
          position={[-3.5, 0.75, 0.75]}
          speed={0.1}
          color={new THREE.Color('gold')}
          opacity={0.75}
        />
      </Float>
    </PresentationControls>

    <mesh position={[0, 0, -10]} scale={5} ref={sphereRef}>
      <sphereGeometry args={[1, 128, 128]} />
      <portalMaterial ref={portalMatRef} />
    </mesh>

    <StarModel />
  </>;
}
