import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '@utils/api';
import { useAuth } from '@hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip, Zoom } from '@mui/material';

import ShareModal from '@components/Modals/ShareModal/ShareModal';
import DeleteModal from '@components/Modals/DeleteModal/DeleteModal';
import Redirect from '@components/Redirect/Redirect';
import ListCard from '@components/ListCard/ListCard';

import { Plus, ChartNoAxesGantt } from 'lucide-react';
import './ListPage.css';


function ListPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('Checking auth status...');
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);
    const [showModal, setShowModal] = useState('');

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

    const handleModal = (type, listId) => {
        setSelectedList(listId);
        setShowModal(type);
    };
    const cancelModal = () => {
        setSelectedList(null);
        setShowModal('');
    };

    const addList = async () => {
        const name = prompt('Enter list name:', 'New list');
        if (!name) return;

        try {
            // const result = await api.post('/api/lists', { name });
            // setLists((prevLists) => [...prevLists, result]);
            const fakeResponse = {
                data: { id: Date.now(), name },
            };
            setLists((prevLists) => [...prevLists, fakeResponse.data]);
        } catch (error) {
            console.error('Failed to add list:', error);
        }
    };

    const shareList = async (email) => {
        if (!selectedList) return;

        try {
            // const result = await api.post(`/api/lists/${selectedList}/share`, { email });
            console.log(result.message);
            cancelModal();
        } catch (error) {
            console.error('Failed to share list:', error);
        }
    };
    
    const deleteList = async () => {
        if (!selectedList) return;
        
        try {
            // await api.delete(`/api/lists/${selectedList}`);
            setLists((prevLists) => prevLists.filter((list) => list.id !== selectedList));
            cancelModal();
        } catch (error) {
            console.error('Failed to delete list:', error);
        }
    };
    
    return (
        isAuthenticated ? (
            <div className='list-container'>
                <div className='manage-lists'>
                    <Tooltip 
                        title='New list'
                        disableInteractive
                        slots={{
                            transition: Zoom,
                        }}
                        enterDelay={500}
                        enterNextDelay={500}
                        slotProps={{
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: { offset: [0, -6] },
                                    },
                                ],
                            },
                        }}
                    >
                        <button onClick={addList}>
                            <Plus size={25} />
                        </button>
                    </Tooltip>
                    <Tooltip 
                        title='Manage lists'
                        disableInteractive
                        slots={{
                            transition: Zoom,
                        }}
                        enterDelay={500}
                        enterNextDelay={500}
                        slotProps={{
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: { offset: [0, -6] },
                                    },
                                ],
                            },
                        }}
                    >
                        <button>
                            <ChartNoAxesGantt size={25} />
                        </button>
                    </Tooltip>
                </div>
                <div className='lists'>
                    <AnimatePresence mode='popLayout'>
                        {lists.map((list) => (
                            <motion.div
                                key={list.id}
                                layout
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                                transition={{ duration: 0.1, type: 'spring', stiffness: 500, damping: 25 }}
                            >
                                <ListCard list={list} onModal={handleModal} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {showModal === 'delete' && (
                    <DeleteModal 
                        message='Are you sure you want to delete this list?'
                        onConfirm={deleteList}
                        onCancel={cancelModal}
                    />
                )}

                {showModal === 'share' && (
                    <ShareModal
                        message='Share your list with another user?'
                        onConfirm={shareList}
                        onCancel={cancelModal}
                    />
                )}
            </div>
        ) : (
            <div className='list-redirect'>
                <Redirect message={message} isLoading={isLoading} />
            </div>
        )
    );
}


export default ListPage;
