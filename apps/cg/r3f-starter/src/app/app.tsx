import { Canvas } from '@react-three/fiber';
import Sketch from './sketch';
import { ACESFilmicToneMapping, CineonToneMapping, sRGBEncoding } from 'three';

export function App() {
  return (
    <>
      <div id='canvas-container'>
        <Canvas
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
          }}>
          <Sketch />
        </Canvas>
      </div>
    </>
  );
}

export default App;
