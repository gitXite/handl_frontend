import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';


function LoginSignup() {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        loginPassword: ''
    });

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

    const toggleSignUp = (signUp) => {
        setIsSignUp(signUp);
        resetForm();
        setPasswordError('');
    };

    const handleSubmit = async (e, isSignUp) => {
        e.preventDefault();

        if (isSignUp && formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        setLoginError('');
        setPasswordError('');
        const endpoint = isSignUp ? 'register' : 'login';
        const body = isSignUp
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.loginPassword };

        try {
            const response = await fetch(`http://localhost:5000/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const result = await response.json();

            if (response.ok) {
                console.log(`${isSignUp ? 'Sign-Up' : 'Login'} successful`, result);
                
                if (isSignUp) {
                    navigate('/login');
                } else {
                    navigate('/');
                }
            } else {
                if (result.message) {
                    if (isSignUp) {
                        setPasswordError(result.message);
                    } else {
                        if (result.message === 'Invalid email or password') {
                            setLoginError('Invalid email or password');
                        } else {
                            setLoginError(result.message);
                        }
                    }
                } else {
                    if (isSignUp) {
                        setPasswordError('An error occurred. Please try again');
                    } else {
                        setLoginError('An error occurred. Please try again');
                    }
                }
            }
        } catch (error) {
            if (isSignUp) {
                setPasswordError('An error occurred. Please try again.');
            } else {
                setLoginError('An error occurred. Please try again.');
            }
            console.error(error);
        }
    };
    
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
                    {passwordError && <p className='error-text-signup'>{passwordError}</p>}
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
                    {loginError && <p className='error-text-signin'>{loginError}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
                            
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome back!</h1>
                        <p>Already have an account?</p>
                        <button className="ghost" onClick={() => toggleSignUp(false)}>Login</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>New here?</h1>
                        <p>Create an account by signing up!</p>
                        <button className="ghost" onClick={() => toggleSignUp(true)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
