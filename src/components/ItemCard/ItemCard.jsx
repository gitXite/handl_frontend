import { useState } from 'react';
import MotionWrapper from '../MotionWrapper';
import './ItemCard.css';


function ItemCard({ item, onModal }) {
    const [isChecked, setIsChecked] = useState(false);
    
    const handleCheckItem = async (listId, itemId) => {
        setIsChecked(true);
        try {
            await api.patch(`/api/lists/${listId}/items/${itemId}/check`, { isChecked });
        } catch (error) {
            console.error('Failed to set check status:', error);
        }
    };

    const handleUncheckItem = async (listId, itemId) => {
        setIsChecked(false);
        try {
            await api.patch(`/api/lists/${listId}/items/${itemId}/check`, { isChecked });
        } catch (error) {
            console.error('Failed to set check status:', error);
        }
    };
    
    return (
        <div className='item-card'>
            <MotionWrapper className={'item-fade'}>

            </MotionWrapper>
        </div>
    );
}


export default ItemCard;
