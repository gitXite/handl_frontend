import React from 'react';

import './Redirect.css';


function Redirect({ message, isLoading }) {
    return (
        <div className='redirect-container'>
            <div className='redirect-text'>
                <i className='redirect-message'>{message}</i>
                <i className='redirecting'>Redirecting...</i>
            </div>
            <div className='redirect-loader'>
                {isLoading ? <div className='login-loading'><span>.</span><span>.</span><span>.</span></div> : null}
            </div>
        </div>
    );
}


export default Redirect;