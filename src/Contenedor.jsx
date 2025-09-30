// Componente Contenedor.jsx
function Contenedor({ children }) {
  const estilo = {
    border: "1px solid #ccc",
    padding: "16px",
    margin: "16px 0",
    backgroundColor: "red",
  };

  return <div style={estilo}>{children}</div>;
}

export default Contenedor