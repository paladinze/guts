import { useGLTF } from '@react-three/drei';

export const RUBY_MODEL_URL = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ruby/model.gltf';

export default function RubyModel(props: any) {
  const { scene } = useGLTF(RUBY_MODEL_URL);
  return <primitive object={scene}  {...props} />
}
