import type { ReactNode } from 'react';

interface ItemListProps<T> {
  items: readonly T[];
  keyOf: (item: T, index: number) => string | number;
  renderItem: (item: T, index: number) => ReactNode;
}

export function ItemList<T>({ items, keyOf, renderItem }: ItemListProps<T>) {
  if (items.length === 0) {
    return <p className="item-list__empty">No items to display.</p>;
  }

  return (
    <ul className="item-list">
      {items.map((item, index) => (
        <li className="item-list__item" key={keyOf(item, index)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}