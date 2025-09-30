import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // Mientras se verifica el estado de autenticación, mostramos un mensaje de carga.
    // Esto es crucial para no redirigir al login prematuramente en una recarga de página.
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Si no hay un usuario autenticado, redirigimos a la página de login.
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Si hay un usuario, renderizamos el componente hijo que está siendo protegido.
    return <>{children}</>;
};

export default ProtectedRoute;