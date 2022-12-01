import { FC } from 'react';
import { Item } from 'yjs';

interface ItemListProps {
  color: string
}

function ItemList(props: ItemListProps): JSX.Element {
  const { color } = props;
  return <div>{color}</div>;
}

export default ItemList;
