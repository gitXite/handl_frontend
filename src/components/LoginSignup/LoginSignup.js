import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginSignup.css';


function LoginSignup({ isSignUp: initialSignUp }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSignUp, setIsSignUp] = useState(initialSignUp);
    const [loginError, setLoginError] = useState('');
    const [signUpError, setSignUpError] = useState('');
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

    // const toggleSignUp = (signUp) => {
    //     setIsSignUp(signUp);
    //     navigate(isSignUp ? '/register' : '/login');
    //     resetForm();
    //     setSignUpError('');
    //     setLoginError('');
    // };

    // Main logic
    const handleSubmit = async (e, isSignUp) => {
        e.preventDefault();

        if (isSignUp && formData.password !== formData.confirmPassword) {
            setSignUpError('Passwords do not match');
            return;
        }

        setLoginError('');
        setSignUpError('');
        const endpoint = isSignUp ? 'register' : 'login';
        const body = isSignUp
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.loginPassword };

        // API call for register/login
        try {
            const response = await fetch(`http://localhost:5000/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const result = await response.json();

            // Redirect on successful sign-in/sign-up
            if (response.ok) {
                console.log(`${isSignUp ? 'Sign-Up' : 'Login'} successful`, result);
                navigate(isSignUp ? '/login' : '/');
                return;
            }

            // Set error message to use in form
            const errorMessage = result.message || 'An error occurred. Please try again.';
            isSignUp ? setSignUpError(errorMessage) : setLoginError(errorMessage);
        } catch (error) {
            console.error(error);
            const defaultError = 'An error occurred. Please try again';
            isSignUp ? setSignUpError(defaultError) : setLoginError(defaultError);
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
                    {signUpError && <p className='error-text-signup'>{signUpError}</p>}
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
                        <button className="ghost" onClick={() => { navigate('/login'); resetForm(); setSignUpError(); }}>Login</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>New here?</h1>
                        <p>Create an account by signing up!</p>
                        <button className="ghost" onClick={() => { navigate('/register'); resetForm(); setLoginError(''); }}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;