import React from 'react';
import MediaQuery from './media-query';
import NestedSelector from './nested-selector';
import GlobalStyles from './global-styles';
import Composition from './composition';
import { ErrorMessage, LargeErrorMessage } from './share-styles';
import { Card } from './static-dynamic';

export function App() {
  return (
    <>
      <h2>Global styles</h2>
      <GlobalStyles />
      <div className={"global-class"}>global class</div>

      <h2>Nested Selector</h2>
      <NestedSelector />

      <h2>Media query</h2>
      <MediaQuery />

      <h2>Composition</h2>
      <Composition />

      <h2>Style reuse</h2>
      <ErrorMessage>Error variant 1</ErrorMessage>
      <LargeErrorMessage>Error variant 2</LargeErrorMessage>

      <h2>Static and dynamic styles</h2>
      <Card title="card title" borderColor="red">card content</Card>
    </>
  );
}

export default App;
