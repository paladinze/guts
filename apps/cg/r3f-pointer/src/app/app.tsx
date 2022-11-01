import Sketch from './sketch';
import { Canvas } from '@react-three/fiber';

export function App() {
  return (
    <div id={'canvas-container'}>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6]
        }}
      >
        <Sketch />
      </Canvas>
    </div>
  );
}

export default App;
