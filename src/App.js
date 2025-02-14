import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
