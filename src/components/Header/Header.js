import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logoutImage from '../../assets/icons/logout_16dp_000000_FILL0_wght400_GRAD0_opsz20.png'


function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/session'),  {
                    method: 'GET', 
                    credentials: 'include',
                });
                const data = await response.json();
                setIsAuthenticated(data.isAuthenticated);
            } catch (error) {
                console.error('Error checking session', error);
            }
        };
        checkAuthStatus();
    }, []);
    
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                setIsAuthenticated(false);
                console.log('Logged out successfully');
                navigate('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Failed to log out:', error.message);
        }
    };

    return (
        <header>
            <div className='logo'>
                <h1>HANDL</h1>
            </div>
            <div className='nav'>
                <a href='/'>Home</a>
                <a href='/'>Placeholder</a>
            </div>
            <div className='auth-button'>
                {isAuthenticated ? (
                    <button className='logout-button' onClick={handleLogout}>
                        <img src={logoutImage} alt='Logout' />
                    </button>
                ) : (
                    <button className='login-button' onClick={() => navigate('/login')}>
                        Login
                    </button>
                )}
            </div>
        </header>
    );
}


export default Header;
