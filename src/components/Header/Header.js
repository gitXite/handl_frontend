import React from 'react';
import './Header.css';
import logoutImage from './logout_16dp_000000_FILL0_wght400_GRAD0_opsz20.png'


function Header() {
    const logout = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/logout?connect.sid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '',
            });

            const result = await response.json();
            console.log('Logged out', result);
        } catch (error) {
            console.error('Failed to log out');
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
                <a className='logoutImage' onClick={logout}>
                    <img src={logoutImage} alt='Logout'/>
                </a>
            </div>
        </header>
    );
}


export default Header;