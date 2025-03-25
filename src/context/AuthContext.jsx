import React, {createContext, useEffect, useState } from 'react';
import api from '@utils/api';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const checkSession = async () => {
            try {
                const result = await api.get('/api/auth/session');
                const isAuthenticated = result.isAuthenticated || false;
                const user = result.user || null;
                setIsAuthenticated(isAuthenticated);
                setCurrentUser(user);
                localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
                localStorage.setItem('currentUser', JSON.stringify(user));
            } catch (error) {
                console.error('Error fetching session:', error.message);
                setIsAuthenticated(false);
                setCurrentUser(null);
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('currentUser');
            }
        };

        checkSession();
    }, []);

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
