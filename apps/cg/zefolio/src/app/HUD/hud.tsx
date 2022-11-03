import { createPortal, useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { Matrix4, Scene } from 'three';
import { Environment, OrthographicCamera } from '@react-three/drei';
import ButtonModelList from './ButtonList';

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
      <OrthographicCamera ref={virtualCam} makeDefault={true} position={[0, 0, 100]} />

      <ButtonModelList />

      <Environment preset={'sunset'} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[-10, 10, 5]} />
    </>,
    virtualScene
  );
}
