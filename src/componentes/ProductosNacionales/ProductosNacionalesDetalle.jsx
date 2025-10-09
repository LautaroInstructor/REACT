// En src/componentes/ProductosNacionales/ProductosNacionalesDetalle.jsx    
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import styles from './ProductosNacionales.module.css';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ProductosNacionalesDetalle = () => {
    const [prod, setProd] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();
    
    console.log(id);

    useEffect(() => {
        if (id) {
            const docRef = doc(db, "Productos nacionales", id);
            getDoc(docRef)
                .then((resp) => {
                    if (resp.exists()) { 
                        setProd({ ...resp.data(), id: resp.id });
                    } else {
                        console.log("No se encontró el producto");
                    }
                })
                .catch(error => console.log(error))
                .finally(() => setCargando(false));
        }
    }, [id]);

    if (cargando) {
        return (
            <Container className="mt-4 text-center">
                <p>Cargando producto...</p>
            </Container>
        );
    }

    if (!prod) {
        return (
            <Container className="mt-4 text-center">
                <p>Producto no encontrado</p>
            </Container>
        );
    }

    return (
        <>
            <Helmet>
                <title>Mi Tienda | {prod.nombre}</title>
                <meta name="description" content={`Detalles y precio del producto ${prod.nombre}.`} />
            </Helmet>
            
            {/* Detalle del producto individual */}
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <Card className="shadow-sm">
                            <Card.Img 
                                variant="top" 
                                src={prod.imagen} 
                                alt={prod.nombre}
                                style={{ height: '300px', objectFit: 'cover' }}
                            />
                            <Card.Body className="text-center">
                                <Card.Title as="h2" className="mb-3">
                                    {prod.nombre}
                                </Card.Title>
                                <Card.Text as="h4" className="text-primary mb-3">
                                    ${prod.precio}
                                </Card.Text>
                                <Card.Text className="text-muted mb-4">
                                    {prod.descripcion || 'Producto de calidad nacional'}
                                </Card.Text>
                                <Button variant="primary" size="lg">
                                    Agregar al Carrito
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ProductosNacionalesDetalle;