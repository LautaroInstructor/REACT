// src/components/Cart/Cart.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

const Cart = () => {
  const { cart, clearCart, getCartTotal, removeItem } = useCart();

  if (cart.length === 0) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Card className="text-center">
              <Card.Body className="py-5">
                <Card.Title>Carrito Vacío</Card.Title>
                <Card.Text className="text-muted mb-3">
                  No hay productos en tu carrito.
                </Card.Text>
                <Button as={Link} to="/productos" variant="primary">
                  Ver Productos
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="mb-4">Carrito de Compras</h1>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <ListGroup>
            {cart.map(item => (
              <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{item.nombre}</h6>
                  <small className="text-muted">
                    ${item.precio} x {item.cantidad} = ${item.precio * item.cantidad}
                  </small>
                </div>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  Eliminar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Body>
              <h5>Resumen</h5>
              <p className="h4 text-primary">Total: ${getCartTotal()}</p>
              
              <div className="d-grid gap-2 mt-3">
                <Button 
                  variant="primary" 
                  onClick={() => alert("Gracias por tu compra!")}
                >
                  Finalizar Compra
                </Button>
                
                <Button 
                  variant="outline-danger" 
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </Button>

                <Button 
                  as={Link} 
                  to="/productos" 
                  variant="outline-secondary"
                >
                  Seguir Comprando
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;