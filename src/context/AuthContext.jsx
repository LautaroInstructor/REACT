// En /context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "firebase/auth";

// 1. Crear el contexto
export const AuthContext = createContext();

// Hook personalizado
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

// 2. Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(); // Obtenemos la instancia de auth una sola vez

    // Función para registrar un nuevo usuario
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Función para iniciar sesión
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Función para cerrar sesión
    const logout = () => {
        signOut(auth);
    };

    useEffect(() => {
        // onAuthStateChanged es el observador de Firebase
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Limpiamos el observador al desmontar
        return () => unsubscribe();
    }, [auth]); // Agregamos 'auth' como dependencia

    // 3. Crear el objeto 'value' con TODAS las funciones definidas
    const value = {
        user,
        loading, // Es buena práctica pasar el estado de carga también
        signup,
        login,   // Ahora 'login' sí existe y se puede pasar
        logout,
    };

    // 4. Retornar el Provider, asegurándonos de no renderizar hasta que cargue
    // Esto evita que los componentes hijos intenten acceder a 'user' mientras es null
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};