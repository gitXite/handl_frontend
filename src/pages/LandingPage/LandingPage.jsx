import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from '../../axiosConfig';

import MotionWrapper from '@components/MotionWrapper';

import github from '@assets/icons/github_2504911.png';
import instagram from '@assets/icons/instagram_2504918.png';
import linkedin from '@assets/icons/linkedin_2504923.png';
import './LandingPage.css'


function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // API call
        const fetchSession = async () => {
            console.log('Fetching auth status...');
            try {
                const { data } = await axios.get('/api/auth/get-session');
                console.log('Parsed JSON:', data);
                // Only show landing page if user not authenticated
                if (data?.isAuthenticated) {
                    navigate('/lists');
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios error:', error.response?.data || error.message);
                    throw new Error(error.response?.data?.message || 'Failed to fetch authentication status');
                }
                throw error;
            }
        };

        fetchSession();
    }, [navigate]);

    return (
        <div className='hero-section'>
            <div className='heading'>
                <MotionWrapper className={'fade-heading'} transition={{ delay: 0 }}>
                    <h1 className='welcome-to'>Welcome</h1>
                </MotionWrapper>
                <MotionWrapper className={'fade-heading'} transition={{ delay: 0.1 }}>
                    <h1 className='welcome-to'>to</h1>
                </MotionWrapper>
                <MotionWrapper className={'fade-heading'} transition={{ delay: 0.2 }}>
                    <h1 className='handl'>HANDL</h1>
                </MotionWrapper>
                <div className='sub-heading'>
                    <MotionWrapper className={'fade-heading'} transition={{ delay: 0.3 }}>
                        <h1>Tick off all your boxes</h1>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-heading'} transition={{ delay: 0.4 }}>
                        <h1>with the perfect shopping list</h1>
                    </MotionWrapper>
                </div>
                <div className='socials'>
                    <MotionWrapper className={'fade-heading'} transition={{ delay: 0.5 }}>
                        <a href='https://www.github.com/gitXite' target='_blank' rel='noopener noreferrer'>
                            <img src={github}></img>
                        </a>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-heading'} transition={{ delay: 0.6 }}>
                        <a href='https://www.instagram.com/daniel_halaas' target='_blank' rel='noopener noreferrer'>
                            <img src={instagram}></img>
                        </a>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-heading'} transition={{ delay: 0.7 }}>
                        <a href='https://www.linkedin.com/in/daniel-halås-b00363352' target='_blank' rel='noopener noreferrer'>
                            <img src={linkedin}></img>
                        </a>
                    </MotionWrapper>
                </div>
            </div>
            <div className='cta'>
                <div className='supporting'>
                    <MotionWrapper className={'fade-supporting'} transition={{ delay: 0.4 }}>
                        <p>Collaborative</p>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-supporting'} transition={{ delay: 0.5 }}>
                        <p>Seamless</p>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-supporting'} transition={{ delay: 0.6 }}>
                        <p>User friendly</p>
                    </MotionWrapper>
                </div>
                <div className='get-started-button'>
                    <MotionWrapper className={'fade-supporting'} transition={{ delay: 0.7 }}>
                        <p>Create an account</p>
                        <button onClick={() => navigate('/register')}>Get started</button>
                    </MotionWrapper>
                </div>
            </div>
        </div>
    );
}


export default LandingPage;
