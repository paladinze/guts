import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { User } from './app/models/user';

const user = User.buildInstance({ name: 'ze', age: 123, id: 1 });

user.get('name');
user.on('change', () => {
  console.log('change 1');
});
user.on('change', () => {
  console.log('change 2');
});
user.fetch();
// user.set({ 'name': 'ultraman' });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
