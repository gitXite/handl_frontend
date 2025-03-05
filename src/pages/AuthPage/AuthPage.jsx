import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import api from '@utils/api';
import './AuthPage.css';


function AuthPage({ isSignUp: initialSignUp, formResetTrigger }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(initialSignUp);
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
    
    const handleChange = (field) => (e) => {
        setFormData({...formData, [field]: e.target.value});
    };

    // Main logic
    const handleSubmit = async (e, isSignUp) => {
        e.preventDefault();

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
                setUserError(result.message);
                navigate('/login');
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
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
            <div className="form-container sign-up-container">
                <form onSubmit={(e) => handleSubmit(e, true)}>
                    <h1>Create Account</h1>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={formData.name}
                        onChange={handleChange('name')}
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        required
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange('password')}
                        required
                    />
                    <input 
                        type="password" 
                        name="confirm" 
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange('confirmPassword')} 
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
                        placeholder="Email" 
                        value={formData.email}
                        onChange={handleChange('email')}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={formData.loginPassword} 
                        onChange={handleChange('loginPassword')}
                        required 
                    />
                    <a className='forgot-password'>Forgot your password?</a>
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
    );
}

export default AuthPage;
