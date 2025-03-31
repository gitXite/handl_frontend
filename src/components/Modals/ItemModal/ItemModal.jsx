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
    
    useHotkeys('enter', (e) => handleConfirm(e, formData.prop, onConfirm, setNotice));
    useHotkeys('escape', onCancel);

    return(
        <MotionWrapper className={'modal-overlay'} transition={{ duration: 0.2 }}>
            <div className='item-modal'>
                <p>{message}</p>
                <form className='modal-form' onSubmit={(e) => {e.preventDefault(); handleConfirm(e, formData.name, onConfirm, setNotice);}}>
                    <div className='modal-field'>
                        <input
                            name=''
                            type='text'
                            value={formData.prop}
                            onChange={(e) => handleChange(e)}
                            onFocus={handleFocus}
                            autoFocus
                            required
                        />
                        <label className='form-label' htmlFor=''></label>
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
                    <button className='confirm' type='submit' onClick={(e) => handleConfirm(e, formData.prop, onConfirm, setNotice)}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </MotionWrapper>
    );
}


export default ItemModal;