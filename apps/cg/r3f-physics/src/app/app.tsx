import Sketch from './sketch';
import { Canvas } from '@react-three/fiber';

export function App() {
  return (
    <div id={'canvas-container'}>
      <Canvas
        shadows
        camera={ {
          fov: 45,
          near: 0.1,
          far: 200,
          position: [ 4, 6, 20 ]
        } }
      >
        <Sketch />
      </Canvas>
    </div>
  );
}

export default App;
