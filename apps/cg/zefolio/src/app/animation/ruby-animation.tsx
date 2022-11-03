import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import React, { useState } from 'react';

export default function RubyAnimation(props: any) {
  const [active, setActive] = useState(0);
  const { laptopOpened } = props;

  // create a common spring that will be used later to interpolate other values
  const { spring } = useSpring({
    spring: laptopOpened ? 1 : 0,
    config: {
      mass: 5, tension: 400, friction: 50, precision: 0.0001
    }
  });

  // interpolate values from common spring
  const scale = spring.to([0, 1], [1.0, 2.0]);
  const rotationY = spring.to([0, 1], [0.0, Math.PI * 5]);
  const rotationZ = spring.to([0, 1], [0.0, Math.PI * 6]);

  return (
    <a.group
      scale={scale}
      rotation-y={rotationY}
      rotation-z={rotationZ}
      onClick={() => {
        setActive(1);
      }}
    >
      {React.cloneElement(props.children, {
        visible: props.laptopOpened
      })}
    </a.group>
  );
}
