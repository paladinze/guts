import ItemList from './components/context-list';
import React from 'react';
import LazyTrigger from './components/lazy-trigger';
import StateReducer from './components/state-reducer';
import Lifecycle from './components/lifecycle';
import ImperitiveHandleDemo from './components/imperitive-handle';
import WindowSizeMeasurement from './components/layout-effect';



export const AppContext = React.createContext({ appName: 'Demo' });
const AppDataProvider = (props: { children: React.ReactNode}) => {

  const appData = { appName: 'React feature demo'}

  return <AppContext.Provider value={appData}>
    <h2>React.context + provider</h2>
    {props.children}
  </AppContext.Provider>
}

export function App() {

  return (
    <>
        <h1>React Basic Features</h1>
        <WindowSizeMeasurement />
        <ImperitiveHandleDemo />
        <StateReducer />
        <Lifecycle />
        <AppDataProvider>
          <ItemList color={'red'} />
        </AppDataProvider>
        <LazyTrigger />
    </>
  );
}

export default App;
