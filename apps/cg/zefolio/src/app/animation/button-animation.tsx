import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { useState } from 'react';

export enum AnimationType {
  ZOOM,
  ZOOM_ROTATE
}

export default function ButtonAnimation(props: any) {
  const [active, setActive] = useState(0);
  const { type } = props;

  // create a common spring that will be used later to interpolate other values
  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  // interpolate values from common spring
  const scale = spring.to([0, 1], [1, 1.5]);
  const rotation = spring.to([0, 1], [0, Math.PI * 2]);

  return (
    <a.group
      scale={scale}
      rotation-y={type == AnimationType.ZOOM_ROTATE ? rotation: 0}
      onPointerEnter={() => setActive(1)}
      onPointerLeave={() => setActive(0)}
    >
      {props.children}
    </a.group>
  );
}
