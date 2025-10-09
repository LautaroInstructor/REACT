import React from 'react';
import { Navbar, Nav, Container, Badge, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.module.css';

function Header() {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm" sticky="top">
      <Container>
        <Navbar.Brand
          style={{ cursor: 'pointer' }}
          onClick={() => handleNavigation('/')}
        >
          Mi Tienda
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/productos">
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/destacados">
              Destacados
            </Nav.Link>
            <Nav.Link as={Link} to="/productos-nacionales">
              Nacionales
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            {/* Carrito con Link directo */}
            <Nav.Item>
              <Link
                to="/carrito"
                className="nav-link position-relative d-flex align-items-center"
                style={{ textDecoration: 'none' }}
              >
                🛒 Carrito
                {totalItems > 0 && (
                  <Badge
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Nav.Item>

            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline-primary"
                  id="dropdown-user"
                  className="d-flex align-items-center"
                >
                  <span className="me-2">¡Hola, {user.email}!</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {user.rol === 'admin' && (
                    <Dropdown.Item onClick={() => handleNavigation('/alta')}>
                      Gestión
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    Cerrar Sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link onClick={() => handleNavigation('/login')}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;