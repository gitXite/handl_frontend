import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@utils/api';
import Redirect from '@components/Redirect/Redirect';

import './ConfirmEmail.css';


function ConfirmEmail() {
    const hasConfirmed = useRef(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState('Confirming...');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        if (hasConfirmed.current) return;
        hasConfirmed.current = true;

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            setMessage('Invalid confirmation link');
            setIsLoading(true);
            setTimeout(() => navigate('/'), 3000);
            return;
        }

        const confirmEmail = async () => {
            setIsLoading(true);
            try {
                const result = await api.get('/api/auth/confirm-email', { params: { token } });
                setMessage(result.message || 'Email confirmed!');
                setTimeout(() => navigate('/login'), 2000);
            } catch (error) {
                console.error('Confirm email error:', error.response?.data || error.message);
                setMessage(error.response?.data?.message || 'Error confirming email');
                setTimeout(() => navigate('/'), 3000);
            }
        };

        confirmEmail();
    }, [navigate]);
    
    return (
        <div className='confirm-email-container'>
            <Redirect message={message} isLoading={isLoading} />
        </div>
    );
}


export default ConfirmEmail;
