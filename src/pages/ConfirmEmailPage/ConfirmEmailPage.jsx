import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';


function ConfirmEmail() {
    const [message, setMessage] = useState('Confirming...');
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            setMessage('Invalid confirmation link');
            return;
        }

        axios
            .get(`/api/auth/confirm-email`, { params: { token } })
            .then((res) => setMessage(res.data.message || 'Email confirmed!'))
            .catch(() => setMessage('Error confirming email.'));
    }, []);
    
    return (
        <h1>{message}</h1>
    );
}


export default ConfirmEmail;
