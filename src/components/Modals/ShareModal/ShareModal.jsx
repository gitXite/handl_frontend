import { useState } from 'react';
import MotionWrapper from '@components/MotionWrapper';
import { useHotkeys } from 'react-hotkeys-hook';

import { handleChange } from '@utils/handleFunctions';

import './ShareModal.css';
import { duration } from '@mui/material';


function ShareModal({ message, onCancel, onConfirm }) {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [notice, setNotice] = useState('');
    
    const handleConfirm = (e) => {
        e.preventDefault();
        
        const email = formData.email;
        if (!email) {
            setNotice('Please enter a valid email')
            return;
        }
        onConfirm(email);
    };

    useHotkeys('enter', handleConfirm);
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
                    <button className='share' onClick={handleConfirm}>Share</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </MotionWrapper>
    );
}


export default ShareModal;
