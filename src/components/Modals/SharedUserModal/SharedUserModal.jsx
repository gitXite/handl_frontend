import { useState } from 'react';
import MotionWrapper from '@components/MotionWrapper';
import { useHotkeys } from 'react-hotkeys-hook';

import { handleConfirm } from '@utils/handleFunctions';

import './SharedUserModal.css';


function SharedUserModal({ message, onCancel, onConfirm, onRemove }) {
    const [notice, setNotice] = useState('');
    const [sharedUsers, setSharedUsers] = useState([]);

    useHotkeys('enter', onRemove);
    useHotkeys('escape', onCancel);

    return (
        <MotionWrapper className={'modal-overlay'} transition={{ duration: 0.2 }}>
            <div className='shared-user-modal'>
                <p>{message}</p>
                <div className='modal-notice-container'>
                    {notice && (
                        <MotionWrapper className={'modal-fade'} transition={{ duration: 0.2 }}>
                            <i className='modal-notice'>{notice}</i>
                        </MotionWrapper>
                    )}
                </div>
                <div className='modal-actions'>
                    <button onClick={onCancel}>Back</button>
                </div>
            </div>
        </MotionWrapper>
    );
}


export default SharedUserModal;
