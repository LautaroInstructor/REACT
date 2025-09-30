// En /componentes/layout/Layout.jsx
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { Outlet } from 'react-router-dom'; // 1. Importamos Outlet
// Este componente define la estructura principal de la página.
// Todo lo que pongamos dentro de <Layout> en App.jsx será el "children".
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Importamos el CSS necesario
function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* 2. Aquí se renderizará el componente de la ruta activa */}
      </main>
      <Footer />
      {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
    </>
  );
};
export default Layout;

