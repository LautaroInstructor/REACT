import React from "react";
// Componente presentacional: solo se encarga de mostrar la info.
function TarjetaUsuario({ nombre, profesion }) {
  return (
    <div>
      <h2>{nombre}</h2>
      <p>{profesion}</p>
    </div>
  );
}

export default TarjetaUsuario; {/*Exportación por default*/}