import { ContactShadows, Environment, Float, PresentationControls, Sparkles, Text, useGLTF } from '@react-three/drei';
import LaptopModel from './components/laptop-model';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh } from 'three';
import { useRef } from 'react';


export default function HomeSketch() {

  const starRef = useRef<Mesh>(null!);
  const starModel = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/star/model.gltf');


  useFrame((state, delta) => {
    if (starRef.current) {
      // starRef.current.rotation.y += delta * 2.0;
    }
  });

  return <>
    {/*<OrbitControls makeDefault={true} />*/}
    <ambientLight intensity={1.0} />

    <Environment preset={'city'} />
    <color args={['#695656']} attach={'background'} />

    <PresentationControls
      global
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
          size={10}
          scale={[4, 3, 3]}
          position={[-3.5, 0.75, 0.75]}
          speed={0.1}
          color={new THREE.Color('gold')}
          opacity={0.75}
        />
      </Float>
    </PresentationControls>

    <ContactShadows
      position-y={-1.4}
      opacity={0.4}
      scale={5}
      blur={2.4}
    />


    <Float rotationIntensity={0.2}>
      <primitive
        onClick={() => {
          if (window) {
            // @ts-ignore
            window.open('https://github.com/paladinze', '_blank').focus();
          }
        }}
        object={starModel.scene} ref={starRef}
        position={[3, -1, 0]} scale={0.5}
        rotation-y={0.2}
      >
      </primitive>
    </Float>

  </>;
}
