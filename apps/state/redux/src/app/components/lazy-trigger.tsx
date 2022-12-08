import React, { Suspense, useState } from 'react';
import LazyLoading from './lazy-loading';


export default function() {
  const [loadHeavy, setLoadHeavy] = useState(false);
  return <>
    <h2>Lazy Loading</h2>
    <label>React.lazy: lazy load a heavy component</label>
    <input type={'checkbox'}
           onChange={(event) => {
             setLoadHeavy((event.target.checked));
           }} />
    {
      loadHeavy && <Suspense>
        <LazyLoading />
      </Suspense>
    }

  </>;
}
