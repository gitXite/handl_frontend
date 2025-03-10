import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@utils/api';
import { useAuth } from '@hooks/useAuth';

import MotionWrapper from '@components/MotionWrapper';
import Redirect from '@components/Redirect/Redirect';
import ListCard from '@components/ListCard/ListCard';

import addWhiteIcon from '@assets/icons/add-white.png';
import deleteIcon from '@assets/icons/delete.png';
import editIcon from '@assets/icons/edit-square.png';
import shareIcon from '@assets/icons/share.png';
import doneIcon from '@assets/icons/done.png';
import menuIcon from '@assets/icons/menu.png';
import './ListPage.css';


function Lists() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('Checking auth status...');
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        const fetchAuthStatus = async () => {
            setIsLoading(true);
            console.log('Fetching auth status...');
            try {
                const result = await api.get('/api/auth/session');

                console.log('Parsed JSON:', result);
                setIsAuthenticated(result.isAuthenticated || false);

                if (!isAuthenticated) {
                    setMessage('Unauthorized, please login');
                    setTimeout(() => {
                        if (isMounted.current) {
                            navigate('/login');
                        }
                    }, 2000);
                }
            } catch (error) {
                if (api.isAxiosError(error)) {
                    console.error('Axios error:', error.response?.data || error.message);
                    throw new Error(error.response?.data?.message || 'Failed to fetch authentication status');
                }
                throw error;
            }
        };

        fetchAuthStatus();

        return () => {
            isMounted.current = false;
        };
    }, [setIsAuthenticated, navigate, isAuthenticated]);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);
    
    return (
        isAuthenticated ? (
            <div className='list-container'>
                    <h1 className='your-shopping-lists'>Your shopping lists</h1>
                <div className='manage-lists'>
                    <button>
                        <img src={addWhiteIcon} />
                    </button>
                    <button>
                        <img src={menuIcon} />
                    </button>
                </div>
                <div className='lists'>
                    <MotionWrapper className={'list-fade'} transition={{ delay: 0.2 }}>
                        <ListCard />
                    </MotionWrapper>
                </div>
            </div>
        ) : (
            <div className='list-redirect'>
                <Redirect message={message} isLoading={isLoading} />
            </div>
        )
    );
}


export default Lists;
