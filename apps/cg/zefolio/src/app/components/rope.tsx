// @ts-nocheck
import { QuadraticBezierLine } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ROPE_COLOR } from '../constants';
import { useControls } from 'leva';

export default function Rope({ startPos, endPos, midPos, color = ROPE_COLOR}) {
  const ref = useRef(null!);
  useFrame(() => ref.current.setPoints(startPos, endPos, midPos), []);

  const { segments, lineWidth } = useControls('rope', {
    segments: 100,
    lineWidth: {
      value: 25,
      step: 5,
    }
  });

  return <QuadraticBezierLine ref={ref} lineWidth={lineWidth} segments={segments} color={color} />;
}
