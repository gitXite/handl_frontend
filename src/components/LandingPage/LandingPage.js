import React from 'react';
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'


function Home() {
    const navigate = useNavigate();

    return (
        <div className='hero-section'>
            <div className='heading'>
                <h1>Welcome to</h1>
                <h1>HANDL</h1>
                <div className='sub-heading'>
                    <h1>Tick off all your boxes</h1>
                    <h1>with the perfect shopping list</h1>
                </div>
            </div>
            <div className='supporting'>
                <p>Collaborative</p>
                <p>Seamless</p>
                <p>User friendly</p>
            </div>
        </div>
    );
}


export default Home;