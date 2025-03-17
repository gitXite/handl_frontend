import MotionWrapper from '@components/MotionWrapper';
import { useHotkeys } from 'react-hotkeys-hook';

import './DeleteModal.css';


function DeleteModal({ message, onCancel, onConfirm }) {
    useHotkeys('enter', onConfirm);
    useHotkeys('escape', onCancel);

    return (
        <MotionWrapper className={'modal-overlay'}>
            <div className='modal'>
                <p>{message}</p>
                <div className='modal-actions'>
                    <button className='confirm' onClick={onConfirm}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </MotionWrapper>
    );
}


export default DeleteModal;