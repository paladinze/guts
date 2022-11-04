import { Text } from '@react-three/drei';
import ButtonAnimation, { ButtonAnimationType } from '../animation/button-animation';
import React from 'react';

function ButtonLabel(props: { label: string }) {
  return <Text font='assets/fonts/Bangers-Regular.ttf'
               fontSize={30.0}
               position-y={-75}
               textAlign={'center'}
  >
    {props.label}
  </Text>;
}


export default function ButtonModel({ iconModel: IconModel, label, ...props }: any) {
  const animationType = props.animationType ?? ButtonAnimationType.ZOOM;

  return <group {...props}>
    <ButtonAnimation type={animationType}>
      <IconModel />
      <ButtonLabel label={label} />
    </ButtonAnimation>
  </group>;
}
