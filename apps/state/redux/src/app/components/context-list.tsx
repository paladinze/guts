import { AppContext } from '../app';
import React, { useContext, useState } from 'react';

interface ItemListProps {
  color: string
}

interface ItemProps {
  title: string
}

function Item(props: ItemProps): JSX.Element {
  const appState = useContext(AppContext);
  return <div>{`${appState.appName} ${props.title}`}</div>
}

function ItemList(props: ItemListProps): JSX.Element {
  return <ul>
    <li><Item title={"item 1"} /></li>
  </ul>;
}


export default React.memo(ItemList);
