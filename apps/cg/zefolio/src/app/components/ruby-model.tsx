import { useGLTF } from '@react-three/drei';

export default function RubyModel(props: any) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ruby/model.gltf')
  return <primitive object={scene}  {...props} />
}
