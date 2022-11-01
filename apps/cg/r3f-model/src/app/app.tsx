import Sketch from './sketch';
import { Canvas } from '@react-three/fiber';

export function App() {
  return (
    <div id={'canvas-container'}>
      <Canvas>
        <Sketch />
      </Canvas>
    </div>
  );
}

export default App;
