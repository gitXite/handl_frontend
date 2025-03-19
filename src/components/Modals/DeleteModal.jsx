import MotionWrapper from '@components/MotionWrapper';
import { useHotkeys } from 'react-hotkeys-hook';

import './DeleteModal.css';


function DeleteModal({ message, onCancel, onConfirm }) {
    const handleConfirm = (e) => {
        e.preventDefault();
        onConfirm();
    };

    useHotkeys('enter', handleConfirm);
    useHotkeys('escape', onCancel);

    return (
        <MotionWrapper className={'modal-overlay'}>
            <div className='delete-modal'>
                <p>{message}</p>
                <div className='modal-actions'>
                    <button className='confirm' onClick={handleConfirm}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </MotionWrapper>
    );
}


export default DeleteModal;
