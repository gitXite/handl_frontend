import React, { Fragment } from 'react';
import './components/LoginSignup/LoginSignup'
import LoginSignup from './components/LoginSignup/LoginSignup';
import Footer from './components/Footer/Footer';


function App() {
    return (
        <Fragment>
            <LoginSignup/> 
            <Footer />
        </Fragment>
    );
}


export default App;
