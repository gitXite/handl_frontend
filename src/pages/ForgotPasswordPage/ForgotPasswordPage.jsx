import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MotionWrapper from '../../components/MotionWrapper';
import api from '../../utils/api';

import './ForgotPassword.css';


function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [notice, setNotice] = useState();
    const [formData, setFormData] = useState({
        email: ''
    });

    const resetForm = () => setFormData ({
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotice('');

        const body = {
            email: formData.email
        };

        try {
            setIsLoading(true);
            
            const result = await api.post('/api/password/forgot-password', body);
            console.log(result.message);
            setNotice(result.message);
            
            resetForm();

            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Failed to send reset email:', error);
            
            const errorMessage = error.response?.data?.message || 'An error occured. Please try again.';
            setNotice(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='forgot-password-container'>
            <div className='forgot-password-subcontainer'>
                <h1>Forgot Your Password?</h1>
                <MotionWrapper className={'forgot-password-fade'} transition={{ delay: 0.2 }}>
                    <p>Enter your email to reset password</p>
                </MotionWrapper>
                <form className='forgot-password-form' onSubmit={(e) => handleSubmit(e)}>
                    <MotionWrapper className={'forgot-password-fade'} transition={{ delay: 0.3 }}>
                        <div className='field'>
                            <input 
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                id='email'
                                required
                            />
                                <label className='form-label' htmlFor='email'>Email</label>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'forgot-password-fade'} transition={{ delay: 0.4 }}>
                        {isLoading ? <div className='forgot-password-loading'><span>.</span><span>.</span><span>.</span></div> : null}
                        {notice && <p className='error-text-fg'>{notice}</p>}
                        <button className='forgot-password-submit' type='submit'>Submit</button>
                    </MotionWrapper>
                </form>
            </div>
        </div>
    );
}


export default ForgotPasswordPage;
