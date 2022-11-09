import { useGLTF } from '@react-three/drei';
import React from 'react';

export default function BookModel(props: any) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf');
  return <group {...props}>
    <primitive object={scene}
               scale={[28, 25, 30]}
               position={[0, -30, 0]}
               rotation={[0.2, -0.5, 0]}
    />
  </group>;
}
