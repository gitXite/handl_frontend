import React from 'react';
import './Header.css';


function Header() {
    return (
        <header>
            <div className='logo'>
                <h1>HANDL</h1>
            </div>
            <div className='nav'>
                <a href='/'>Home</a>
                <a>Placeholder</a>
            </div>
        </header>
    );
}


export default Header;