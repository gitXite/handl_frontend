import React, {createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await axios.get('/api/auth/get-session');
                const isAuthenticated = data?.isAuthenticated || false;
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