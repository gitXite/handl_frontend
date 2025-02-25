import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';

import logoutImage from '@assets/icons/logout_16dp_000000_FILL0_wght400_GRAD0_opsz20.png';
import './Header.css';


function Header({ resetForm }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const fetchAuthStatus = async () => {
        console.log('Fetching auth status...');
        try {
            const { data } = await axios.get('http://localhost:5000/api/auth/get-session', {
                withCredentials: true
            });

            console.log('Parsed JSON:', data);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data || error.message);
                throw new Error(error.response?.data?.message || 'Failed to fetch authentication status');
            }
            throw error;
        }
    };

    const { data } = useQuery({
        queryKey: ['authStatus'],
        queryFn: fetchAuthStatus
    });

    // set isAuthenticated when data updates
    useEffect(() => {
        if (data) {
            setIsAuthenticated(data.isAuthenticated);
        }
    }, [data]);

    // Used for hamburger menu animation
    useEffect(() => {
        setOpen(false);
    }, [location]);
    
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
                withCredentials: true,
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
                            <img src={logoutImage} alt='Logout' />
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
