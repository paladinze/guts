import { useGLTF } from '@react-three/drei';

export default function Model(props: any) {
  const { scene } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/whole-ham/model.gltf')
  return <primitive object={scene} {...props} />
}
