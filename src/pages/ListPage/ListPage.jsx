import React, { useEffect } from 'react';
import axios from '../../axiosConfig';
import { useAuth } from '@hooks/useAuth';

import ListLogin from '@components/ListLogin/ListLogin';
import MotionWrapper from '@components/MotionWrapper';

import addWhiteIcon from '@assets/icons/add-white.png';
import deleteIcon from '@assets/icons/delete.png';
import editIcon from '@assets/icons/edit-square.png';
import doneIcon from '@assets/icons/done.png';
import menuIcon from '@assets/icons/menu.png';
import shareIcon from '@assets/icons/share.png';
import './ListPage.css';


function Lists() {
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    useEffect(() => {
        const fetchAuthStatus = async () => {
            console.log('Fetching auth status...');
            try {
                const { data } = await axios.get('/api/auth/get-session');

                console.log('Parsed JSON:', data);
                setIsAuthenticated(data?.isAuthenticated || false);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios error:', error.response?.data || error.message);
                    throw new Error(error.response?.data?.message || 'Failed to fetch authentication status');
                }
                throw error;
            }
        };

        fetchAuthStatus();
    }, [setIsAuthenticated]);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    // If fetchSession fails or data returns false
    if (!isAuthenticated) {
        return (
            <div className='unauthorized-lists'>
                <h1 className='login-to-access'>UNAUTHORIZED<br/>Login to access</h1>
                <ListLogin />
            </div>
        );
    }
    
    return (
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
    );
}


export default Lists;
