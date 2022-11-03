import { useGLTF } from '@react-three/drei';
import ButtonAnimation, { AnimationType } from '../animation/button-animation';

export default function Model(props: any) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/book/model.gltf')
  return <group {...props}>
    <ButtonAnimation type={AnimationType.ZOOM}><primitive object={scene} /></ButtonAnimation>
  </group>
}
