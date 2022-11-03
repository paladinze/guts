import { useGLTF } from '@react-three/drei';

export default function Model(props: any) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/book/model.gltf')
  return <primitive object={scene} {...props} />
}
