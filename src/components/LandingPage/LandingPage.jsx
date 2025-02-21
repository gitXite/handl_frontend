import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import github from '@assets/icons/github_2504911.png';
import instagram from '@assets/icons/instagram_2504918.png';
import linkedin from '@assets/icons/linkedin_2504923.png';
import './LandingPage.css'


function Home() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchAuthStatus = async () => {
        console.log('Fetching auth status...');

        try {
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

    const getStarted = () => {
        isAuthenticated ? navigate('/lists') : navigate('/login');
    };

    return (
        <div className='hero-section'>
            <div className='heading'>
                <h1 className='welcome-to'>Welcome to</h1>
                <h1 className='handl'>HANDL</h1>
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
                <a href='https://www.github.com/gitXite' target='_blank' rel='noopener noreferrer'>
                    <img src={github}></img>
                </a>
                <a href='https://www.instagram.com/daniel_halaas' target='_blank' rel='noopener noreferrer'>
                    <img src={instagram}></img>
                </a>
                <a href='https://www.linkedin.com/in/daniel-halås-b00363352' target='_blank' rel='noopener noreferrer'>
                    <img src={linkedin}></img>
                </a>
            </div>
        </div>
    );
}


export default Home;