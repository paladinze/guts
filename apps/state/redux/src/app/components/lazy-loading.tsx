import React from 'react';

export default React.lazy(() => {
  return import('./heavy-component');
});
