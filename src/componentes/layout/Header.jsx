import styles from './Header.module.css';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import { useCart } from '../../context/CartContext'; // 1. Importamos nuestro custom Hook
import { useAuth } from '../../context/AuthContext'; // Importamos nuestro hook
function Header() {
  const { getCartQuantity } = useCart(); // 2. Usamos el hook para acceder a la función
  const totalItems = getCartQuantity();
  const { user, logout } = useAuth(); // Consumimos el contexto
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          {/* 2. Usamos Link en lugar de <a> y 'to' en lugar de 'href' */}
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/destacados">Destacados</Link></li>
          <li><Link to="/productos-nacionales">Nacionales</Link></li>
          <li><Link to="/carrito">Carrito 🛒 {totalItems > 0 && <span>{totalItems}</span>}</Link></li>
          {/* <li><Link to="/alta">Alta de Productos</Link></li> */}
          {/* Lógica de renderizado condicional */}
          {user ? (
            <>
              <li><Link to="/alta" style={{color:'black'}}>Gestion</Link></li>
              <span>¡Hola, {user.email}!</span>
              <button onClick={logout}>Cerrar Sesión</button>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}

        </ul>
      </nav>
    </header>
  );
};

export default Header;