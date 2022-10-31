import { DoubleSide, Group, Mesh } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import CustomMesh from './custom-mesh';
import { button, useControls } from 'leva';
import { Float, Html, MeshReflectorMaterial, OrbitControls, PivotControls, Text } from '@react-three/drei';

export default function Sketch() {
  const cubeRef = useRef<Mesh>(null!);
  const sphereRef = useRef<Mesh>(null!);
  const planeRef = useRef<Mesh>(null!);
  const groundRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);
  const debugControls = useControls('scene', {
    titlePos: {
      value: 3,
      min: -2,
      max: 5,
      step: 0.1
    },
    cubePos: {
      value: {
        x: 0,
        y: 0,
      },
      step: 0.01,
      joystick: 'invertY'
    },
    sphereColor: 'orange',
    customAction: button(() => console.log('custom action!')),
    choices: {
      options: [1, 2, 3]
    }
  });
  const cubeDebugControls = useControls('cube', {
    cubePos: {
      value: {
        x: 0,
        y: 0,
      },
      step: 0.01,
      joystick: 'invertY'
    },
  });

  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    // rotating camera around the center
    // const elapseTime = state.clock.getElapsedTime();
    // state.camera.position.x = Math.sin(elapseTime * 0.1) * 8;
    // state.camera.position.z = Math.cos(elapseTime * 0.1) * 8;
    // state.camera.lookAt(0, 0, 0);

    cubeRef.current.rotation.y += delta;
    planeRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta * 0.05;
  });


  return <>
    <ambientLight intensity={0.1} />
    <directionalLight color='blue' position={[3, 0, 5]} />
    <OrbitControls enableDamping={true} makeDefault />
    <Text
      font='assets/fonts/Bangers-Regular.ttf'
      color='salmon' fontSize={2} position={[0, debugControls.titlePos, 3]}
      maxWidth={2}
      outlineWidth={0.05}
      outlineColor={'black'}
      outlineOpacity={0.7}
      textAlign='center'
    >
      R3F Starter
    </Text>
    <group ref={groupRef}>
      <Float speed={5} floatIntensity={1.5}>
        <CustomMesh position-y={4} />
      </Float>
      <mesh ref={cubeRef} position={[cubeDebugControls.cubePos.x, cubeDebugControls.cubePos.y, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      {/*<TransformControls object={cubeRef} mode={'rotate'} />*/}
      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh position-x={-3} ref={sphereRef}>
          <Html wrapperClass='sphere-label'
                position={[0, 0, 0]}
                center
                distanceFactor={8} // simulate perspective
                occlude={[cubeRef, groundRef]} // hidden when behind the cube
          >
            A Sphere
          </Html>
          <sphereGeometry />
          <meshBasicMaterial color={debugControls.sphereColor} />
        </mesh>
      </PivotControls>
      <mesh position-x={3} rotation-y={Math.PI / 5} ref={planeRef}>
        <planeGeometry />
        <meshBasicMaterial color={'red'} side={DoubleSide} />
      </mesh>
      <mesh ref={groundRef} position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          mirror={0.5}
          resolution={512}
          blur={[1000, 1000]}
          color='lightgrey'
          mixBlur={1} />
        {/*<meshBasicMaterial color='greenyellow' side={DoubleSide} />*/}
      </mesh>
    </group>
  </>;
}
