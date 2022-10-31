import { DoubleSide, Group, Mesh } from 'three';
import { extend, ReactThreeFiber, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import CustomMesh from './custom-mesh';

extend({ OrbitControls: OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'orbitControls': ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

export default function Sketch() {
  const cubeRef = useRef<Mesh>(null!);
  const planeRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);

  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    // rotating camera around the center
    // const elapseTime = state.clock.getElapsedTime();
    // state.camera.position.x = Math.sin(elapseTime * 0.1) * 8;
    // state.camera.position.z = Math.cos(elapseTime * 0.1) * 8;
    // state.camera.lookAt(0, 0, 0);

    cubeRef.current.rotation.y += delta;
    planeRef.current.rotation.y += delta;
    groupRef.current.rotation.y += delta * 0.05;
  });


  return <>
    <ambientLight intensity={0.1} />
    <directionalLight color='blue' position={[3, 0, 5]} />
    <orbitControls args={ [ camera, gl.domElement ] } />
    <group ref={groupRef}>
      <CustomMesh />
      <mesh ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      <mesh position-x={-3}>
        <sphereGeometry />
        <meshBasicMaterial color='orange' />
      </mesh>
      <mesh position-x={3} rotation-y={Math.PI / 5} ref={planeRef}>
        <planeGeometry />
        <meshBasicMaterial color={'red'} side={DoubleSide} />
      </mesh>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color='greenyellow' />
      </mesh>
    </group>
  </>;
}
