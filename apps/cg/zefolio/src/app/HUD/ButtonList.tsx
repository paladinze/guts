import ButtonModal from './ButtonModel';
import BookModel from '../components/book-model';
import PhoneModel from '../components/phone-model';

import { useThree } from '@react-three/fiber';
import React, { useCallback } from 'react';
import GithubModel from '../components/github-model';
import { ButtonAnimationType } from '../animation/button-animation';
import { openLink } from '../utils';



const modelListData = [
  {
    label: 'Blog',
    Component: BookModel,
    url: 'https://blog.shaderly.com'
  },
  {
    label: 'Huoshui App',
    Component: PhoneModel,
    url: 'http://huoshui.org/'
  },
  {
    label: 'GitHub',
    Component: GithubModel,
    animationType: ButtonAnimationType.ZOOM_ROTATE,
    url: 'https://github.com/paladinze'
  }
];
// {/*<HamModel scale={200} position-x={350} rotation-y={Math.PI / 1.5} />*/}
// <RacecarModel scale={100} position={[800, 220, 0]} rotation={[Math.PI / 8, Math.PI / 8, 0]} />

const GAP_WIDTH = 150;

export default function ButtonModelList(props: any) {
  const { gl, size } = useThree();
  const canvas = gl.domElement;

  const pointerEnterHandler = useCallback(() => {
    canvas.style.cursor = 'pointer';
  }, []);

  const pointerLeaveHandler = useCallback(() => {
    canvas.style.cursor = 'default';
  }, []);

  return <group
    scale={0.8}
    position={[-size.width / 2 + 180, -size.height / 2 + 135, 0]}
    rotation-y={Math.PI * 1 / 10}
  >
    {modelListData.map((item, index) => {
      const { label, Component, animationType, url } = item;
      return (<ButtonModal
        key={index}
        position-x={GAP_WIDTH * index}
        iconModel={Component}
        label={label}
        animationType={animationType}
        onClick={() => {
          openLink(url);
        }}
        onPointerEnter={pointerEnterHandler}
        onPointerLeave={pointerLeaveHandler}
      />);
    })}
  </group>;
}
