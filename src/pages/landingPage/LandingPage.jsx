import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';

import github from '@assets/icons/github_2504911.png';
import instagram from '@assets/icons/instagram_2504918.png';
import linkedin from '@assets/icons/linkedin_2504923.png';
import './LandingPage.css'


function Home() {
    const navigate = useNavigate();

    // API call
    const fetchSession = async () => {
        console.log('Fetching auth status...');
        try {
            const { data } = await axios.get('http://localhost:5000/api/auth/get-session', {
                withCredentials: true,
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

    // Bypass landing page, redirect to list-page if session is authenticated
    const { data } = useQuery({
        queryKey: ['session'],
        queryFn: fetchSession,
        retry: false,
        onSuccess: (data) => {
            if (data.isAuthenticated) {
                navigate('/lists');
            }
        }
    });

    return (
        <div className='hero-section'>
            <div className='heading'>
                <h1 className='welcome-to'>Welcome to</h1>
                <h1 className='handl'>HANDL</h1>
                <div className='sub-heading'>
                    <h1>Tick off all your boxes</h1>
                    <h1>with the perfect shopping list</h1>
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
            <div className='cta'>
                <div className='supporting'>
                    <motion.div
                        className='fade-supporting'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0 }}
                    >
                        <p>Collaborative</p>
                    </motion.div>
                    <motion.div
                        className='fade-supporting'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p>Seamless</p>
                    </motion.div>
                    <motion.div
                        className='fade-supporting'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p>User friendly</p>
                    </motion.div>
                </div>
                <div className='get-started-button'>
                    <motion.div
                        className='fade-supporting'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button onClick={() => navigate('/register')}>Get started</button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}


export default Home;
