import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';

import './Lists.css';
import addIcon from '../../assets/icons/add.png';
import addWhiteIcon from '../../assets/icons/add-white.png';
import deleteIcon from '../../assets/icons/delete.png';
import editIcon from '../../assets/icons/edit-square.png';
import doneIcon from '../../assets/icons/done.png';
import menuIcon from '../../assets/icons/menu.png';


const MotionWrapper = ({ className, children, transition = {} }) => {
    return <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ...transition }}
        >
            {children}
        </motion.div>
};

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

    // If fetchSession fails or data returns false
    // if (isError || !data?.isAuthenticated) {
    //     return (
    //         <div className='access-denied'>
    //             <div className='login-lists'>
    //                 <p>Login to access:</p>
    //                 <button onClick={() => navigate('/login')}>Login</button>
    //             </div>
    //         </div>
    //     );
    // }
    
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
                            <img src={editIcon} />
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
                            <img src={editIcon} />
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
