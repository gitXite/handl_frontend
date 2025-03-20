import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { handleChange } from '@utils/handleFunctions';
import MotionWrapper from '@components/MotionWrapper';
import { validatePassword } from '@utils/passwordValidator';
import api from '@utils/api';
import PasswordRequirement from '@components/PasswordRequirement/PasswordRequirement';
import Redirect from '@components/Redirect/Redirect';

import './ResetPassword.css';


function ResetPasswordPage() {
    const navigate = useNavigate();
    const hasValidated = useRef(false);
    const [token, setToken] = useState(null);
    const [passwordErrors, setPasswordErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [notice, setNotice] = useState('');
    const [message, setMessage] = useState('');
    const [isValidated, setIsValidated] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const resetForm = () => setFormData ({
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (hasValidated.current) return;
        hasValidated.current = true;

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log(token);
        if (!token) {
            setMessage('Invalid link');
            setIsLoading(true);
            setTimeout(() => navigate('/'), 2000);
            return;
        }

        const validateResetToken = async () => {
            setIsLoading(true);
            try {
                const result = await api.get('/api/password/reset-password', { params: { token } });
                setMessage(result.message || 'Valid token');
                setIsValidated(true);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to validate reset token:', error.response?.data || error.message);
                setMessage(error.response?.data?.message || 'Error validating reset token');
                setIsValidated(false);
                
                setTimeout(() => navigate('/'), 2000);
            }
        };

        validateResetToken();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validatePassword(formData.password);
        if (!validation.isValid) {
            setNotice('Password does not meet the required criteria.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setNotice('Passwords do not match');
            return;
        }

        setNotice('');
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const body = {
            password: formData.password,
            token
        };
        try {
            setIsLoading(true);

            const result = await api.post('/api/password/reset-password', body);
            console.log(result.message);
            setNotice(result.message);
            resetForm();

            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            console.error('Failed to reset password:', error.response?.data || error.message);
            setNotice('Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        isValidated ? (
            <div className='reset-password-container'>
                <div className='reset-password-subcontainer'>
                    <h1>Reset your password</h1>
                    <MotionWrapper className={'reset-password-fade'} transition={{ delay: 0.2 }}>
                        <p>Enter your new password</p>
                    </MotionWrapper>
                    <form className='reset-password-form' onSubmit={(e) => handleSubmit(e)}>
                        <MotionWrapper className={'reset-password-fade'} transition={{ delay: 0.3 }}>
                            <div className='field'>
                                <input
                                    type='password'
                                    name='password'
                                    value={formData.password}
                                    onChange={(e) => handleChange(e, formData, setFormData, setPasswordErrors)}
                                    required
                                />
                                    <label className='form-label' htmlFor='password'>Password</label>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper className={'reset-password-fade'} transition={{ delay: 0.3 }}>
                            <div className='field'>
                                <input 
                                    type='password'
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleChange(e, formData, setFormData, setPasswordErrors)}
                                    required
                                />
                                    <label className='form-label' htmlFor='confirmPassword'>Confirm Password</label>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper className={'reset-password-fade'} transition={{ delay: 0.4 }}>
                            {isLoading ? <div className='reset-password-loading'><span>.</span><span>.</span><span>.</span></div> : null}
                            {notice && <p className='error-text-rs'>{notice}</p>}
                            <button className='reset-password-submit' type='submit'>Submit</button>
                        </MotionWrapper>
                    </form>
                </div>
                <div className='req-container'>
                    <MotionWrapper className={'reset-password-fade'} transition={{ delay: 0.5 }}>
                        <PasswordRequirement className={'req-list'} passwordErrors={passwordErrors} />
                    </MotionWrapper>
                </div>
            </div>
        ) : (
            <div className='reset-password-redirect'>
                <Redirect message={message} isLoading={isLoading} />
            </div>
        )
    );
}


export default ResetPasswordPage;
