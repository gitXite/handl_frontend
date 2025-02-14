import React from 'react';
import './App.css';

function App() {
    return (
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" name="password" placeholder="Password" onchange="onChange()" required />
                    <input type="password" name="confirm" placeholder="Confirm Password" onchange="onChange()" required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>Login</h1>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <a href="#">Forgot your password?</a>
                    <button>Login</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome back!</h1>
                        <p>Already have an account?</p>
                        <button className="ghost" id="logIn">Login</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>New here?</h1>
                        <p>Create an account by signing up!</p>
                        <button className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        <script src="script.js"></script />
        <footer>
            <small>Copyright © <script>document.write(new Date().getFullYear())</script> by Handl. All Rights Reserved.</small>
        </footer>
    );
}

export default App;
