import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MotionWrapper from '@components/MotionWrapper';
import { Tooltip, Zoom } from '@mui/material';
import { Trash2, Share, SquarePlus, Rss } from 'lucide-react';
import editIcon from '@assets/icons/edit-square.png';
import api from '../../utils/api';
import './ListCard.css';


function ListCard({ list, onModal, isShared, sharedNumber, updateSharedState }) {
    const navigate = useNavigate();
    const [newName, setNewName] = useState(list.name);

    // Get initial shared state
    useEffect(() => {
        const getNumberOfSharedUsers = async () => {
            try {
                const sharedUsers = await api.get(`/api/lists/${list.id}/shared-users`);
                updateSharedState(list.id, sharedUsers);
            } catch (error) {
                console.error('Error retrieving number of shared users:', error);
            }
        };

        getNumberOfSharedUsers();
    }, [list.id]);

    // Handle renaming and SSE updates
    useEffect(() => {
        setNewName(list.name);
    }, [list.name]);

    const renameList = async (e, listId) => {
        e.stopPropagation();
        const name = prompt('Rename your list:', newName || list.name);
        
        const body = {
            name: name,
            listId: listId,
        };
        
        if (name && name !== newName) {
            try {
                setNewName(name);
                await api.patch(`/api/lists/${listId}/rename`, body);
            } catch (error) {
                console.error('Failed to update database:', error);
            }
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
                                    renameList(e, list.id);
                                }}
                                onKeyDown={(e) => {
                                    if (e && (e.key === "Enter" || e.key === " ")) {
                                        e.preventDefault();
                                        renameList(e, list.id);
                                    }
                                }}
                            >
                                <img src={editIcon} alt='Rename list'/>
                                <p>{newName}</p>
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
                        <button className='list-add-item' onClick={() => onModal('addItem', list.id)}>
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
                {isShared && (
                    <MotionWrapper className={'list-fade'} transition={{ delay: 0.8 }}>
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
                            <div 
                                role="button"
                                aria-label='shared-users-button'
                                className='list-shared-users'
                                onClick={() => onModal('sharedUsers', list.id)}
                            >
                                <Rss size={25} color={'#00CF00'} />
                                <div>{sharedNumber}</div>
                            </div>
                        </Tooltip>
                    </MotionWrapper>
                )}
            </div>
        </div>
    );
}


export default ListCard;
