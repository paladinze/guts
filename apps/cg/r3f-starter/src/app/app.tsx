import { Canvas } from '@react-three/fiber';
import Sketch from './sketch';
import { ACESFilmicToneMapping, CineonToneMapping, sRGBEncoding } from 'three';
import { Leva } from 'leva';
import { RootState } from '@react-three/fiber/dist/declarations/src/core/store';

const onCreateHandler = (state: RootState) => {
  const { gl, scene } = state;
  gl.setClearColor('#fff8dc', 1);
  // scene.background = new THREE.Color('#ff0000')
}

export function App() {
  return (
    <>
      <Leva collapsed={false} />
      <div id='canvas-container'>
        <Canvas
          shadows
          // shadows
          dpr={[1, 2]} // dpr range
          gl={{
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
            outputEncoding: sRGBEncoding
          }}
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [0, 5, 20]
          }}
          onCreated={onCreateHandler}
        >
          <Sketch />
        </Canvas>
      </div>
    </>
  );
}

export default App;
