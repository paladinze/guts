import Sketch from './sketch';
import { Canvas, RootState } from '@react-three/fiber';

const createHandler = (state: RootState) => {
  state.gl.setClearColor('#5a5353');
  // state.gl.setClearColor('#FFFEEE');
};

export function App() {
  return (
    <div id={'canvas-container'}>
      <Canvas
        flat
        onCreated={createHandler}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [1, 2, 6]
        }}
      >
        <Sketch />
      </Canvas>
    </div>
  );
}

export default App;
