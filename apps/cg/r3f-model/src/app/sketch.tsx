import { OrbitControls, Stage } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';
import { Perf } from 'r3f-perf';

export default function Sketch() {
  const cubeRef = useRef<Mesh>(null!);

  return <>
    <Perf position={'top-left'}/>
    <OrbitControls makeDefault />
    <Stage
      contactShadow={{ opacity: 0.2, blur: 3 }}
      environment="sunset"
      preset={"portrait"}
      intensity={ 1 }
    >
      <mesh position-y={1} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color='orange' />
      </mesh>

      <mesh ref={cubeRef} position-y={1} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color='mediumpurple' />
      </mesh>

    </Stage>
  </>;
}
