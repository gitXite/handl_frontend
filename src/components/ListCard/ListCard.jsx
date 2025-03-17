import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MotionWrapper from '@components/MotionWrapper';
import { Tooltip, Zoom } from '@mui/material';

import { Trash2, Share, SquarePlus } from 'lucide-react';
import editIcon from '@assets/icons/edit-square.png';

import './ListCard.css';
import api from '../../utils/api';


function ListCard({ list, onDelete }) {
    const navigate = useNavigate();
    const [newName, setNewName] = useState('');

    const renameList = async (e) => {
        e.stopPropagation();
        const name = prompt('Enter new name', newName || list.name);
        if (name) setNewName(name);

        // try {
        //     await api.put('/api/lists', name);
        // } catch (error) {
        //     console.error('Failed to update database:', error);
        // }
    };
    
    return (
        <div className='list-card'>
            <MotionWrapper className={'list-fade'} transition={{ delay: 0.4 }}>
                <button className='list' onClick={() => navigate(`/lists/${list.id}`)}>
                    <div className='list-name'>
                        <Tooltip
                            title='Rename list'
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
                            <button onClick={renameList}>
                                <img src={editIcon} alt='Rename list'/>
                                <p>{newName || list.name}</p>
                            </button>
                        </Tooltip>
                    </div>
                </button>
            </MotionWrapper>
            <div className='list-buttons'>
                <MotionWrapper className={'list-fade'} transition={{ delay: 0.5 }}>
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
                        <button>
                            <SquarePlus size={25} />
                        </button>
                    </Tooltip>
                </MotionWrapper>
                <MotionWrapper className={'list-fade'} transition={{ delay: 0.6 }}>
                    <Tooltip 
                        title='Share list'
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
                            <Share size={25} />
                        </button>
                    </Tooltip>
                </MotionWrapper>
                <MotionWrapper className={'list-fade'} transition={{ delay: 0.7 }}>
                    <Tooltip 
                        title='Delete list'
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
                        <button className='list-delete' onClick={() => onDelete(list.id)}>
                            <Trash2 size={25} />
                        </button>
                    </Tooltip>
                </MotionWrapper>
            </div>
        </div>
    );
}


export default ListCard;
