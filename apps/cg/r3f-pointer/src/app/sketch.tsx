import { OrbitControls } from '@react-three/drei';
import { useCallback, useRef } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { BoxGeometry, BufferGeometry, Mesh, MeshStandardMaterial } from 'three';

export default function Sketch() {
  const cube = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null!);

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const clickHandler = useCallback((event: ThreeEvent<MouseEvent>) => {
    console.log('click');
    const { object } = event;
    event.stopPropagation();
    (object as Mesh<BufferGeometry, MeshStandardMaterial>).material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  }, []);

  const pointerEnterHandler = useCallback((event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    document.body.style.cursor = 'pointer';
  }, []);

  const pointerLeaveHandler = useCallback((event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    document.body.style.cursor = 'default';
  }, []);


  return <>
    <color args={['ivory']} attach='background' />
    <OrbitControls makeDefault />

    <directionalLight position={[1, 2, 3]} intensity={1.5} />
    <ambientLight intensity={0.5} />

    <mesh position-x={-2}
          onClick={clickHandler}
          onPointerEnter={pointerEnterHandler}
          onPointerLeave={pointerLeaveHandler}
    >
      <sphereGeometry />
      <meshStandardMaterial color='orange' />
    </mesh>

    <mesh ref={cube} position-x={2} scale={1.5}
          onClick={clickHandler}
          onPointerEnter={pointerEnterHandler}
          onPointerLeave={pointerLeaveHandler}
    >
      <boxGeometry />
      <meshStandardMaterial color='mediumpurple' />
    </mesh>

    <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
      <planeGeometry />
      <meshStandardMaterial color='greenyellow' />
    </mesh>

  </>;
}
