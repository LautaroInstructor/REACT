// En src/contenedores/FormularioContainer.jsx
import React, { useState } from 'react';
import { FormularioProducto } from '../FormularioProducto/FormularioProducto'; // Asegurate que la ruta sea correcta
// 1. IMPORTACIONES CLAVE DE FIREBASE
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        categoria: ''
        // Quitamos la urlImagen de aquí, la obtendremos después de la subida
    });

    // 1. Nuevo estado para el archivo de imagen
    const [imagenFile, setImagenFile] = useState(null);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    // 2. Nueva función para manejar el cambio del input de tipo "file"
    const manejarCambioImagen = (evento) => {
        // e.target.files es un array con los archivos seleccionados.
        // Como solo permitimos uno, tomamos el primero (índice 0).
        setImagenFile(evento.target.files[0]);
    };

    const manejarEnvio = async (evento) => {

        evento.preventDefault();

        // Validamos que el usuario haya seleccionado una imagen
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }

        // --- Lógica para subir la imagen a Imgbb ---
        const apiKey = '696db28a61d7dded63b5d39bd8d01711'; 
        const formData = new FormData();
        formData.append('image', imagenFile);

        try {
            console.log("Subiendo imagen a Imgbb...");
            const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });

            const datosImgbb = await respuestaImgbb.json();

            if (datosImgbb.success) {
                console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);

                const productoCompleto = {
                    ...datosForm,
                    // Convertimos precio y stock a número para guardarlos correctamente
                    precio: parseFloat(datosForm.precio), 
                    stock: parseInt(datosForm.stock, 10),
                    imagen: datosImgbb.data.url // Renombramos 'urlImagen' a 'imagen' para consistencia
                };

                // --- 2. LÓGICA PARA SUBIR DATOS A FIRESTORE ---
                console.log('Enviando producto a Firebase:', productoCompleto);
                
                // Obtenemos la instancia de la base de datos
                const db = getFirestore();
                // Apuntamos a la colección "productos" (si no existe, se crea)
                const productosCollection = collection(db, "Productos nacionales");

                // Agregamos el nuevo documento a la colección
                await addDoc(productosCollection, productoCompleto);

            } else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }

            // Reseteamos el formulario solo si todo fue exitoso
            setDatosForm({
                nombre: '',
                precio: '',
                stock: '',
                categoria: ''
            });
            setImagenFile(null);
            // Es buena práctica también resetear el input file visualmente
            evento.target.reset();



        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        }
    };

    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen} // Pasamos la nueva función como prop
        />
    );
}
