import React, { useState } from 'react';
import './LoginSignup.css';


function LoginSignup() {
    // toggle between sign-up and login
    const [isSignUp, setIsSignUp] = useState(true);
    // state hooks for form data
    const [passwordError, setPasswordError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        loginPassword: ''
    });
    
    const handleChange = (field) => (e) => {
        setFormData({...formData, [field]: e.target.value});
    };

    // toggle between sign-up and login
    const handleSignUpClick = () => {
        setIsSignUp(true);
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordError: '',
            loginPassword: ''
        });
    };
    const handleLoginClick = () => {
        setIsSignUp(false);
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordError: '',
            loginPassword: ''
        });
    };

    // submit handlers
    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        setPasswordError('');
        console.log('Sign-up form submitted');
    };
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Login successful');
    };
    
    return (
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
            {isSignUp ? (
                <div className="form-container sign-up-container">
                <form onSubmit={handleSignUpSubmit}>
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
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        ) : (
            <div className="form-container sign-in-container">
                <form onSubmit={handleLoginSubmit}>
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
                    <a>Forgot your password?</a>
                    <button type="submit">Login</button>
                </form>
            </div>
        )}
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome back!</h1>
                        <p>Already have an account?</p>
                        <button className="ghost" onClick={handleLoginClick}>Login</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>New here?</h1>
                        <p>Create an account by signing up!</p>
                        <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
