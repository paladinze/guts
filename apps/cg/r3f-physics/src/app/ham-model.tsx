import { useGLTF } from '@react-three/drei';

const HamModelUrl = 'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/whole-ham/model.gltf';
export default function HamModel(props: any) {
  const { scene } = useGLTF(HamModelUrl);
  return <primitive object={scene} {...props} />;
}

useGLTF.preload(HamModelUrl);
