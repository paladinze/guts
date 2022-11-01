import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function AnimatedModel(props: any) {

  const model = useGLTF('assets/models/Fox/glTF/Fox.gltf');
  const animations = useAnimations(model.animations, model.scene);

  useEffect(() => {
    const runAction = animations.actions['Run']!;
    runAction.play();

    setTimeout(() => {
      animations.actions['Walk']!.play();
      animations.actions['Walk']!.crossFadeFrom(animations.actions['Run']!, 1, false);
    }, 3000)

  }, [])

  return <>
    <primitive object={model.scene} {...props} />

  </>;
}
