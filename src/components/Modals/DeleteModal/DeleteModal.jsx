import React, { useState } from 'react';
import MotionWrapper from '@components/MotionWrapper';
import { useHotkeys } from 'react-hotkeys-hook';

import './DeleteModal.css';


function DeleteModal({ message, onCancel, onConfirm }) {
    const [notice, setNotice] = useState('');
    
    const handleConfirm = (e) => {
        e.preventDefault();
        onConfirm();
    };

    useHotkeys('enter', handleConfirm);
    useHotkeys('escape', onCancel);

    return (
        <MotionWrapper className={'modal-overlay'} transition={{ duration: 0.2 }}>
            <div className='delete-modal'>
                <p>{message}</p>
                <div className='modal-notice-container'>
                    {notice && (
                        <MotionWrapper className={'modal-fade'} transition={{ duration: 0.2 }}>
                            <i className='modal-notice'>{notice}</i>
                        </MotionWrapper>
                    )}
                </div>
                <div className='modal-actions'>
                    <button className='confirm' onClick={handleConfirm}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </MotionWrapper>
    );
}


export default DeleteModal;
