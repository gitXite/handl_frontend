import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@utils/api';

import './ConfirmEmail.css';


function ConfirmEmail() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('Confirming...');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            setMessage('Invalid confirmation link');
            setIsLoading(true);
            setTimeout(() => navigate('/'), 2000);
            return;
        }

        const confirmEmail = async () => {
            setIsLoading(true);
            try {
                const { data } = await api.get('/api/auth/confirm-email', { params: { token } });
                setMessage(data.message || 'Email confirmed!');
                navigate('/login');
            } catch (error) {
                console.error(error);
                setMessage('Error confirming email.');

                setTimeout(() => navigate('/'), 2000);
            } finally {
                setIsLoading(false);
            }
        };

        confirmEmail();
    }, [navigate]);
    
    return (
        <div className='confirm-email-container'>
            <div className='confirm-email-text'>
                <i className='confirm-message'>{message}</i>
                <i className='redirecting'>Redirecting</i>
            </div>
            <div className='confirm-email-loading'>
                {isLoading ? <div className='login-loading'><span>.</span><span>.</span><span>.</span></div> : null}
            </div>
        </div>
    );
}


export default ConfirmEmail;
