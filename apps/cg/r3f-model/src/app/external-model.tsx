import { Clone, OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { DoubleSide, Mesh } from 'three';
import { Perf } from 'r3f-perf';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default function ExternalModel(props: any) {
  const model = useGLTF(props.path as string);

  // glTF draco: verbose method
  // const model = useLoader(GLTFLoader, 'assets/models/FlightHelmet/glTF/FlightHelmet.gltf', (loader) => {
  //   const dracoLoader = new DRACOLoader();
  //   dracoLoader.setDecoderPath('assets/models/draco/');
  //   loader.setDRACOLoader(dracoLoader);
  // });

  return <>
      {/*<primitive object={model.scene} />*/}
    <Clone object={model.scene} {...props} />
    <Clone object={model.scene} {...props} position-x={-1}/>
    <Clone object={model.scene} {...props} position-x={1}/>
  </>;
}
