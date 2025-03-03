import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import { useAuth } from '@hooks/useAuth';

import MotionWrapper from '@components/MotionWrapper';
import Redirect from '@components/Redirect/Redirect';

import addWhiteIcon from '@assets/icons/add-white.png';
import deleteIcon from '@assets/icons/delete.png';
import editIcon from '@assets/icons/edit-square.png';
import doneIcon from '@assets/icons/done.png';
import menuIcon from '@assets/icons/menu.png';
import shareIcon from '@assets/icons/share.png';
import './ListPage.css';


function Lists() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('Confirming...');
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    useEffect(() => {
        const fetchAuthStatus = async () => {
            setIsLoading(true);
            console.log('Fetching auth status...');
            try {
                const { data } = await axios.get('/api/auth/get-session');

                console.log('Parsed JSON:', data);
                setIsAuthenticated(data?.isAuthenticated || false);

                if (!isAuthenticated) {
                    setMessage('Unauthorized, please login');
                    setTimeout(() => navigate('/login'), 3000);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios error:', error.response?.data || error.message);
                    throw new Error(error.response?.data?.message || 'Failed to fetch authentication status');
                }
                throw error;
            }
        };

        fetchAuthStatus();
    }, [setIsAuthenticated, navigate]);

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
                <MotionWrapper className={'list-fade'} transition={{ delay: 0.2 }}>
                    <div className='list-card'>
                        <MotionWrapper className={'list-fade'} transition={{ delay: 0.4 }}>
                            <button className='list'>
                                <div className='list-name'>
                                    <p>Groceries</p>
                                </div>
                                <img src={editIcon} />
                            </button>
                        </MotionWrapper>
                            <div className='list-buttons'>
                            <MotionWrapper className={'list-fade'} transition={{ delay: 0.5 }}>
                                <button>
                                    <img src={addWhiteIcon} />
                                </button>
                            </MotionWrapper>
                            <MotionWrapper className={'list-fade'} transition={{ delay: 0.6 }}>
                                <button>
                                    <img src={shareIcon} />
                                </button>
                            </MotionWrapper>
                            <MotionWrapper className={'list-fade'} transition={{ delay: 0.7 }}>
                                <button>
                                    <img src={deleteIcon} />
                                </button>
                            </MotionWrapper>
                        </div>
                    </div>
                </MotionWrapper>
                <MotionWrapper className={'list-fade'} transition={{ delay: 0.4 }}>
                    <div className='list-card'>
                        <MotionWrapper className={'list-fade'} transition={{ delay: 0.6 }}>
                            <button className='list'>
                                <div className='list-name'>
                                    <p>Household</p>
                                </div>
                                <img src={editIcon} />
                            </button>
                        </MotionWrapper>
                            <div className='list-buttons'>
                            <MotionWrapper className={'list-fade'} transition={{ delay: 0.7 }}>
                                <button>
                                    <img src={addWhiteIcon} />
                                </button>
                            </MotionWrapper>
                            <MotionWrapper className={'list-fade'} transition={{ delay: 0.8 }}>
                                <button>
                                    <img src={shareIcon} />
                                </button>
                            </MotionWrapper>
                            <MotionWrapper className={'list-fade'} transition={{ delay: 0.9 }}>
                                <button>
                                    <img src={deleteIcon} />
                                </button>
                            </MotionWrapper>
                        </div>
                    </div>
                </MotionWrapper>
            </div>
        ) : (
            <div className='list-redirect'>
                <Redirect message={message} isLoading={isLoading} />
            </div>
        )
    );
}


export default Lists;
