import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useAuth } from '@hooks/useAuth';
import { validatePassword } from '@utils/passwordValidator';
import api from '@utils/api';
import PasswordRequirement from '@components/PasswordRequirement/PasswordRequirement';

import './AuthPage.css';
import { transform } from 'motion';


function AuthPage({ isSignUp: initialSignUp, formResetTrigger }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(initialSignUp);
    const [passwordErrors, setPasswordErrors] = useState({});
    const [userError, setUserError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        loginPassword: ''
    });

    // Use formResetTrigger from App.jsx to reset form on Header button clicks
    useEffect(() => {
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            loginPassword: ''
        });
    }, [formResetTrigger]);

    const resetForm = () => setFormData ({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        loginPassword: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});

        if (name === 'password') {
            const validation = validatePassword(value);
            setPasswordErrors(validation.errors);
        }
    };

    // Main logic
    const handleSubmit = async (e, isSignUp) => {
        e.preventDefault();
        
        const validation = validatePassword(formData.password);
        if (isSignUp && !validation.isValid) {
            setUserError('Password does not meet the required criteria.');
            return;
        }
        if (isSignUp && formData.password !== formData.confirmPassword) {
            setUserError('Passwords do not match');
            return;
        }

        setUserError('');
        
        const endpoint = isSignUp ? 'register' : 'login';
        const body = isSignUp
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.loginPassword };

        // API call for register/login
        try {
            setIsLoading(true);
            const result = await api.post(`/api/auth/${endpoint}`, body);

            console.log(`${isSignUp ? 'Sign-Up' : 'Login'} successful`, result);
            if (!isSignUp) {
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/lists');
            } else {
                if (result.message) {
                    navigate('/login');
                    setUserError(result.message);
                }
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            setUserError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Set isSignUp depending on url
    useEffect(() => {
        if (location.pathname === '/register' && !isSignUp) {
            setIsSignUp(true);
        } else if (location.pathname === '/login' && isSignUp) {
            setIsSignUp(false);
        }
    }, [location.pathname, isSignUp]);
    
    return (
        <main>
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
                <div className="form-container sign-up-container">
                    <form onSubmit={(e) => handleSubmit(e, true)}>
                        <h1>Create Account</h1>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Name" 
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange} 
                            required
                        />
                        {isLoading ? <div className='signup-loading'><span>.</span><span>.</span><span>.</span></div> : null}
                        {userError && <p className='error-text-signup'>{userError}</p>}
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                                
                <div className="form-container sign-in-container">
                    <form onSubmit={(e) => handleSubmit(e, false)}>
                        <h1>Login</h1>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                        <input 
                            type="password" 
                            name="loginPassword"
                            placeholder="Password" 
                            value={formData.loginPassword} 
                            onChange={handleChange}
                            required 
                        />
                        <button className='forgot-password' type='button' onClick={() => navigate('/forgot-password')}>Forgot your password?</button>
                        {isLoading ? <div className='login-loading'><span>.</span><span>.</span><span>.</span></div> : null}
                        {userError && <p className='error-text-signin'>{userError}</p>}
                        <button type="submit">Login</button>
                    </form>
                </div>
                                
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome back!</h1>
                            <p>Already have an account?</p>
                            <button className="ghost" onClick={() => { navigate('/login'); resetForm(); setUserError(''); }}>Login</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>New here?</h1>
                            <p>Create an account by signing up!</p>
                            <button className="ghost" onClick={() => { navigate('/register'); resetForm(); setUserError(''); }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence mode='sync'>
                {isSignUp ? (
                    <motion.div
                        initial={{ opacity: 0.7, x: -200 }}
                        animate={{ opacity: 1, x: 10 }}
                        exit={{ opacity: 0.7, x: -200 }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                    >
                        <PasswordRequirement className={'req-list'} passwordErrors={passwordErrors} />
                    </motion.div>
                    ) : null}
            </AnimatePresence>
        </main>
    );
}

export default AuthPage;
