// En src/componentes/ProductosNacionales/ProductosNacionalesDetalle.jsx    
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Importaciones clave para obtener un solo documento
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import styles from './productosNacionales.module.css';
// En src/componentes/ProductosNacionales/ProductosNacionalesDetalle.jsx    
import { Helmet } from 'react-helmet';

const ProductosNacionalesDetalle = () => {
    const [prod, setItem] = useState(null);
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        if (id) {
            // 1. Creamos la referencia al documento
            const docRef = doc(db, "Productos nacionales", id);

            // 2. Realizamos la petición (asincrónica)
            getDoc(docRef)
                .then((resp) => {
                    if (resp.exists()) { // Verificamos si el documento existe
                        setItem({ ...resp.data(), id: resp.id });
                    } else {
                        console.log("No se encontró el producto");
                    }
                })
                .catch(error => console.log(error));
        }
    }, [id]);

    return (
        <>
            {prod && (
                <Helmet>
                    <title>Mi Tienda | {prod.nombre}</title>
                    <meta name="description" content={`Detalles y precio del producto ${prod.nombre}.`} />
                </Helmet>
            )}
            {/* Características del producto */}
            <div className="container">
                <div className={styles.CartaDetalle}>
                    {prod ? (
                        <div key={prod.id} className={styles.itemProducto}>
                            <img src={prod.imagen} alt={prod.nombre} className={styles.imagen} />
                            <h3>{prod.nombre}</h3>
                            <p>Categoría: {prod.categoria}</p>
                            <p>Precio: ${prod.precio}</p>
                            <p>Stock: {prod.stock} unidades</p>
                            <hr />
                        </div>
                    ) : (
                        <p>Cargando producto...</p>
                    )}
                </div>
            </div >

        </>

    );
};

export default ProductosNacionalesDetalle;
