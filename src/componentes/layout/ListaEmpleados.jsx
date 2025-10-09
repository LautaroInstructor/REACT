import React from "react";
import TarjetaUsuario from "../Tarjetas/TarjetaUsuario"; 


function ListaEmpleados({ empleados }) {
  return (
    <div style={{ display: 'flex',flexDirection: 'row'}} >
      {empleados.map((empleado) => (
        <TarjetaUsuario
          key={empleado.id} 
          nombre={empleado.Nombre}
          profesion={empleado.Rol}
          avatarUrl={empleado.Perfil}
          mensaje={empleado.Mensaje}
        />
      ))}
    </div>
  );
}

export default ListaEmpleados;