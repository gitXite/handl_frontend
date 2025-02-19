import React from 'react';
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'


function Home() {
    const navigate = useNavigate();

    return (
        <div className='hero-section'>
            <div className='welcome'>
                <h1>Welcome to</h1>
                <h1>HANDL</h1>
                <p>
                    Tick off all your boxes with the perfect shopping list
                </p>
                <p>Collaborative</p>
                <p>Seamless</p>
            </div>
        </div>
    );
}


export default Home;