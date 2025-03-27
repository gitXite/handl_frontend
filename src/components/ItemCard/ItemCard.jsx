import { useState, useEffect } from 'react';
import { Tooltip, Zoom } from '@mui/material';
import MotionWrapper from '../MotionWrapper';
import './ItemCard.css';


function ItemCard({ item, onModal }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(item.checked);
    }, [item.checked]);
    
    const handleCheckItem = async (listId, itemId, bool) => {
        setIsChecked(bool);
        try {
            await api.patch(`/api/lists/${listId}/items/${itemId}/check`, { isChecked });
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
        </div>
    );
}


export default ItemCard;
