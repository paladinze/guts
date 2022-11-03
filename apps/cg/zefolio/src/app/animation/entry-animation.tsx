import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import { useEffect, useState } from 'react';

export default function EntryAnimation(props: any) {
  const [active, setActive] = useState(0);
  const { type } = props;

  useEffect(() => {
    setTimeout(() => {
      setActive(1);
    }, 0);
  }, []);

  // create a common spring that will be used later to interpolate other values
  const { spring } = useSpring({
    spring: active,
    config: {
      mass: 5, tension: 400, friction: 50, precision: 0.0001
    }
  });

  // interpolate values from common spring
  const scale = spring.to([0, 1], [0.01, 1.0]);
  const rotationY = spring.to([0, 1], [-0.5, 0.0]);

  return (
    <a.group
      scale={scale}
      rotation-y={rotationY}
    >
      {props.children}
    </a.group>
  );
}
