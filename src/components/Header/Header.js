import React from 'react';
import './Header.css';
import logoutImage from './logout_16dp_000000_FILL0_wght400_GRAD0_opsz20.png'


function Header() {
    const logout = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            if(!response.ok) {
                throw new Error('Logout failed');
            }

            console.log('Logged out successfully', await response.json());
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
            <div className='logout'>
                <button className='logout-button' onClick={logout}>
                    <img src={logoutImage} alt='Logout' />
                </button>
            </div>
        </header>
    );
}


export default Header;
