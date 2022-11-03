import { Canvas } from '@react-three/fiber';
import HomeSketch from './home-sketch';
import HUD from './HUD/hud';
import { Leva } from 'leva';
import { environment } from '../environments/environment'

export function App() {
  return (
    <div id={'canvas-container'}>
      <Leva hidden={environment.production} />
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [4, 2, 6]
        }}
      >
        <HomeSketch />
        <HUD />
      </Canvas>
    </div>
  );
}

export default App;
