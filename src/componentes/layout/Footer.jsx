import React, { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import ListaEmpleados from "./ListaEmpleados";
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.css';

function Footer() {
    const [personal, setPersonal] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerDatosPersonal = async () => {
            try {
                const personalCollection = collection(db, "Personal");
                const q = query(personalCollection);
                const querySnapshot = await getDocs(q);
                const personalData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setPersonal(personalData);
            } catch (error) {
                console.error("Error al obtener los datos del personal: ", error);
            } finally {
                setCargando(false);
            }
        };
        obtenerDatosPersonal();
    }, []);

    return (
        <footer>
            <Container >
                <Row className={styles.footerPrincipal}>
                    <Col xs={12} className="mb-4 mb-md-5"> {/* Más margen en móviles */}
                        <div className={styles.equipoSeccion}>
                            <h2>Nuestro Equipo</h2>
                            {cargando ? (
                                <p>Cargando equipo...</p>
                            ) : (
                                <ListaEmpleados
                                    empleados={personal}
                                    variant="compact"
                                />
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xs={12} className="text-center">
                        <div className="footer-info mt-3 mt-md-4"> {/* Margen superior */}
                            <p>&copy; 2025 - Mi Aplicación React</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;