import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function Sketch() {
  return <>

    <Perf position='top-left' />
    <OrbitControls makeDefault />
    <color args={['black']} attach={'background'} />

    <EffectComposer multisampling={4}>
      {/*<Vignette*/}
      {/*  offset={0.3}*/}
      {/*  darkness={0.9}*/}
      {/*  blendFunction={BlendFunction.NORMAL}*/}
      {/*/>*/}
      {/*<Glitch*/}
      {/*  delay={new Vector2(0.5, 1)}*/}
      {/*  duration={new Vector2(0.1, 0.3)}*/}
      {/*  strength={new Vector2(0.2, 0.4)}*/}
      {/*  mode={ GlitchMode.SPORADIC }*/}
      {/*/>*/}
      {/*<Noise*/}
      {/*  premultiply*/}
      {/*  blendFunction={BlendFunction.OVERLAY} />*/}
      {/*<Bloom*/}
      {/*  mipmapBlur*/}
      {/*  intensity={ 0.5 }*/}
      {/*  luminanceThreshold={ 0 }*/}
      {/*/>*/}
      <DepthOfField
        focusDistance={ 0.025 }
        focalLength={ 0.025 }
        bokehScale={ 6 }
      />
    </EffectComposer>

    <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
    <ambientLight intensity={0.5} />

    <mesh castShadow position-x={-2}>
      <sphereGeometry />
      <meshStandardMaterial color='orange' />
    </mesh>

    <mesh castShadow position-x={2} scale={1.5}>
      <boxGeometry />
      <meshStandardMaterial
        color="mediumpurple" emissive="mediumpurple" emissiveIntensity={ 2 }
        // color={ [ 1, 1.2, 3 ] }
        // color='mediumpurple'
        toneMapped={ false } />
    </mesh>

    <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
      <planeGeometry />
      <meshStandardMaterial color='grey' />
    </mesh>

  </>;
}
