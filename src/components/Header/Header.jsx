import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../axiosConfig';
import { AnimatePresence, motion } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import { useAuth } from '../../hooks/useAuth';

import logoutImage from '@assets/icons/logout.png';
import './Header.css';


function Header({ resetForm }) {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchAuthStatus = async () => {
            console.log('Fetching auth status...');
            try {
                const { data } = await axios.get('/api/auth/get-session');

                console.log('Parsed JSON:', data);
                setIsAuthenticated(data?.isAuthenticated || false);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios error:', error.response?.data || error.message);
                    throw new Error(error.response?.data?.message || 'Failed to fetch authentication status');
                }
                throw error;
            }
        };

        fetchAuthStatus();
    }, [setIsAuthenticated]);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    // Used for hamburger menu animation
    useEffect(() => {
        setOpen(false);
    }, [location]);
    
    const handleLogout = async () => {
        try {
            const response = await axios.post('/api/auth/logout', {}, {
                headers: { 'Content-Type': 'application/json' },
            });
            
            setIsAuthenticated(false);
            console.log('Logged out successfully');
            navigate('/login');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error('Logout failed:', errorMessage);
            } else {
                console.error('Failed to log out:', error.message);
            }
        }
    };

    return (
        <header>
            <div className='logo'>
                <h1>HANDL</h1>
            </div>
            <div className='nav'>
                <button className='nav-button' onClick={() => navigate('/')}>Home</button>
                <button className='nav-button' onClick={() => navigate('/lists')}>Shopping Lists</button>
                <div className='hamburger'>
                    <Hamburger 
                        size={24}
                        duration={0.3}
                        toggled={open}
                        toggle={setOpen}
                        color='#333'
                    />
                    <AnimatePresence>
                        {open && <motion.div 
                            className='menu'
                            initial={{ opacity: 0, translateX: -50 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            exit={{ opacity: 0, translateX: -50 }}
                            transition={{ duration: 0.2 }}
                        >
                            <button className='nav-button' onClick={() => navigate('/about')}>About</button>
                            <button className='nav-button' onClick={() => navigate('/contact')}>Contact</button>
                        </motion.div>}
                    </AnimatePresence>
                </div>
            </div>
            <div className='auth-button'>
                {isAuthenticated ? (
                    <>
                        <button className='profile-button' onClick={() => navigate('/profile')}>
                            Profile
                        </button>
                        <button className='logout-button' onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button className='login-button' onClick={() => { navigate('/login'); resetForm(); }}>
                            Login
                        </button>
                        <button className='register-button' onClick={() => { navigate('/register'); resetForm(); }}>
                            Register
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}


export default Header;
