import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import { Card, Button, InputGroup, FormControl, Badge } from 'react-bootstrap';

// Estilos para la imagen, para mantener la consistencia
const cardImageStyle = {
  height: '220px',
  objectFit: 'cover',
  padding: '0.5rem'
};

export function Item({ id, nombre, precio, stock, imagen }) {
  const producto = { id, nombre, precio, stock, imagen };
  
  const { addToCart, getCantidadActual } = useCart();
  const cantidadActualEnCarrito = getCantidadActual(producto.id);

  // El contador ahora empieza en 1 por defecto para una mejor UX
  const [cantidad, setCantidad] = useState(1);
  const [esFavorito, setEsFavorito] = useState(false);

  // --- Lógica del contador ---
  const incrementar = () => {
    // No permite agregar más del stock disponible, considerando lo que ya está en el carrito
    if (cantidad < stock - cantidadActualEnCarrito) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  // --- Lógica para añadir al carrito ---
  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    alert(`Agregaste ${cantidad} ${cantidad > 1 ? 'unidades' : 'unidad'} de ${nombre} al carrito.`);
    // Opcional: resetear el contador después de agregar
    setCantidad(1);
  };

  // --- Lógica de Favoritos ---
  const marcarComoFavorito = (e) => {
    e.preventDefault(); // Evita que el click se propague si el ícono está dentro de un link
    setEsFavorito(!esFavorito);
  };

  return (
    <Card className="h-10 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center border-0 bg-transparent">
        <Badge bg="secondary">Stock: {stock}</Badge>
        <span onClick={marcarComoFavorito} style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
          {esFavorito ? '⭐' : '☆'}
        </span>
      </Card.Header>
      
      <Card.Img variant="top" src={imagen} style={cardImageStyle} />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2">{nombre}</Card.Title>
        <Card.Text className="text-primary h5 mb-3">${precio.toFixed(2)}</Card.Text>

        {/* --- Componente Contador con React-Bootstrap --- */}
        <InputGroup className="mb-3">
          <Button variant="outline-secondary" onClick={decrementar}>-</Button>
          <FormControl
            className="text-center"
            value={cantidad}
            readOnly
          />
          <Button variant="outline-secondary" onClick={incrementar}>+</Button>
        </InputGroup>

        {/* Mostramos la cantidad que ya está en el carrito */}
        {cantidadActualEnCarrito > 0 && (
          <p className="text-center text-muted small mb-3">
            Ya tienes {cantidadActualEnCarrito} en el carrito.
          </p>
        )}
      </Card.Body>

      <Card.Footer className="bg-transparent border-0 p-3">
        <div className="d-grid gap-2">
          <Button 
            variant="primary" 
            onClick={handleAddToCart}
            disabled={stock === 0 || cantidad > stock - cantidadActualEnCarrito}
          >
            Agregar {cantidad} al carrito
          </Button>
          <Button as={Link} to={`/producto/${id}`} variant="secondary">
            Ver detalle
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default Item;