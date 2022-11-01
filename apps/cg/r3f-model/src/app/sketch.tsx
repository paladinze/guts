import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { DoubleSide, Group, Mesh } from 'three';
import { Perf } from 'r3f-perf';
import ExternalModel from './external-model';
import AnimatedModel from './animated-model';

export function Placeholder(props: any) {
  return <mesh {...props}>
    <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
    <meshBasicMaterial wireframe color='red' />
  </mesh>;
}

useGLTF.preload('assets/models/burger.glb');

export default function Sketch() {
  const cubeRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);

  useEffect(() => {
    groupRef.current.rotation.y = -Math.PI / 2;
  }, []);

  return <>
    <Perf position={'top-left'} />
    <OrbitControls makeDefault />
    <Stage
      contactShadow={false}
      environment='sunset'
      preset={'portrait'}
      intensity={1}
      adjustCamera={true}
    >
      <group ref={groupRef}>
        <Suspense
          fallback={<Placeholder position-y={0.5} scale={[1, 1, 1]} />}
        >
          <ExternalModel path='assets/models/burger.glb' position-y={0.5} position-z={0.9} scale={0.1} />
        </Suspense>
        <Suspense>
          <AnimatedModel scale={0.02} position-z={-1} position-x={-1} rotation-y={Math.PI * 0.5 / 3} />
        </Suspense>
        <mesh ref={cubeRef} position-y={0} rotation-x={Math.PI / 2} scale={5}>
          <planeGeometry />
          <meshStandardMaterial color='mediumpurple' side={DoubleSide} />
        </mesh>
      </group>
    </Stage>
  </>;
}
