import { useEffect } from 'react';
import { Map } from './map';
import User from './user';
import Company from './company';
import _ from 'lodash';


export function App() {

  useEffect(() => {
    const map = new Map();

    _.times(20, () => {
      const user = new User();
      map.addMarker(user);
    })

    _.times(5, () => {
      const company = new Company();
      map.addMarker(company);
    })

  }, [])

  return (
    <>
      <div id={'map'} />
    </>
  );
}

export default App;
