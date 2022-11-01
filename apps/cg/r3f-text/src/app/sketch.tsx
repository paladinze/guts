import { Center, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Mesh, TorusGeometry } from 'three';
import { Perf } from 'r3f-perf';
import { useFrame } from '@react-three/fiber';


export default function Sketch() {
  const meshGroupRef = useRef<Mesh[]>([]);


  const [titleTexture] = useMatcapTexture('FBB43F_FBE993_FB552E_FCDD65', 256);
  const [bgTexture] = useMatcapTexture('0489C5_0DDDF9_04C3EE_04AFE1', 256);
  const [torusGeometry, setTorusGeometry] = useState<TorusGeometry>();

  useFrame((state, delta) => {
    for (const item of meshGroupRef.current) {
      item.rotation.y += delta * 0.2;
    }
  });

  return <>
    <Perf position={'top-left'} />
    <OrbitControls makeDefault />
    <Center>
      <Text3D
        font={'assets/fonts/helvetiker_regular.typeface.json'}
        size={0.75}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        Hello R3F
        <meshMatcapMaterial matcap={titleTexture} />
        {/*<meshNormalMaterial />*/}
      </Text3D>
    </Center>
    {/*
    // @ts-ignore */}
    <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
    {[...Array(500)].map((val, index) =>
      <mesh
        key={index}
        ref={(instance) => {
          meshGroupRef.current[index] = instance!;
        }}
        geometry={torusGeometry}
        position={[
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30
        ]}
        scale={0.2 + Math.random() * 0.2}
        rotation={[
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          0
        ]}
      >
        <meshMatcapMaterial matcap={bgTexture} />
      </mesh>
    )}
  </>;
}
