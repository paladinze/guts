// @ts-nocheck
import { Environment, OrbitControls } from '@react-three/drei';
import { Debug, InstancedRigidBodies, Physics, RigidBody, RigidBodyApi } from '@react-three/rapier';
import { Suspense, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Quaternion, Vector3 } from 'three';
import HamModel from './ham-model';
import { button, useControls } from 'leva';
import InvisibleWall from './invisible-wall';
import { Perf } from 'r3f-perf';

const cubesCount = 3000;
const cubeColor = 'dodgerBlue';
const groundColor = 'salmon';
const hellBarColor = 'red';

export default function Experience() {
  const hellBar = useRef<RigidBodyApi>(null!);
  const cube = useRef<RigidBodyApi>(null!);
  const allCubes = useRef<RigidBodyApi[]>(null!);

  const physicsControls = useControls('physics', {
    antiGravity: false,
    collider: false,
    performance: false
  });
  const { invisibleWall } = useControls('mesh', {
    invisibleWall: false,
    'shockwave': button(() => {
      allCubes.current.forEach((body, i) => {
        const mass = body.mass();
        body.applyImpulse({ x: 0, y: 15 * mass, z: 0 });
      });
    }),
    'again!': button(() => {
      allCubes.current.forEach((body, i) => {
        body.setTranslation(new Vector3(...cubeTransforms.positions[i]), true);
        const quaternion = new Quaternion().set(...cubeTransforms.rotations[i], 1);
        body.setRotation(quaternion, true);
        body.resetForces();
        body.setLinvel(new Vector3(0, 0, 0));
        // The angular velocity of this body.
        // Default: zero velocity.
        body.setAngvel(new Vector3(0, 0, 0));
      });
    })
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    hellBar.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    const y = Math.sin(angle) * 2 + 2;
    hellBar.current.setNextKinematicTranslation({ x: x, y: y, z: z });
  });

  const cubeJump = () => {
    const mass = cube.current.mass();

    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    cube.current.applyTorqueImpulse({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 });
  };

  const collisionEnter = () => {
    console.log('collision!');
  };

  const cubes = useRef(null!);
  const cubeTransforms = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];

    for (let i = 0; i < cubesCount; i++) {
      positions.push([(Math.random() - 0.5) * 8, 6 + i * 0.2, (Math.random() - 0.5) * 8]);
      rotations.push([Math.random(), Math.random(), Math.random()]);

      const scale = 0.2 + Math.random() * 0.8;
      scales.push([scale, scale, scale]);
    }

    return { positions, rotations, scales };
  }, []);

  return <>

    {physicsControls.performance && <Perf position='top-left' />}
    <OrbitControls makeDefault />

    <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
    <ambientLight intensity={0.5} />
    <Suspense>
      <Environment preset={'sunset'} />
    </Suspense>

    <Physics gravity={physicsControls.antiGravity ? [0, 0.1, 0] : [0, -9.08, 0]}>

      {physicsControls.collider && <Debug />}

      {/*<RigidBody*/}
      {/*  ref={cube}*/}
      {/*  position={[1.5, 2, 0]}*/}
      {/*  gravityScale={1}*/}
      {/*  restitution={0}*/}
      {/*  friction={0.7}*/}
      {/*  colliders={false}*/}
      {/*  // onCollisionEnter={ collisionEnter }*/}
      {/*  // onCollisionExit={ () => { console.log('exit') } }*/}
      {/*  // onSleep={ () => { console.log('sleep') } }*/}
      {/*  // onWake={ () => { console.log('wake') } }*/}
      {/*>*/}
      {/*  <mesh castShadow onClick={cubeJump}>*/}
      {/*    <boxGeometry />*/}
      {/*    <meshStandardMaterial color='mediumpurple' />*/}
      {/*  </mesh>*/}
      {/*  <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />*/}
      {/*</RigidBody>*/}

      <RigidBody
        type='fixed'
        restitution={0}
        friction={0.7}
      >
        <mesh receiveShadow position-y={-1.25}>
          <boxGeometry args={[10, 0.5, 10]} />
          <meshStandardMaterial color={groundColor} />
        </mesh>
      </RigidBody>

      <RigidBody
        ref={hellBar}
        position={[0, -0.8, 0]}
        friction={0}
        type='kinematicPosition'
      >
        <mesh castShadow scale={[0.4, 0.4, 3]}>
          <boxGeometry />
          <meshStandardMaterial color={hellBarColor} />
        </mesh>
      </RigidBody>

      <Suspense>
        <RigidBody position={[0, 5, 0]} rotation={[0, Math.PI * 4 / 5, 0]} mass={1}>
          <HamModel scale={3} />
        </RigidBody>
      </Suspense>

      {invisibleWall && <InvisibleWall />}

      <InstancedRigidBodies
        ref={allCubes}
        positions={cubeTransforms.positions}
        rotations={cubeTransforms.rotations}
        scales={cubeTransforms.scales}
      >
        <instancedMesh ref={cubes} castShadow receiveShadow args={[undefined, undefined, cubesCount]}>
          <boxGeometry />
          <meshStandardMaterial color={cubeColor} />
        </instancedMesh>
      </InstancedRigidBodies>

    </Physics>

  </>;
}
