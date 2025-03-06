import React from 'react';

import './PasswordRequirement.css';


function PasswordRequirement({ className = '', passwordErrors }) {
    return (
        <div className={`password-tooltip ${className}`}>
            <p>Password must contain:</p>
            <ul className='password-requirements'>
                <li style={{ color: passwordErrors.minLength ? 'green' : 'red' }}>
                    <i>Atleast 8 characters</i>
                </li>
                <li style={{ color: passwordErrors.hasUpperCase ? 'green' : 'red' }}>
                    <i>One uppercase letter</i>
                </li>
                <li style={{ color: passwordErrors.hasLowerCase ? 'green' : 'red' }}>
                    <i>One lowercase letter</i>
                </li>
                <li style={{ color: passwordErrors.hasNumber ? 'green' : 'red' }}>
                    <i>One number</i>
                </li>
                <li style={{ color: passwordErrors.hasSpecialChar ? 'green' : 'red' }}>
                    <i>One special character</i>
                </li>
            </ul>
        </div>
    );
}


export default PasswordRequirement;
