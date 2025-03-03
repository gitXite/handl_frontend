import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@utils/api';

import './ConfirmEmail.css';


function ConfirmEmail() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('Confirming...');
    const [isValid, setIsValid] = useState(false);
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            setMessage('Invalid confirmation link');
            setIsValid(false);
        }

        const confirmEmail = async () => {
            try {
                const { data } = await api.get('/api/auth/confirm-email', { params: { token } });
                setMessage(data.message || 'Email confirmed!');
                setIsValid(true);
            } catch (error) {
                console.error(error);
                setMessage('Error confirming email.');
                setIsValid(false);
            }
        };

        confirmEmail();
    }, []);
    
    return (
        <div>
            <p>{message}</p>
            {isValid ? navigate('/login') : navigate('/')}
        </div>
    );
}


export default ConfirmEmail;
