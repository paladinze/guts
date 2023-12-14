import {
  Environment,
  Float,
  OrbitControls,
  PresentationControls,
  Text,
} from '@react-three/drei';
import LaptopModel from './components/models/laptop-model';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, ShaderMaterial, Vector3 } from 'three';
import { useRef, useState } from 'react';
import './materials/chaos-material';
import StarModel from './components/models/star-model';
import { useControls } from 'leva';
import EntryAnimation from './animation/entry-animation';
import { ROPE_COLOR, TITLE_TEXT, TITLE_TEXT_COLOR } from './constants';
import LaptopAnimation from './animation/laptop-animation';
import StarField from './components/background/StarField';
import HomeTitle from './components/text/home-title';
import Rope from './components/rope';

export default function HomeSketch() {
  const [floatSpeed, setFloatSpeed] = useState(1);
  const [presentControl, setPresentControl] = useState(false);

  const sphereMatRef = useRef<ShaderMaterial>(null!);

  const sphereRef = useRef<Mesh>(null!);

  const titleRef = useRef<Text>(null!);

  let endPos = new Vector3();

  const laptopControls = useControls('laptop', {
    rotation: {
      value: {
        x: 0,
        y: 0,
        z: -0.05,
      },
    },
  });

  const { orbit } = useControls('camera', {
    orbit: false,
  });
  const { anchor, mid, endOffset } = useControls('rope', {
    anchor: {
      value: {
        x: -30,
        y: 11,
        z: -10,
      },
      step: 1,
    },
    mid: {
      value: {
        x: -30,
        y: -2,
        z: -10,
      },
      step: 1,
    },
    endOffset: {
      value: {
        x: -0.2,
        y: 0.4,
        z: 0,
      },
      step: 0.2,
    },
  });
  const anchorPos = new Vector3(...Object.values(anchor));
  const midPos = new Vector3(...Object.values(mid));

  useFrame((state, delta) => {
    // @ts-ignore
    const titleWorldPos = titleRef.current.localToWorld(new Vector3(0, 0, 0));
    endPos.copy(titleWorldPos.add(new Vector3(...Object.values(endOffset))));

    // @ts-ignore
    sphereMatRef.current.uTime += delta * 3;
  });

  const setUserControl = (enable: boolean) => {
    setFloatSpeed(enable ? 1 : 0);
    setPresentControl(enable);
  };

  return (
    <>
      <ambientLight intensity={1.0} />
      <Environment preset={'city'} />
      <StarField />
      {orbit && <OrbitControls makeDefault={true} />}

      <Rope
        startPos={anchorPos}
        endPos={endPos}
        midPos={midPos}
        color={ROPE_COLOR}
      />
      <EntryAnimation>
        <PresentationControls
          enabled={presentControl}
          global={false}
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 0.75]}
          config={{ mass: 2, tension: 300 }}
          snap={{ mass: 4, tension: 300 }}
        >
          {/* @ts-expect-error */}
          <Float rotationIntensity={0.5} speed={floatSpeed}>
            <rectAreaLight
              width={2.5}
              height={1.65}
              intensity={65}
              color={'#e38f56'}
              rotation={[-0.1, Math.PI, 0]}
              position={[0, 0.55, -1.15]}
            />
            <group
              position-y={-1.2}
              scale={1.2}
              rotation-x={laptopControls.rotation.x}
              rotation-z={laptopControls.rotation.z}
              rotation-y={laptopControls.rotation.y}
            >
              <LaptopAnimation setUserControl={setUserControl}>
                <LaptopModel />
              </LaptopAnimation>
            </group>
            {/*
          @ts-ignore */}
            <HomeTitle
              ref={titleRef}
              outlineColor={TITLE_TEXT_COLOR}
              text={TITLE_TEXT}
            />
            {/*<Sparkles*/}
            {/*  count={15}*/}
            {/*  size={3}*/}
            {/*  scale={[4, 3, 3]}*/}
            {/*  position={[-3.5, 0.75, 0.75]}*/}
            {/*  speed={0.1}*/}
            {/*  color={new THREE.Color('gold')}*/}
            {/*  opacity={0.75}*/}
            {/*/>*/}
          </Float>
        </PresentationControls>
      </EntryAnimation>
      <mesh position={[0, 0, -10]} scale={5} ref={sphereRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <chaosMaterial ref={sphereMatRef} />
      </mesh>

      <StarModel />
    </>
  );
}
