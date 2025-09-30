import React, { useState, useEffect } from 'react';
import styles from './Productos.module.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
function Productos({ Mensaje }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  // useEffect con su fetch que llama a data/json
  useEffect(() => {
    fetch('/data/productos.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar la información de los productos');
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando productos, por favor espere...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Row>
      {productos.map((producto) => (
        <Col xs={12} sm={6} lg={4} key={producto.id} className="mb-4">
          <Link to={`/producto/${producto.id}`} className={styles.itemProducto}>
            <h2>{producto.nombre}</h2>
            <img src={producto.imagen} alt={producto.nombre} width="150" height="150" />
            <p>Precio: ${producto.precio}</p>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default Productos;
