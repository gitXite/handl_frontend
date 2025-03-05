import React from 'react';

import './PasswordRequirement.css';


function PasswordRequirement({ passwordErrors }) {
    return (
        <div className='password-tooltip'>
            <p>Password must contain:</p>
            <ul className='password-requirements'>
                <li style={{ color: passwordErrors.minLength ? 'green' : 'red' }}>
                    Atleast 8 characters
                </li>
                <li style={{ color: passwordErrors.hasUpperCase ? 'green' : 'red' }}>
                    One uppercase letter
                </li>
                <li style={{ color: passwordErrors.hasLowerCase ? 'green' : 'red' }}>
                    One lowercase letter
                </li>
                <li style={{ color: passwordErrors.hasNumber ? 'green' : 'red' }}>
                    One number
                </li>
                <li style={{ color: passwordErrors.hasSpecialChar ? 'green' : 'red' }}>
                    One special character
                </li>
            </ul>
        </div>
    );
}


export default PasswordRequirement;
