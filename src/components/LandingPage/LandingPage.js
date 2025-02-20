import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import github from '../../assets/icons/github_2504911.png';
import instagram from '../../assets/icons/instagram_2504918.png';
import linkedin from '../../assets/icons/linkedin_2504923.png';
import './LandingPage.css'


function Home() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            console.log('Fetching auth status...');
            try {
                const response = await fetch('http://localhost:5000/auth/session', {
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

    const getStarted = () => {
        isAuthenticated ? navigate('/') : navigate('/login');
    };

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
            <div className='cta'>
                <div className='supporting'>
                    <p>Collaborative</p>
                    <p>Seamless</p>
                    <p>User friendly</p>
                </div>
                <div className='get-started-button'>
                    <button onClick={() => getStarted()}>Get started</button>
                </div>
            </div>
            <div className='socials'>
                <a href='www.github.com/gitXite' target='_blank' rel='noopener noreferrer'>
                    <img src={github}></img>
                </a>
                <a href='www.instagram.com/daniel_halaas' target='_blank' rel='noopener noreferrer'>
                    <img src={instagram}></img>
                </a>
                <a href='www.linkedin.com' target='_blank' rel='noopener noreferrer'>
                    <img src={linkedin}></img>
                </a>
            </div>
        </div>
    );
}


export default Home;