import TarjetaUsuario from "./componentes/Tarjetas/TarjetaUsuario";
// Componente contenedor: se encarga de la lógica.
export function PerfilDeUsuarioContainer() {
  // 1. 🧠 Acá declararíamos un "estado" para guardar los datos.

  // (Veremos `useState` en la próxima clase, por ahora imaginemos que funciona)
  const usuario = { nombre: "Matias", profesion: "Desarrollador" };

  // 2. 📘 Acá iría la lógica para obtener los datos (ej: una llamada a una API).

  // 3. ✅ Le pasamos los datos al componente presentacional para que los muestre.
  return (
    <TarjetaUsuario nombre={usuario.nombre} profesion={usuario.profesion} />
  );
}

export function PerfilDeUsuario() {
  
  const usuario = { nombre: "Lionel", profesion: "Jugador" };
  return (
    <TarjetaUsuario nombre={usuario.nombre} profesion={usuario.profesion} />
  );
}
