import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import Grid from './components/grid';
import Akira from './screens/akira';
import './styles.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Akira />
    {/*<Grid />*/}
  </StrictMode>
);