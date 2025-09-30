// En /componentes/Item/Item.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export function Item({ id, nombre, precio, stock, imagen }) {
  // Creamos el objeto producto a partir de las props
  const producto = { id, nombre, precio, stock, imagen };
  
  // Obtenemos la cantidad YA existente en el carrito desde el contexto
  const { addToCart, getCantidadActual } = useCart();// Traemos la función del contexto
  const [cantidad, setCantidad] = useState(0);
  const cantidadActual = getCantidadActual(producto.id);
  

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };
  //
  
  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
  };

  const [esFavorito, setEsFavorito] = useState(false);
  const marcarComoFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className="card-producto">
      <img src={producto.imagen} alt={producto.nombre} width={100} height={100} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      <p>Stock disponible: {stock}</p> {/* Es buena práctica mostrar el stock */}
      <Link to={`/producto/${producto.id}`}>Ver detalle</Link>


      <span
        onClick={marcarComoFavorito}
        style={{ fontSize: '24px', cursor: 'pointer' }}
      >
        {esFavorito ? '⭐' : '☆'}
      </span>


      {/* --- Componente Contador --- */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
        <button onClick={decrementar}>-</button>
        <p style={{ margin: '0 15px', fontWeight: 'bold' }}>{cantidadActual}</p>
        <button onClick={incrementar}>+</button>
      </div>

      <button onClick={handleAddToCart}>
        Agregar {cantidad} al carrito
      </button>
    </div>
  );
}

export default Item;