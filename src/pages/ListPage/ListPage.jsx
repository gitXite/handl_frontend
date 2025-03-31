import React, { useEffect, useState, useRef } from 'react';
import { data, useNavigate } from 'react-router-dom';
import api from '@utils/api';
import { useAuth } from '@hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip, Zoom } from '@mui/material';
import { fetchAuthStatus } from '@services/AuthService';
import ListModal from '@components/Modals/ListModal/ListModal';
import ShareModal from '@components/Modals/ShareModal/ShareModal';
import DeleteModal from '@components/Modals/DeleteModal/DeleteModal';
import SharedUserModal from '../../components/Modals/SharedUserModal/SharedUserModal';
import ItemModal from '@components/Modals/ItemModal/ItemModal';
import Redirect from '@components/Redirect/Redirect';
import ListCard from '@components/ListCard/ListCard';
import MotionWrapper from '@components/MotionWrapper';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useSSE } from '@hooks/useSSE';
import { Plus, ChartNoAxesGantt, RefreshCcw } from 'lucide-react';
import './ListPage.css';


function ListPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('Checking auth status...');
    const [isLoading, setIsLoading] = useState(false);
    const [lists, setLists] = useState([]);
    const [sharedLists, setSharedLists] = useState({});
    const [selectedList, setSelectedList] = useState(null);
    const [showModal, setShowModal] = useState('');
    const [modalNotice, setModalNotice] = useState('');
    const { isAuthenticated, setIsAuthenticated, currentUser } = useAuth();
    const isMounted = useRef(true);

    // Check auth and redirect
    useEffect(() => {
        isMounted.current = true;
        fetchAuthStatus(setIsLoading, isAuthenticated, setIsAuthenticated, setMessage, isMounted, navigate);

        return () => {
            isMounted.current = false;
        };
    }, [setIsAuthenticated, navigate, isAuthenticated]);

    // Initial API call to fetch lists
    useEffect(() => {
        api.get('/api/lists').then((res) => {
            setLists(res);
        });
    }, []);

    useEffect(() => {
        const getSharedUsers = async () => {
            try {
                const sharedMap = {};
                for (const list of lists) {
                    const sharedUsers = await api.get(`/api/lists/${list.id}/shared-users`);
                    sharedMap[list.id] = {
                        isShared: sharedUsers.length > 0,
                        sharedNumber: sharedUsers.length
                    };
                }
                setSharedLists(sharedMap);
            } catch (error) {
                console.error('Error retrieving shared users:', error);
            }
        };

        if (lists.length > 0) {
            getSharedUsers();
        }
    }, [lists]);

    const updateSharedState = (listId, newSharedUsers) => {
        setSharedLists(prev => ({
            ...prev,
            [listId]: {
                isShared: newSharedUsers.length > 0,
                sharedNumber : newSharedUsers.length
            }
        }));
    };

    // Handle SSE updates
    const handleSSEUpdate = (sseData) => {
        if (!sseData) return;

        setLists((prevLists) => {
            switch (sseData.type) {
                case 'RENAME_LIST':
                    return prevLists.map((list) => 
                        list.id === sseData.list.id ? { ...list, name: sseData.list.name } : list
                    );
                case 'DELETE_LIST': {
                    return prevLists.filter((list) => list.id !== sseData.list.id);
                }
                case 'REMOVE_USER': {
                    if (Number(sseData.recipientId) === currentUser?.id) {
                        return prevLists.filter((list) => list.id !== sseData.list.id);
                    }
                    return prevLists;
                }
                case 'SHARE_LIST': {
                    const exists = prevLists.some((list) => list.id === sseData.list.id);
                    return exists ? prevLists : [...prevLists, sseData.list];
                }

                default: 
                    return prevLists;
            }
        });
        setSharedLists((prev) => {
            switch (sseData.type) {
                case 'SHARED_USERS_UPDATED': 
                    return {
                        ...prev,
                        [sseData.listId]: {
                            isShared: sseData.sharedNumber > 0,
                            sharedNumber: sseData.sharedNumber
                        }
                    };
                default: 
                    return prev;
                
            }
        });
    };
    useSSE(handleSSEUpdate);

    // Modals and list logic
    const handleModal = (type, listId) => {
        setSelectedList(listId);
        setShowModal(type);
    };
    const cancelModal = () => {
        setSelectedList(null);
        setShowModal('');
    };

    const addList = async (name) => {
        if (!name) return;
        
        try {
            const newList = await api.post('/api/lists', { name });
            setLists((prevLists) => [...prevLists, newList]);
            cancelModal();
        } catch (error) {
            console.error('Failed to add list:', error);
        }
    };

    const shareList = async (email) => {
        if (!selectedList) return;

        try {
            const result = await api.post(`/api/lists/${selectedList}/share`, { email });
            console.log(result.message, result.list);
            cancelModal();
        } catch (error) {
            console.error('Failed to share list:', error);
            setModalNotice('Cannot share a list with yourself');
        }
    };
    
    const deleteList = async () => {
        if (!selectedList) return;
        
        try {
            await api.delete(`/api/lists/${selectedList}`);
            setLists((prevLists) => prevLists.filter((list) => list.id !== selectedList));
            cancelModal();
        } catch (error) {
            console.error('Failed to delete list:', error);
            setModalNotice('Only the owner can delete lists');
        }
    };

    const refreshLists = async () => {
        try {
            const lists = await api.get('/api/lists');
            setLists(lists)
            console.log('Lists:', lists);
        } catch (error) {
            console.error('Failed to fetch lists:', error);
        }
    };

    // Item logic
    const addItem = async (name, quantity) => {
        if (!name || !quantity) return;
            
        try {
            const newItem = await api.post(`/api/lists/${selectedList}/items`, { name, quantity });
            cancelModal();
        } catch (error) {
            console.error('Failed to add item:', error);
        }
    };
    
    return (
        isAuthenticated ? (
            <div className='list-container'>
                <div className='list-subcontainer'>
                    <div className='list-header'>
                        <h1>Shopping Lists</h1>
                    </div>
                    <div className='manage-lists'>
                        <MotionWrapper transition={{ delay: 0.0 }}>
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
                                <button onClick={(e) => handleModal('add', selectedList)}>
                                    <Plus size={25} />
                                </button>
                            </Tooltip>
                        </MotionWrapper>
                        <MotionWrapper transition={{ delay: 0.1 }}>
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
                        </MotionWrapper>
                        <MotionWrapper transition={{ delay: 0.2 }}>
                            <Tooltip 
                                title='Refresh lists'
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
                                <button onClick={refreshLists}>
                                    <RefreshCcw size={25} />
                                </button>
                            </Tooltip>
                        </MotionWrapper>
                    </div>
                </div>
                <div className='lists'>
                    <AnimatePresence mode='popLayout'>
                        <SimpleBar style={{ maxHeight: 650 }}>
                            {lists.map((list) => (
                                <motion.div
                                    key={list.id}
                                    layout
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100, scale: 0.9 }}
                                    transition={{ duration: 0.1, type: 'spring', stiffness: 500, damping: 25 }}
                                >
                                    <ListCard 
                                        list={list} 
                                        onModal={handleModal}
                                        isShared={sharedLists[list.id]?.isShared || false}
                                        sharedNumber={sharedLists[list.id]?.sharedNumber || 0}
                                        updateSharedState={updateSharedState}
                                    />
                                </motion.div>
                            ))}
                        </SimpleBar>
                    </AnimatePresence>
                </div>

                {showModal === 'add' && (
                    <ListModal 
                        message='Add a new list'
                        onConfirm={addList}
                        onCancel={cancelModal}
                    />
                )}
                {showModal === 'share' && (
                    <ShareModal
                        message='Enter recipient email to share your list'
                        onConfirm={shareList}
                        onCancel={cancelModal}
                        modalNotice={modalNotice}
                    />
                )}
                {showModal === 'delete' && (
                    <DeleteModal 
                        message='Are you sure you want to delete this list?'
                        onConfirm={deleteList}
                        onCancel={cancelModal}
                        notice={modalNotice}
                    />
                )}
                {showModal === 'sharedUsers' && (
                    <SharedUserModal 
                        listId={selectedList}
                        message='Shared users for this list'
                        onCancel={cancelModal}
                    />
                )}
                {showModal === 'addItem' && (
                    <ItemModal 
                        message='Add an item'
                        onConfirm={addItem}
                        onCancel={cancelModal}
                        notice={modalNotice}
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
