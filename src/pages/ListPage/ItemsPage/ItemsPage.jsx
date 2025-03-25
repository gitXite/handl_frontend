import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip, Zoom } from '@mui/material';

import ItemCard from '@components/ItemCard/ItemCard';
import { Plus, ChartNoAxesGantt, RefreshCcw } from 'lucide-react';
import MotionWrapper from '@components/MotionWrapper';
import api from '@utils/api';
import './Items.css';
import { useSSE } from '../../../hooks/useSSE';


function ItemsPage() {
    const { listId } = useParams();
    const [listName, setListName] = useState('');
    const [items, setItems] = useState([]);
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

    // Handle SSE updates
    const handleSSEUpdate = (sseData) => {
        if (sseData.listId !== listId) return;

        setItems((prevItems) => {
            switch (sseData.type) {
                case 'ITEM_ADDED':
                    return [...prevItems, sseData.item];
                case 'ITEM_UPDATED':
                    return prevItems.map((item) =>
                        item.id === sseData.item.id ? sseData.item : item
                case 'ITEM_DELETED':
                    return prevItems.filter((item) => item.id !== sseData.item.id);
                default:
                    return prevItems;
            }
        });
    };

    useSSE(handleSSEUpdate);
    
    return (
        <div className='items-container'>
            <div className='items-subcontainer'>
                <div className='list-header'>
                    <h1>{listName}</h1>
                </div>
                <div className='manage-items'>
                    <MotionWrapper transition={{ delay: 0.0 }}>
                        <Tooltip 
                            title='New item'
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
                            <button>
                                <RefreshCcw size={25} />
                            </button>
                        </Tooltip>
                    </MotionWrapper>
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
                            <ItemCard item={item} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}


export default ItemsPage;
