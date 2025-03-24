import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip, Zoom } from '@mui/material';

import ItemCard from '@components/ItemCard/ItemCard';
import { Plus, ChartNoAxesGantt, RefreshCcw } from 'lucide-react';
import MotionWrapper from '@components/MotionWrapper';
import { useList } from '../../../hooks/useList';
import api from '@utils/api';
import './Items.css';


function ItemsPage() {
    const { listName } = useList();
    const { listId } = useParams();
    const queryClient = useQueryClient();

    const getListItems = async ()  => {
        try {
            const items = await api.get(`/api/lists/${listId}/items`);
            return items;
        } catch (error) {
            console.error('Error retrieving items:', error);
            return [];
        }
    };

    const { data: items = [] } = useQuery({
        queryKey: ['item'],
        queryFn: getListItems,
    });
    
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
