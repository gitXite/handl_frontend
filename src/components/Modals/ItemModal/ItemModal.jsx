import { useState } from 'react';
import MotionWrapper from '@components/MotionWrapper';
import { useHotkeys } from 'react-hotkeys-hook';
import { handleConfirm, handleFocus } from '@utils/handleFunctions';
import './ItemModal.css';


function ItemModal({ message, onConfirm, onCancel }) {
    const [notice, setNotice] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        quantity: null,
    });

    const handleChange = () => {};
    
    useHotkeys('enter', (e) => handleConfirm(e, formData, onConfirm, setNotice));
    useHotkeys('escape', onCancel);

    return(
        <MotionWrapper className={'modal-overlay'} transition={{ duration: 0.2 }}>
            <div className='item-modal'>
                <p>{message}</p>
                <form className='modal-form' onSubmit={(e) => {e.preventDefault(); handleConfirm(e, formData, onConfirm, setNotice);}}>
                    <div className='modal-field'>
                        <input
                            name='name'
                            type='text'
                            value={formData.name}
                            onChange={(e) => handleChange(e)}
                            onFocus={handleFocus}
                            autoFocus
                            required
                        />
                        <label className='form-label' htmlFor='name'>Name</label>
                    </div>
                    <div className=''>
                        <input
                            name='quantity'
                            type='number'
                            value={formData.quantity}
                            onChange={(e) => handleChange(e)}
                            onFocus={handleFocus}
                            required
                        />
                        <label className='form-label' htmlFor='quantity'></label>
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
                    <button className='confirm' type='submit' onClick={(e) => handleConfirm(e, formData, onConfirm, setNotice)}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </MotionWrapper>
    );
}


export default ItemModal;