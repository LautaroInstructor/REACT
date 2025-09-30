// src/componentes/productosNacionales/ProductosNacionales.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, limit, startAfter } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

const ProductosNacionales = () => {
  // Estados del componente
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cargando, setCargando] = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [ultimoVisible, setUltimoVisible] = useState(null);
  const [hayMas, setHayMas] = useState(true);

  const PRODUCTOS_POR_PAGINA = 4;

  // Logica de carga inicial extraida a su propia funcion ---
  const obtenerProductosIniciales = () => {
    setCargando(true);
    const productosDB = collection(db, "Productos nacionales");
    const q = query(productosDB, limit(PRODUCTOS_POR_PAGINA));

    getDocs(q).then((resp) => {
      const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProductos(productosData);

      const ultimoDoc = resp.docs[resp.docs.length - 1];
      setUltimoVisible(ultimoDoc);

      setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
    }).catch(error => console.error("Error al obtener productos: ", error))
      .finally(() => setCargando(false));
  };

  // El useEffect ahora solo llama a la funcion de carga inicial
  useEffect(() => {
    obtenerProductosIniciales();
  }, []);

  // Funcion para cargar la siguiente pagina
  const obtenerMasProductos = () => {
    if (!hayMas || cargandoMas) return;

    setCargandoMas(true);
    const productosDB = collection(db, "Productos nacionales");
    const q = query(productosDB, startAfter(ultimoVisible), limit(PRODUCTOS_POR_PAGINA));

    getDocs(q).then((resp) => {
      const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProductos(productosAnteriores => [...productosAnteriores, ...productosData]);

      const ultimoDoc = resp.docs[resp.docs.length - 1];
      setUltimoVisible(ultimoDoc);

      setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
    }).catch(error => console.error("Error al cargar mas productos: ", error))
      .finally(() => setCargandoMas(false));
  };

  // Simplemente vuelve a llamar a la funcion que trae la primera pagina, reseteando el estado.
  const verMenos = () => {
    obtenerProductosIniciales();
    // Opcional: Desplazar la vista hacia arriba
    window.scrollTo(0, 0);
  }

  // Filtro de busqueda sobre los productos ya cargados
  const productosFiltrados = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Renderizado de carga inicial
  if (cargando) {
    return (
      <Container className="text-center p-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
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
        {/* Mapeo de productos filtrados */}
        {productosFiltrados.map(prod => (
          <Col key={prod.id} xs={12} md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={prod.imagen} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{prod.nombre}</Card.Title>
                <Card.Text>${prod.precio}</Card.Text>
                <Button as={Link} to={`/productos-nacionales/${prod.id}`} variant="primary" className="mt-auto">
                  Ver detalle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Logica de renderizado para los botones --- */}
      <Row className="mt-4">
        <Col className="text-center d-flex justify-content-center gap-2">
          {/* El boton "Ver menos" solo aparece si hay mas de una pagina cargada */}
          {productos.length > PRODUCTOS_POR_PAGINA && (
            <Button variant="secondary" onClick={verMenos}>
              Ver menos
            </Button>
          )}

          {/* Boton "Cargar mas" */}
          {hayMas ? (
            <Button onClick={obtenerMasProductos} disabled={cargandoMas}>
              {cargandoMas ? <Spinner as="span" animation="border" size="sm" /> : 'Cargar mas'}
            </Button>
          ) : (
            // No mostramos el alert si solo hay una pagina de resultados
            productos.length > PRODUCTOS_POR_PAGINA && <Alert variant="light" className="m-0">No hay mas productos para mostrar.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductosNacionales;