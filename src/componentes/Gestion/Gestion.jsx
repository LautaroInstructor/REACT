// src/componentes/Gestion/Gestion.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { FormularioContainer } from '../FormularioContainer/FormularioContainer'; // Asumimos que este componente ya existe
import { collection, getDocs, deleteDoc, updateDoc, doc, addDoc } from "firebase/firestore"; // Funcion delete
import { FormularioProducto } from '../FormularioProducto/FormularioProducto';

import styled from "styled-components";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importamos los íconos

// 1. Definimos un componente base para los botones
const BotonAccion = styled.button`
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
`;

// 2. Extendemos el estilo base para crear variantes
const BotonEditar = styled(BotonAccion)`
  border-color: #ffc107;
  color: #ffc107;

  &:hover {
    background-color: #ffc107;
    color: white;
  }
`;

const BotonEliminar = styled(BotonAccion)`
  border-color: #dc3545;
  color: #dc3545;

  &:hover {
    background-color: #dc3545;
    color: white;
  }
`;
const estadoInicialForm = {
    nombre: "",
    categoria: "",
    precio: 0,
    stock: 0,
    imagen: ""
};
const ProductoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fff;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ProductoInfo = styled.span`
  flex-grow: 1;
  font-size: 16px;
`;
const Gestion = () => {
    const [productos, setProductos] = useState([]);
    const [productoAEditar, setProductoAEditar] = useState(null);
    const [imagenFile, setImagenFile] = useState(null);

    // ESTADO 3: Datos del formulario (ya lo teníamos)
    const [datosForm, setDatosForm] = useState(estadoInicialForm);

    // READ
    // FUNCIÓN ASÍNCRONA PARA OBTENER LOS PRODUCTOS
    const fetchProductos = async () => {
        const productosRef = collection(db, "Productos nacionales");
        const resp = await getDocs(productosRef);


        setProductos(
            resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    };
    // EFECTO SECUNDARIO: Se ejecuta una vez al montar el componente para cargar los productos.
    useEffect(() => {
        fetchProductos();
    }, []);

    // DELETE
    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        if (confirmacion) {
            const docRef = doc(db, "Productos nacionales", id);
            await deleteDoc(docRef);
            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setProductos(productos.filter(prod => prod.id !== id));

        }
    };
    // En src/Gestion.jsx
    useEffect(() => {
        if (productoAEditar) {
            setDatosForm(productoAEditar);
        } else {
            setDatosForm(estadoInicialForm);
        }
    }, [productoAEditar]);

    const manejarCambio = (e) => {
        setDatosForm({
            ...datosForm,
            [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
        });
    };
    // 2. Maneja el cambio en el input de tipo 'file' (imagen).
    const manejarCambioImagen = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImagenFile(e.target.files[0]);   // <-- ahora sí guardamos el archivo
        }
    };

    const handleEditClick = (producto) => {
        setProductoAEditar(producto);
    };


    const manejarEnvio = async (e) => {
        e.preventDefault();
        if (datosForm.nombre.trim() === "" || datosForm.precio <= 0) {
            alert("Por favor, complete todos los campos y asegúrese de que el precio sea mayor a cero.");
            return; // Detiene la ejecución de la función
        }

        // Si se seleccionó un nuevo archivo de imagen, lo subimos a ImgBB
        let urlImagen = datosForm.imagen; // Mantenemos la imagen actual por defecto

        if (imagenFile) {
            const formData = new FormData();
            formData.append('image', imagenFile);
            // Gestion.jsx
            const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

            if (!apiKey) {
                console.error("API key de ImgBB no configurada");
                alert("Error de configuración. Contacte al administrador.");
                return;
            }

            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (data.success) {
                    urlImagen = data.data.url; // Obtenemos la nueva URL
                } else {
                    throw new Error('La subida de la imagen falló.');
                }
            } catch (error) {
                console.error("Error al subir la imagen:", error);
                alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
                return; // Detenemos la ejecución si falla la subida
            }
        }


        const productoFinal = { ...datosForm, imagen: urlImagen };

        try {
            if (productoAEditar) {
                const docRef = doc(db, "Productos nacionales", productoAEditar.id);
                // Actualizamos el documento en Firebase
                await updateDoc(docRef, productoFinal);
                alert("Producto actualizado con éxito.");
            } else {
                // LÓGICA DE CREACIÓN (CREATE) - (La que ya teníamos en Clase 10)
                await addDoc(collection(db, "Productos nacionales"), productoFinal);
                alert("Producto guardado con éxito.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const cancelarEdicion = () => {
        setProductoAEditar(null);
    };



    return (
        <div>
            <h2>Gestión de Productos</h2>
            <hr />
            <FormularioProducto
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarCambioImagen={manejarCambioImagen}
                manejarEnvio={manejarEnvio}
                modoEdicion={productoAEditar} />
            {productoAEditar && (
                <button onClick={cancelarEdicion}>
                    Cancelar Edición
                </button>
            )}


            <hr />
            <h3>Lista de Productos</h3>
            <ul>
                {productos.map((prod) => (
                    <ProductoItem key={prod.id}>
                        <ProductoInfo>
                            {prod.nombre} - {prod.categoria} - ${prod.precio} - {prod.stock}
                        </ProductoInfo>
                        <div>
                            <BotonEditar onClick={() => handleEditClick(prod)}>
                                <FaEdit style={{ marginRight: '5px' }} /> Editar
                            </BotonEditar>
                            <BotonEliminar onClick={() => handleDelete(prod.id)}>
                                <FaTrash style={{ marginRight: '5px' }} /> Eliminar
                            </BotonEliminar>
                        </div>
                    </ProductoItem>
                ))}
            </ul>
        </div>
    );
};

export default Gestion;
