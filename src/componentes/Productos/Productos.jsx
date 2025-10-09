import React, { useState, useEffect } from 'react';
import styles from './Productos.module.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TarjetaProducto from '../Tarjetas/TarjetaProducto';
function Productos({ Mensaje }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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
  const productosFiltrados = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {/*  */}
      <Row className="mb-4">
        <Col>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar en los productos cargados..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <h1>{Mensaje}</h1>
        {productosFiltrados.map((producto) => (
          <Col xs={12} sm={6} lg={4} key={producto.id} className="mb-4">
            <TarjetaProducto
              id={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              imagen={producto.imagen}
              rutaBase="/producto" // Ruta para esta sección
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Productos;
