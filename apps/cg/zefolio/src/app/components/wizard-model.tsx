import { useGLTF } from '@react-three/drei';

export default function WizardModel(props: any) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/druid/model.gltf')
  return <primitive object={scene} {...props} />
}
