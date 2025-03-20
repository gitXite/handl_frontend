import { useState } from 'react';
import MotionWrapper from '@components/MotionWrapper';
import { useHotkeys } from 'react-hotkeys-hook';

import { handleChange, handleConfirm } from '@utils/handleFunctions';

import './ShareModal.css';


function ShareModal({ message, onCancel, onConfirm }) {
    const [notice, setNotice] = useState('');
    const [formData, setFormData] = useState({
        email: ''
    });

    useHotkeys('enter', (e) => handleConfirm(e, formData.email, onConfirm, setNotice));
    useHotkeys('escape', onCancel);

    return (
        <MotionWrapper className={'modal-overlay'} transition={{ duration: 0.2 }}>
            <div className='share-modal'>
                <p>{message}</p>
                <form className='modal-form'>
                    <div className='modal-field'>
                        <input
                            name='email'
                            type='email'
                            value={formData.email}
                            onChange={(e) => handleChange(e, formData, setFormData)}
                            required
                        />
                        <label className='form-label' htmlFor='email'>Email</label>
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
                    <button className='share' onClick={(e) => handleConfirm(e, formData.email, onConfirm, setNotice)}>Share</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </MotionWrapper>
    );
}


export default ShareModal;
