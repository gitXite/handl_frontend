import React, {createContext, useEffect, useState } from 'react';
import api from '@utils/api';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    useEffect(() => {
        const checkSession = async () => {
            try {
                const result = await api.get('/api/auth/session');
                const isAuthenticated = result.isAuthenticated || false;
                setIsAuthenticated(isAuthenticated);
                localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
            } catch (error) {
                console.error('Error fetching session:', error.message);
                setIsAuthenticated(false);
                localStorage.removeItem('isAuthenticated');
            }
        };

        checkSession();
    }, []);

    const value = {
        isAuthenticated,
        setIsAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>
};
