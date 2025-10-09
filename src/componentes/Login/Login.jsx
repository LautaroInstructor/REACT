// src/components/Login/Login.jsx
import React, { useState } from 'react';
// Importaciones de Firebase Auth
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // PASO 2: Obtener la función de navegación
    const navigate = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth(); // Obtiene la instancia de autenticación
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // El usuario ha iniciado sesión correctamente
            const user = userCredential.user;
            console.log("Usuario logueado:", user);
            alert("¡Inicio de sesión exitoso!");
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error en el login:", errorCode, errorMessage);
            alert("Error: " + errorMessage);
        });
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Ingresar</button>
            </form>
            <p>¿No tenés una cuenta? <Link to="/registro">Registrate aquí</Link></p>
        </div>
    );
};

export default Login;
