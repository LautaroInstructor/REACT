// src/main.jsx
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'; // 1. Importamos BrowserRouter
import { CartProvider } from './context/CartContext.jsx';
import { AuthContext, AuthProvider } from './context/AuthContext.jsx';
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
      <CartProvider> {/* 2. Envolvemos la App */}
        <App />
      </CartProvider>
    </AuthProvider>

  </BrowserRouter>
)
