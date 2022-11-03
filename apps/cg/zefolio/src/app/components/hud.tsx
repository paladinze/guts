import { createPortal, useFrame, useThree } from '@react-three/fiber';
import { useCallback, useMemo, useRef } from 'react';
import { Matrix4, Scene } from 'three';
import { Environment, OrthographicCamera } from '@react-three/drei';
import BookModel from './book-model';
import PhoneModel from './phone-model';
import GithubModel from './github-model';

function openLink(url: string) {
  // @ts-ignore
  window.open(url, '_blank').focus();
}

const modelListData = [
  {
    Component: BookModel,
    scale: 200,
    position: [0, 40, 0],
    rotation: [0, -Math.PI * 2 / 7, 0],
    url: 'https://blog.shaderly.com',
  },
  {
    Component: PhoneModel,
    scale: [28, 25, 30],
    position: [175, 10, 0],
    rotation: [0.2, -0.5, 0],
    url: 'http://huoshui.org/',
  },
  {
    Component: GithubModel,
    scale: 15,
    position: [350, 40, 0],
    rotation: [0, Math.PI / 0.53, 0],
    url: 'https://github.com/paladinze',
  }
];
// {/*<HamModel scale={200} position-x={350} rotation-y={Math.PI / 1.5} />*/}
// <RacecarModel scale={100} position={[800, 220, 0]} rotation={[Math.PI / 8, Math.PI / 8, 0]} />


function ModelList(props: any) {
  return modelListData.map((item, index) => {
    const { Component, scale, position, rotation, url } = item;

    const clickHandler = useCallback(() => {
      openLink(url);
    }, []);

    return <Component
      key={index} scale={scale} position={position} rotation={rotation}
      onClick={clickHandler}
    />;
  });
}

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
      <group
        scale={1.0}
        rotation-y={Math.PI * 1 / 10}
        position={[-size.width / 2 + 180, -size.height / 2 + 80, 0]}
      >
        {/**
         @ts-ignore **/}
        <ModelList />
      </group>
      <Environment preset={'sunset'} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[-10, 10, 5]} />
    </>,
    virtualScene
  );
}
