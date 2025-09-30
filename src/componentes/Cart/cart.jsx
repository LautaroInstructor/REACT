// src/components/Cart/Cart.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

const Cart = () => {
  const { cart, clearCart, getCartTotal, removeItem } = useCart();

  // Si el carrito está vacío, mostramos un mensaje y un botón para volver
  if (cart.length === 0) {
    return (
      <div>
        <h1>El carrito está vacío</h1>
        <p>Agregá productos para continuar la compra.</p>
        <Link to="/productos" className="btn-volver">
          Ver Productos
        </Link>
      </div>
    );
  }

  // Si hay productos, los mostramos con las opciones de finalizar y vaciar
  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <h4>{item.nombre}</h4>
          <p>Cantidad: {item.cantidad}</p>
          <p>Precio unitario: ${item.precio}</p>
          <p>Subtotal: ${item.precio * item.cantidad}</p>
          <hr />
          {/* Agregamos estos nomás y su importación! */}
          <button onClick={() => removeItem(item.id)} className="btn-eliminar">
            Eliminar
          </button>
        </div>
      ))}
      <hr />
      <h3>Total a pagar: ${getCartTotal()}</h3>
      <button onClick={clearCart} className="btn-vaciar">Vaciar Carrito</button>
      <Link to="/" onClick={()=>alert("Gracias por comprar")}className="btn-finalizar">
        Finalizar Compra
      </Link>
    </div>
  );
};

export default Cart;