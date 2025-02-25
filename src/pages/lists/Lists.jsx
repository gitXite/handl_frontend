import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './Lists.css';


function Lists() {
    const navigate = useNavigate();

    // API call to fetch session
    const fetchSession = async () => {
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

    // Fetch session
    const { data, isError } = useQuery({
        queryKey: ['session'],
        queryFn: fetchSession,
        retry: false
    });

    // If fetchSession fails or data returns false, redirects to /login and returns
    if (isError || !data?.isAuthenticated) {
        navigate('/login');
        return <p>Log in to access</p>;
    }
    
    return (
        <div className='list-container'>
            <h1>Your shopping lists</h1>
        </div>
    );
}


export default Lists;
