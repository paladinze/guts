import { createPortal, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Matrix4, Scene } from 'three';
import { ContactShadows, Environment, OrthographicCamera } from '@react-three/drei';
import BookModel from './book-model';
import PhoneModel from './phone-model';
import GithubModel from './github-model';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

export default function HUD() {
  const { gl, scene, camera, size } = useThree();
  const virtualScene = useMemo(() => new Scene(), []);
  const virtualCam = useRef();
  const ref = useRef();
  const matrix = new Matrix4();

  useFrame(() => {
    matrix.copy(camera.matrix).invert();
    // @ts-ignore
    gl.autoClear = true;
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();
    // @ts-ignore
    gl.render(virtualScene, virtualCam.current);
  }, 1);

  return createPortal(
    <>
      <OrthographicCamera ref={virtualCam} makeDefault={false} position={[0, 0, 100]} />
      <group
        rotation-y={Math.PI * 1 / 10}
        position={[-size.width / 2 + 180, -size.height / 2 + 80, 0]}
      >
        <BookModel scale={200} position-y={40} rotation-y={-Math.PI * 2 / 7} />
        <PhoneModel scale={[28, 25, 30]} position={[175, 10, 0]} rotation={[0.2, -0.5, 0]} />
        <GithubModel scale={15} position={[350, 40, 0]} rotation-y={Math.PI/0.55} />
        {/*<HamModel scale={200} position-x={350} rotation-y={Math.PI / 1.5} />*/}
        {/*<RacecarModel scale={50} position={[400, 20, 0]} rotation={[Math.PI / 8, Math.PI / 8, 0]} />*/}
      </group>
      <Environment preset={'sunset'} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[-10, 10, 5]} />
    </>,
    virtualScene
  );
}
