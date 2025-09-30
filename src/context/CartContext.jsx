// src/context/CartContext.jsx
import React, { useState, useContext, createContext } from 'react';

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, cantidad) => {
        const itemInCart = cart.find(item => item.id === product.id);
        if (itemInCart) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, cantidad: item.cantidad + cantidad }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, cantidad }]);
        }
    };
    
    // NUEVA FUNCIÓN: Obtener la cantidad de un item específico
    const getCantidadActual = (productId) => {
        const item = cart.find(item => item.id === productId);
        return item ? item.cantidad : 0;
    };


    // NUEVA FUNCIÓN: Eliminar un producto del carrito
    const removeItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };
    // NUEVA FUNCIÓN: Verificar si un producto ya está en el carrito
    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };


    const clearCart = () => {
        setCart([]);
    };

    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.cantidad, 0);
    };

    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                getCantidadActual, // <-- Exportamos la nueva función
                addToCart,
                removeItem, // <-- Exportamos la nueva función
                clearCart,
                isInCart, // <-- Exportamos la nueva función
                getCartQuantity,
                getCartTotal
            }}
        >
            {children}
        </CartContext.Provider>

    );
};
