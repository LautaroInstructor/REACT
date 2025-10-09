import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Estilos en línea para la imagen para asegurar consistencia
const cardImageStyle = {
  height: '150px',
  objectFit: 'cover'
};

function TarjetaProducto({ id, nombre, precio, imagen, rutaBase }) {
  const precioFormateado = typeof precio === 'number' ? precio.toFixed(2) : 'N/A';

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={imagen} 
        alt={nombre}
        style={cardImageStyle}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{nombre}</Card.Title>
        <Card.Text className="text-primary h5">${precioFormateado}</Card.Text>
        <Button 
          as={Link} 
          to={`${rutaBase}/${id}`} 
          variant="primary" 
          className="mt-auto"
        >
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;