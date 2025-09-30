// src/componentes/Gestion/Gestion.jsx
import React, { useState, useEffect } from 'react';
// Importamos las funciones necesarias de Firestore para el CRUD completo.
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../firebase/config';
// La importación nombrada es correcta, ya que así lo exportaste.
import { FormularioProducto } from '../FormularioProducto/FormularioProducto';

const Gestion = () => {
    // ESTADO 1: Lista de todos los productos traídos de la base de datos.
    const [productos, setProductos] = useState([]);


    // ESTADO 2: Objeto que contiene el producto que se está editando.
    // Inicia en null porque al principio no estamos editando nada.
    const [productoAEditar, setProductoAEditar] = useState(null);




    // ESTADO 3: Estado para manejar los datos del formulario.
    // Este estado centraliza los valores de todos los inputs.
    // ESTADO 3: Estado para manejar los datos del formulario.
    const estadoInicialForm = {
        nombre: "",
        categoria: "",
        precio: 0,
        stock: 0,
        imagen: ""
    };
    const [datosForm, setDatosForm] = useState(estadoInicialForm);
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

    // EFECTO SECUNDARIO: Vigila los cambios en `productoAEditar`.
    // Si `productoAEditar` tiene un objeto, rellena el formulario con sus datos.
    // Si `productoAEditar` se vuelve null, limpia el formulario.
    useEffect(() => {
        if (productoAEditar) {
            setDatosForm(productoAEditar);
        } else {
            setDatosForm(estadoInicialForm);
        }
    }, [productoAEditar]);
    // MANEJADORES DE EVENTOS PARA EL FORMULARIO
    // 1. Maneja el cambio en los inputs de texto y número.
    const manejarCambio = (e) => {
        setDatosForm({
            ...datosForm,
            [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
        });
    };




    // 2. Maneja el cambio en el input de tipo 'file' (imagen).
    const manejarCambioImagen = (e) => {
        // La lógica para subir la imagen a un servicio (como Imgbb o Firebase Storage) iría aquí.
        // Por ahora, solo guardaremos el nombre o una referencia.
        console.log(e.target.files[0]);
    };




    // 3. Maneja el envío del formulario (Crear o Actualizar).
    const manejarEnvio = async (e) => {
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario.




        if (productoAEditar) {
            // Lógica de ACTUALIZACIÓN (Update)
            const docRef = doc(db, "Productos nacionales", productoAEditar.id);
            await updateDoc(docRef, datosForm);
            alert("Producto actualizado con éxito.");
        } else {
            // Lógica de CREACIÓN (Create)
            const productosRef = collection(db, "Productos nacionales");
            await addDoc(productosRef, datosForm);
            alert("Producto agregado con éxito.");
        }




        // Limpiamos el formulario y el estado de edición, y volvemos a pedir los datos.
        setProductoAEditar(null);
        setDatosForm(estadoInicialForm);
        fetchProductos(); // Volvemos a cargar los productos para ver los cambios.
    };




    // MANEJADORES DE ACCIONES DE LA LISTA
    // 1. Prepara el componente para la edición.
    const handleEditClick = (producto) => {
        setProductoAEditar(producto);
    };




    // 2. Elimina un producto de la base de datos.
    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        if (confirmacion) {
            const docRef = doc(db, "Productos nacionales", id);
            await deleteDoc(docRef);
            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setProductos(productos.filter(prod => prod.id !== id));
            alert("Producto eliminado.");
        }
    };




    // RENDERIZADO DEL COMPONENTE
    return (
        <div>
            <h2>Gestión de Productos</h2>
            <hr />


            {/* --- SECCIÓN DEL FORMULARIO --- */}
            {/* Le pasamos el estado y los manejadores al componente presentacional */}
            <FormularioProducto
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarCambioImagen={manejarCambioImagen}
                manejarEnvio={manejarEnvio}
            />
            {/* Botón para cancelar la edición, solo visible si estamos en modo edición */}
            {productoAEditar && (
                <button onClick={() => setProductoAEditar(null)} style={{ margin: '0 auto', display: 'block' }}>
                    Cancelar Edición
                </button>
            )}
            <hr />
            {/* --- SECCIÓN DE LA LISTA DE PRODUCTOS --- */}
            <div>
                <h3>Lista de Productos</h3>
                <ul>
                    {productos.map((prod) => (
                        // NOTA: Había un <li> anidado dentro de otro, lo he corregido.
                        <li key={prod.id}>
                            {prod.nombre} - ${prod.precio}
                            <button onClick={() => handleDelete(prod.id)} style={{ marginLeft: '10px' }}>
                                Eliminar
                            </button>
                            <button onClick={() => handleEditClick(prod)} style={{ marginLeft: '5px' }}>
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};




export default Gestion;


