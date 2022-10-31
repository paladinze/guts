import { Canvas } from '@react-three/fiber'
import Sketch from './sketch';

export function App() {
  return (
    <>
      <div id="canvas-container">
        <Canvas>
          <Sketch />
        </Canvas>
      </div>
    </>
  );
}

export default App;
