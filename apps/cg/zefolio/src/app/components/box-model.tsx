import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { useState } from 'react';
import HamModel from "./ham-model";
import LaptopModel from './laptop-model';

export default function Box(props: any) {
  const [active, setActive] = useState(0);

  // create a common spring that will be used later to interpolate other values
  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  // interpolate values from common spring
  const scale = spring.to([0, 1], [1, 1.5]);
  const rotation = spring.to([0, 1], [0, Math.PI]);
  const color = spring.to([0, 1], ["#6246ea", "#e45858"]);

  return (
    <a.group
      // rotation-y={rotation}
      scale={scale}
      // scale-x={scale}
      // scale-z={scale}
      onClick={() => setActive(Number(!active))}
    >
      <HamModel />
    </a.group>
  );
}
