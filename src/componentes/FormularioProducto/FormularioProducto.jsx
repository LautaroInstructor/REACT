// En src/componentes/FormularioProducto/FormularioProducto.jsx
import React from 'react';


export function FormularioProducto({ datosForm, manejarCambioImagen, manejarCambio, manejarEnvio, modoEdicion }) {
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '24rem',
        margin: '3rem auto',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        gap: '16px'
    };


    return (


        <form style={formStyle} onSubmit={manejarEnvio}>
            <h3>{modoEdicion ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>


            <div>
                <label>Nombre del Producto:</label>
                <input
                    type="text"
                    placeholder="Ej: Teclado Mecánico"
                    name="nombre" // Atributo clave para identificar el input
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Categoria:</label>
                <input
                    type="text"
                    placeholder="Ej: Teclado Mecánico"
                    name="categoria" // Atributo clave para identificar el input
                    value={datosForm.categoria}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Precio: $</label>
                <input
                    type="number"
                    placeholder="Ej: 95"
                    name="precio" // Atributo clave
                    value={datosForm.precio}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    placeholder="Ej: 5"
                    name="stock" // Atributo clave
                    value={datosForm.stock}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Imagen:</label>
                <input
                    type="file"
                    placeholder="https://..."
                    name="imagen" // Atributo clave
                    onChange={manejarCambioImagen}
                />
                {modoEdicion && datosForm.imagen && (
                    <div>
                        <p>Imagen actual:</p>
                        <img src={datosForm.imagen} alt="Vista previa" style={{ width: '100px' }} />
                    </div>
                )}
            </div>




            <button type="submit">{modoEdicion ? 'Actualizar Producto' : 'Guardar Producto'}</button>


        </form>
    );
}
