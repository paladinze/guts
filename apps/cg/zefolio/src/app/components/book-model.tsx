import { useGLTF } from '@react-three/drei';
import React from 'react';

export default function BookModel(props: any) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/book/model.gltf')
  return <group {...props}>
      <primitive object={scene}
                 scale={200}
                 position={[-10, 0, 0]}
                 rotation={[0, -Math.PI * 2 / 7, 0]}
      />
  </group>;
}
