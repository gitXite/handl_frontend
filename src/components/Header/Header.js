import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoutImage from '../../assets/icons/logout_16dp_000000_FILL0_wght400_GRAD0_opsz20.png';
import './Header.css';


function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            console.log('Fetching auth status...');
            try {
                const response = await fetch('http://localhost:5000/auth/session',  {
                    method: 'GET', 
                    credentials: 'include',
                });
                console.log('Response recieved:', response);
                const result = await response.json();
                console.log('Parsed JSON:', result);
                setIsAuthenticated(result.isAuthenticated);
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

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Logout failed', errorData.message);
                return;
            }

            setIsAuthenticated(false);
            console.log('Logged out successfully');
            navigate('/login');
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
                <a href='/'>Placeholder</a>
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
                        <button className='login-button' onClick={() => navigate('/login')}>
                            Login
                        </button>
                        <button className='register-button' onClick={() => navigate('/register')}>
                            Register
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}


export default Header;
