import { useGLTF } from '@react-three/drei';
import React from 'react';

export default function GithubModel(props: any) {
  const { scene } = useGLTF('assets/models/github.glb');
  return <group {...props}>
    <primitive object={scene}
               scale={15}
               position={[0, 0, 0]}
               rotation={[0, -0.35, 0]}
    />
  </group>;
}
