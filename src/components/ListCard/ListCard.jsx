import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MotionWrapper from '@components/MotionWrapper';
import { Tooltip, Zoom } from '@mui/material';

import { Trash2, Share, SquarePlus } from 'lucide-react';
import editIcon from '@assets/icons/edit-square.png';
import api from '../../utils/api';

import './ListCard.css';


function ListCard({ list, onModal }) {
    const navigate = useNavigate();
    const [newName, setNewName] = useState('');

    const renameList = async (e, listId) => {
        e.stopPropagation();
        const name = prompt('Enter new name:', newName || list.name);
        try {
            if (name) {
                setNewName(name);
                if (newName !== list.name) {
                    // await api.put(`/api/lists/${listId}/rename`, newName);
                }
            }
        } catch (error) {
            console.error('Failed to update database:', error);
        }
    };
    
    return (
        <div className='list-card'>
            <MotionWrapper className={'list-fade'} transition={{ delay: 0.2 }}>
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
                            <div
                                role="button"
                                tabIndex={0}
                                aria-label="Rename list"
                                className="rename-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    renameList(e);
                                }}
                                onKeyDown={(e) => {
                                    if (e && (e.key === "Enter" || e.key === " ")) {
                                        e.preventDefault();
                                        renameList(e);
                                    }
                                }}
                            >
                                <img src={editIcon} alt='Rename list'/>
                                <p>{newName || list.name}</p>
                            </div>
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
                        <button className='list-add-item'>
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
                        <button className='list-share' onClick={() => onModal('share', list.id)}>
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
                        <button className='list-delete' onClick={() => onModal('delete', list.id)}>
                            <Trash2 size={25} />
                        </button>
                    </Tooltip>
                </MotionWrapper>
            </div>
        </div>
    );
}


export default ListCard;
