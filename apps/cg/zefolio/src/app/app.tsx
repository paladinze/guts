import { Canvas } from '@react-three/fiber';
import HomeSketch from './home-sketch';
import HUD from './HUD/hud';
import { Leva } from 'leva';
import { environment } from '../environments/environment';
import { Suspense, useEffect } from 'react';
import ProgressBar from './loading/progress-bar';
import { useGLTF } from '@react-three/drei';
import { WIZARD_MODEL_URL } from './components/wizard-model';
import { RUBY_MODEL_URL } from './components/ruby-model';

export function App() {
  useEffect(() => {
    useGLTF.preload(WIZARD_MODEL_URL);
    useGLTF.preload(RUBY_MODEL_URL);
  }, []);

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
        <Suspense fallback={<ProgressBar />}>
          <HomeSketch />
          <HUD />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
