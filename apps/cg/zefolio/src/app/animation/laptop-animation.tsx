import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import React, { useState } from 'react';

export default function LaptopAnimation(props: any) {
  const {setUserControl} = props;
  const [active, setActive] = useState(0);

  // create a common spring that will be used later to interpolate other values
  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  });

  // interpolate values from common spring
  const scale = spring.to([0, 1], [1, 1.40]);
  const positionY = spring.to([0, 1], [0, -0.5]);
  const rotationX = spring.to([0, 1], [0, 0.03]);
  const rotationY = spring.to([0, 1], [0, 0.485]);
  const rotationZ = spring.to([0, 1], [0, -0.07]);

  return (
    <a.group
      scale={scale}
      position-y={positionY}
      rotation-x={rotationX}
      rotation-y={rotationY}
      rotation-z={rotationZ}
      onClick={(event) => {
        setActive(1);
        setUserControl(false);
      }}
      onPointerMissed={(event) => {
        setActive(0);
        setUserControl(true);
      }}
    >
      {React.cloneElement(props.children, {
        laptopOpened: !!active,
      })}
    </a.group>
  );
}
