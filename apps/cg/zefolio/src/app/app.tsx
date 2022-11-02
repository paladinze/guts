import { Canvas } from '@react-three/fiber';
import HomeSketch from './home-sketch';

export function App() {
  return (
    <div id={'canvas-container'}>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          // position: [4, 2, 6]
          position: [4, 2, 6]
        }}
      >
        <HomeSketch />
      </Canvas>
    </div>
  );
}

export default App;
