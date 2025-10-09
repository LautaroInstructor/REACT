// src/components/Inicio/Inicio.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import estilos from './Inicio.module.css'; // Importamos nuestro módulo de estilos en español
import TarjetaProducto from '../Tarjetas/TarjetaProducto';
import ProductosNacionales from '../ProductosNacionales/ProductosNacionales';
import Productos from '../Productos/Productos';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Inicio({ Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');

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

    const productosFiltrados = productos.filter(prod =>
        prod.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );

    if (cargando) {
        return <div className={estilos.mensajeEstado}>Cargando productos, por favor espere...</div>;
    }

    if (error) {
        return <div className={`${estilos.mensajeEstado} ${estilos.error}`}>Error: {error}</div>;
    }

    return (
        <main className={estilos.contenedorInicio}>
            <header className={estilos.seccionEncabezado}>
                <h1>Bienvenido a nuestra tienda</h1>
                <p>
                    Descubre una selección curada de productos de alta calidad. Nos apasiona ofrecerte lo mejor, combinando diseño, funcionalidad y un servicio excepcional.
                </p>
            </header>

            <section className={estilos.seccionBusqueda}>
                <input
                    type="text"
                    placeholder="Buscar productos por nombre..."
                    className={estilos.campoBusqueda}
                    value={terminoBusqueda}
                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                />
            </section>

            <section className={estilos.seccionInferior}>
                <h2 className={estilos.tituloSeccion}>Nuestros productos</h2>
                {productosFiltrados.length > 0 ? (
                    <Row>
                        {productosFiltrados.map((prod) => (
                            <Col xs={12} sm={6} lg={4} key={prod.id} className="mb-4">
                                <TarjetaProducto
                                    id={prod.id}
                                    nombre={prod.nombre}
                                    precio={prod.precio}
                                    imagen={prod.imagen}
                                    rutaBase="/producto"
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p className={estilos.mensajeEstado}>No se encontraron productos que coincidan con tu búsqueda.</p>
                )}
            </section>

            <section className={estilos.seccionInferior}>
                <Link to="/productos">
                    <h2 className={estilos.tituloSeccion}>Productos en oferta</h2>
                    <Productos />
                </Link>
            </section>

            <section className={estilos.seccionInferior}>
                <Link to="/productos-nacionales">
                <h2 className={estilos.tituloSeccion}>Productos nacionales</h2>
                <ProductosNacionales />
                </Link>
            </section>
        </main>
    );
}

export default Inicio;