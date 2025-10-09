import React from "react";
import './TarjetaUsuario.css';

// Componente presentacional: solo se encarga de mostrar la info.
function TarjetaUsuario({ nombre, profesion, avatarUrl, mensaje }) {
  return (
    <div className="tarjeta-usuario">
      <img src={avatarUrl} alt={`Avatar de ${nombre}`} className="tarjeta-avatar" />
      <h2 className="tarjeta-nombre">{nombre}</h2>
      <p className="tarjeta-profesion">{profesion}</p>
      <p className="tarjeta-mensaje">{mensaje}</p>
    </div>
  );
}

export default TarjetaUsuario;