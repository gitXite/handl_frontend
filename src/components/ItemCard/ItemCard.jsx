import { useState, useEffect } from 'react';
import { Tooltip, Zoom } from '@mui/material';
import { Trash2 } from 'lucide-react';
import MotionWrapper from '../MotionWrapper';
import './ItemCard.css';


function ItemCard({ item, onModal }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(item.checked);
    }, [item.checked]);
    
    const handleCheckItem = async (listId, itemId) => {
        try {
            const toggledCheck = !isChecked;
            await api.patch(`/api/lists/${listId}/items/${itemId}/check`, { isChecked: toggledCheck });
            setIsChecked(toggledCheck);
        } catch (error) {
            console.error('Failed to set check status:', error);
        }
    };
    
    return (
        <div className='item-card'>
            <MotionWrapper className={'item-fade'} transition={{ delay: 0.2 }}>
                <Tooltip
                    title='Edit item'
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
                    <button className='item' onClick={() => onModal('edit', item.id)}>
                        <div className='item-name'>
                            <p>{item.name}</p>
                        </div>
                    </button>
                </Tooltip>
            </MotionWrapper>
            <div className='item-buttons'>
                <MotionWrapper className={'item-fade'} transition={{ delay: 0.5 }}>
                    <Tooltip
                        title='Check item'
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
                        <div className='check-item'>
                            <input 
                                type="checkbox" 
                                id={`checkbox-${item.id}`} 
                                checked={isChecked} 
                                onChange={() => handleCheckItem(item.list_id, item.id)}
                            />
                            <label htmlFor={`checkbox-${item.id}`}></label>
                        </div>
                    </Tooltip>
                </MotionWrapper>
                <MotionWrapper className={'item-fade'} transition={{ delay: 0.6 }}>
                    <Tooltip
                        title='Delete item'
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
                        <button className='delete-item' onClick={() => onModal('delete', item.id)}>
                            <Trash2 size={25} />
                        </button>
                    </Tooltip>
                </MotionWrapper>
            </div>
        </div>
    );
}


export default ItemCard;
