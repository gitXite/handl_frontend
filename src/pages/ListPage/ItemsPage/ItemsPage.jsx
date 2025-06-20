import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip, Zoom } from '@mui/material';
import { Plus, ChartNoAxesGantt, RefreshCcw, Rss } from 'lucide-react';
import ItemCard from '@components/ItemCard/ItemCard';
import DeleteModal from '@components/Modals/DeleteModal/DeleteModal';
import ItemModal from '@components/Modals/ItemModal/ItemModal';
import MotionWrapper from '@components/MotionWrapper';
import api from '@utils/api';
import { useSSE } from '../../../hooks/useSSE';
import './Items.css';


function ItemsPage() {
    const { listId } = useParams();
    const [listName, setListName] = useState('');
    const [items, setItems] = useState([]);
    const [sharedList, setSharedList] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState('');
    const [modalNotice, setModalNotice] = useState('');
    const queryClient = useQueryClient();

    useEffect(() => {
        const getListName = async () => {
            try {
                const result = await api.get(`/api/lists/${listId}`);
                setListName(result.name);
            } catch (error) {
                console.error('Error retrieving name:', error);
            }
        };

        getListName();
    }, [listId]);

    // Initial API call to get list items
    const getListItems = async ()  => {
        try {
            const items = await api.get(`/api/lists/${listId}/items`);
            return items;
        } catch (error) {
            console.error('Error retrieving items:', error);
            return [];
        }
    };

    const { data: initialItems = [] } = useQuery({
        queryKey: ['item', listId],
        queryFn: getListItems,
        onSuccess: (data) => setItems(data),
    });

    useEffect(() => {
            const getSharedUsers = async () => {
                try {
                    const sharedMap = {};
                    const sharedUsers = await api.get(`/api/lists/${listId}/shared-users`);
                    sharedMap[listId] = {
                        isShared: sharedUsers.length > 0,
                        sharedNumber: sharedUsers.length
                    };
                    setSharedList((prev) => ({
                        ...prev,
                        [listId]: {
                            isShared: sharedUsers.length > 0,
                            sharedNumber: sharedUsers.length
                        }
                    }));
                } catch (error) {
                    console.error('Error retrieving shared users:', error);
                }
            };
    
            getSharedUsers();
        }, [listId]);

    // Handle SSE updates
    const handleSSEUpdate = (sseData) => {
        if (sseData.listId !== listId || !sseData) return;

        setItems((prevItems) => {
            switch (sseData.type) {
                case 'ADD_ITEM':
                    return [...prevItems, sseData.item];
                case 'EDIT_ITEM':
                    return prevItems.map((item) =>
                        item.id === sseData.item.id ? sseData.item : item
                    );
                case 'CHECK_ITEM':
                    return prevItems.map((item) => 
                        item.id === sseData.itemId ? { ...Item, checked: sseData.checkStatus } : item
                    );
                case 'DELETE_ITEM':
                    return prevItems.filter((item) => item.id !== sseData.item.id);
                    
                default:
                    return prevItems;
            }
        });
        setSharedList((prev) => {
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

    // Modals
    const handleModal = (type, itemId) => {
        setSelectedItem(itemId);
        setShowModal(type);
    };

    const cancelModal = () => {
        setSelectedItem(null);
        setShowModal('');
    };

    // Item logic
    const addItem = async (name, quantity) => {
        if (!name || !quantity) return;
        
        try {
            const newItem = await api.post(`/api/lists/${listId}/items`, { name, quantity });
            setItems((prevItems) => [...prevItems, newItem]);
            cancelModal();
        } catch (error) {
            console.error('Failed to add item:', error);
        }
    };

    const editItem = async (name, quantity) => {
        if (!name || !quantity) return;

        try {
            const updatedItem = await api.patch(`/api/lists/${listId}/items/${selectedItem}`, { name, quantity });
            setItems((prevItems) => prevItems.map((item) => item.id === updatedItem.id ? updatedItem : item));
            cancelModal();
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    const deleteItem = async () => {
        if (!selectedItem) return;

        try {
            await api.delete(`/api/lists/${listId}/items/${selectedItem}`);
            setItems((prevItems) => prevItems.filter((item) => item.id !== selectedItem));
            cancelModal();
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const refreshItems = async () => {
        try {
            const items = await api.get(`/api/lists/${listId}/items`);
            setItems(items);
        } catch (error) {
            console.error('Error retrieving items:', error);
        }
    };
    
    return (
        <div className='items-container'>
            <div className='items-subcontainer'>
                <div className='list-header'>
                    <h1>{listName}</h1>
                </div>
                <div className='manage-items'>
                    <MotionWrapper transition={{ delay: 0.0 }}>
                        <Tooltip 
                            title='Add item'
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
                            <button onClick={() => handleModal('add', selectedItem)}>
                                <Plus size={25} />
                            </button>
                        </Tooltip>
                    </MotionWrapper>
                    <MotionWrapper transition={{ delay: 0.1 }}>
                        <Tooltip 
                            title='Manage items'
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
                            title='Refresh items'
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
                            <button onClick={refreshItems}>
                                <RefreshCcw size={25} />
                            </button>
                        </Tooltip>
                    </MotionWrapper>
                    {sharedList[listId]?.isShared && (
                        <MotionWrapper transition={{ delay: 0.3 }}>
                            <Tooltip 
                                title='Shared'
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
                                <div className='list-shared'>
                                    <Rss size={25} color={'#00CF00'} />
                                    <div>{sharedList[listId]?.sharedNumber}</div>
                                </div>
                            </Tooltip>
                        </MotionWrapper>
                    )}
                </div>
            </div>
            <div className='items'>
                <AnimatePresence mode='popLayout'>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100, scale: 0.9 }}
                            transition={{ duration: 0.1, type: 'spring', stiffness: 500, damping: 25 }}
                        >
                            <ItemCard item={item} onModal={handleModal} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {showModal === 'add' && (
                <ItemModal 
                    message='Add an item'
                    onConfirm={addItem}
                    onCancel={cancelModal}
                />
            )}
            {showModal === 'edit' && (
                <ItemModal 
                    message='Edit item'
                    onConfirm={editItem}
                    onCancel={cancelModal}
                />
            )}
            {showModal === 'delete' && (
                <DeleteModal 
                    message='Are you sure you want to delete this item?'
                    onConfirm={deleteItem}
                    onCancel={cancelModal}
                    notice={modalNotice}
                />
            )}
        </div>
    );
}


export default ItemsPage;
