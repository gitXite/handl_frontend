import { useState } from 'react';
import MotionWrapper from '@components/MotionWrapper';
import { useHotkeys } from 'react-hotkeys-hook';

import { handleChange, handleConfirm, handleFocus } from '@utils/handleFunctions';

import './ListModal.css';


function ListModal({ message, onConfirm, onCancel }) {
    const [notice, setNotice] = useState('');
    const [formData, setFormData] = useState({
        name: 'New list'
    });

    useHotkeys('enter', (e) => handleConfirm(e, formData.name, onConfirm, setNotice));
    useHotkeys('escape', onCancel);

    return (
        <MotionWrapper className={'modal-overlay'} transition={{ duration: 0.2 }}>
            <div className='list-modal'>
                <p>{message}</p>
                <form className='modal-form' onSubmit={(e) => {e.preventDefault(); handleConfirm(e, formData.name, onConfirm, setNotice);}}>
                    <div className='modal-field'>
                        <input
                            name='name'
                            type='text'
                            value={formData.name}
                            onChange={(e) => handleChange(e, formData, setFormData)}
                            onFocus={handleFocus}
                            autoFocus
                            required
                        />
                        <label className='form-label' htmlFor='name'>Name</label>
                    </div>
                </form>
                <div className='modal-notice-container'>
                    {notice && (
                        <MotionWrapper className={'modal-fade'} transition={{ duration: 0.2 }}>
                            <i className='modal-notice'>{notice}</i>
                        </MotionWrapper>
                    )}
                </div>
                <div className='modal-actions'>
                    <button className='confirm' type='submit' onClick={(e) => handleConfirm(e, formData.name, onConfirm, setNotice)}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </MotionWrapper>
    );
}


export default ListModal;