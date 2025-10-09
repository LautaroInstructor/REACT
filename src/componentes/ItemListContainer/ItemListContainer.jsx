import { ItemList } from "../ItemList/ItemList";
import styles from './ItemListContainer.module.css';
import { useState, useEffect } from "react";
import { Spinner} from 'react-bootstrap';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TarjetaProducto from '../Tarjetas/TarjetaProducto';
export function ItemListContainer({ Mensaje }) {
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
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </div>
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className={styles.subtitulo}>{Mensaje}</h2>
      <div className={styles.productos}>
        <ItemList productos={productos} />
      </div>
    </div>
  );
}
