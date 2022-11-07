import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import Sketch from './app/sketch';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const canvasContainer = document.getElementById('canvas-container') as HTMLElement;
new Sketch({ dom: canvasContainer});


root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
