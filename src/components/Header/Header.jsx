import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import logoutImage from '@assets/icons/logout_16dp_000000_FILL0_wght400_GRAD0_opsz20.png';
import './Header.css';


function Header({ resetForm }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchAuthStatus = async () => {
        try {
            console.log('Fetching auth status...');

            const { data } = await axios.get('http://localhost:5000/auth/session', {
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

    useEffect(() => {
        if (data) {
            setIsAuthenticated(data.isAuthenticated);
        }
    }, [data]);
    
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/auth/logout', {}, {
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
                <a href='/'>Home</a>
                <a href='/about'>About</a>
                <a href='/contact'>Contact</a>
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
