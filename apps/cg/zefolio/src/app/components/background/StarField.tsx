import { useControls } from 'leva';
import { Stars } from '@react-three/drei';


export default function StarField() {
  const { radius, count, depth, saturation, factor } = useControls('stars', {
    radius: 1,
    count: 1000,
    depth: 50,
    saturation: 0,
    factor: 4
  });

  return <Stars radius={radius} depth={depth} count={count} factor={factor} saturation={saturation} fade speed={1} />;

}
