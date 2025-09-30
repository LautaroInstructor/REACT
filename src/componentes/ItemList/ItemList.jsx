// En /components/ItemList/ItemList.jsx
import { Item } from "../Item/Item";

export function ItemList({ productos }) {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {productos.filter(product => product.stock > 0) 
.map(prod => (
        <Item key={prod.id} {...prod} />
      ))}
    </div>
  );
}
