import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

/**
 * Animations
 *  PortalOpen
 *  Still
 *  Waiting
 */
enum Clips {
  STILL = 'Still',
  PORTAL_OPEN = 'PortalOpen',
  WAITING = 'Waiting',
}

export const WIZARD_MODEL_URL = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/druid/model.gltf';
export default function WizardModel(props: any) {
  const model = useGLTF(WIZARD_MODEL_URL);
  const animations = useAnimations(model.animations, model.scene);

  useEffect(() => {
    setTimeout(() => {
      const magicAction = animations.actions[Clips.PORTAL_OPEN]!;
      magicAction.setLoop(THREE.LoopOnce, 1);
      magicAction.clampWhenFinished = true;
      magicAction.enabled = true;
      magicAction.play();
    }, 3000);

  }, []);

  return <primitive object={model.scene} {...props} />;
}
