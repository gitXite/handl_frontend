import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '@utils/api';
import { useAuth } from '@hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';

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
    const [lists, setLists] = useState([]);

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

    useEffect(() => {
        axios.get('/lists').then((res) => {
            setLists(res.data);
        });
    }, []);

    const addList = async () => {
        const name = prompt('Enter list name');
        if (!name) return;

        try {
            const result = await axios.post('/lists', { name });
            setLists((prevLists) => [...prevLists, res.data]);
        } catch (error) {
            console.error('Failed to add list:', error);
        }
    };

    const deleteList = async (id) => {
        try {
            await axios.delete(`/lists/${id}`);
            setLists((prevLists) => prevLists.filter((list) => list.id !== id));
        } catch (error) {
            console.error('Failed to delete list:', error);
        }
    };
    
    return (
        isAuthenticated ? (
            <div className='list-container'>
                    <h1 className='your-shopping-lists'>Your shopping lists</h1>
                <div className='manage-lists'>
                    <button onCLick={addList}>
                        <img src={addWhiteIcon} alt='Add list'/>
                    </button>
                    <button>
                        <img src={menuIcon} alt='Manage lists' />
                    </button>
                </div>
                <div className='lists'>
                    <AnimatePresence>
                        {lists.map((list) => (
                            <motion.div
                                key={list.id}
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            >
                                <ListCard list={list} onDelete={deleteList} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
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
