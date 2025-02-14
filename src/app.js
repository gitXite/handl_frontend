import React, { useState } from 'react';
import './App.css';


function App() {
    // toggle between sign-up and login
    const [isSignUp, setIsSignUp] = useState(true);
    // state hooks for form data
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = usestate('');
    const [passwordError, setPasswordError] = useState('');

    // toggle between sign-up and login
    const handleSignUpClick = () => {
        setIsSignUp(true);
    };
    const handleLoginClick = () => {
        setIsSignUp(false);
    };

    // submit handlers
    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match.');
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
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Email"
                        required
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        name="confirm" 
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
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
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <a href="#">Forgot your password?</a>
                    <button>Login</button>
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
        
        <footer>
            <small>Copyright © {new Date().getFullYear()} by Handl. All Rights Reserved.</small>
        </footer>
    );
}

export default App;
