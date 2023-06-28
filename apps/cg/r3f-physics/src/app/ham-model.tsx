import { useGLTF } from '@react-three/drei';

const HamModelUrl = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/whole-ham/model.gltf';
export default function HamModel(props: any) {
  const { scene } = useGLTF(HamModelUrl);
  return <primitive object={scene} {...props} />;
}

useGLTF.preload(HamModelUrl);
