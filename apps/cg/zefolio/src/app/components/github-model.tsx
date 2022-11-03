import { useGLTF } from '@react-three/drei';
import ButtonAnimation, { ButtonAnimationType } from '../animation/button-animation';

export default function Model(props: any) {
  const { scene } = useGLTF('assets/models/github.glb');
  return <group {...props}>
    <ButtonAnimation type={ButtonAnimationType.ZOOM_ROTATE}>
      <primitive object={scene} />
    </ButtonAnimation>
  </group>;
}
