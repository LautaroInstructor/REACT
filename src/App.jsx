// /src/App.jsx 
import './App.css';
import { ItemListContainer } from './componentes/ItemListContainer/ItemListContainer';
import { Contador } from './componentes/Contador/Contador'
import Productos from './componentes/Productos/Productos';
import { FormularioContainer } from './componentes/FormularioContainer/FormularioContainer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// En src/App.jsx
import Layout from './componentes/layout/Layout';
import ProductoDetalle from './componentes/Productos/ProductoDetalle';
import Cart from './componentes/Cart/cart';
import ProductosNacionales from './componentes/ProductosNacionales/ProductosNacionales';
import ProductosNacionalesDetalle from './componentes/ProductosNacionales/ProductosNacionalesDetalle';
import Gestion from './componentes/Gestion/Gestion';
import Login from './componentes/Login/Login';
import Registro from './componentes/Login/Registro';
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute';
import Inicio from './componentes/Inicio/Inicio'
// En /src/index.js o /src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchProvider } from "./context/SearchContext";
function App() {
  return (
    <>
    <SearchProvider>
      <Routes>
        {/* Ruta que envuelve a las demás para mostrar Header y Footer siempre */}
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio /> }/>
          <Route path="/productos" element={<ItemListContainer Mensaje={"Productos"} />} />
          <Route path="/destacados" element={<Productos Mensaje={"Destacados"} />} />
          {/* ... dentro de <Routes> */}
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Cart />} /> {/* AÑADIMOS LA NUEVA RUTA */}
          <Route path="/productos-nacionales" element={<ProductosNacionales />} />
          {/* /src/App.jsx  */}
          <Route path="/productos-nacionales/:id" element={<ProductosNacionalesDetalle />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/alta"
            element={
              <ProtectedRoute rolesPermitidos={['admin']}>
                <Gestion />
              </ProtectedRoute>
            }
          />
          <Route path="/registro" element={<Registro />} />
        </Route>
      </Routes>
      </SearchProvider>
    </>
  );
}

export default App;
