import { useGLTF } from '@react-three/drei';

export default function Model(props: any) {
  const { scene } = useGLTF('assets/models/github.glb');
  return <primitive object={scene} {...props} />
}
