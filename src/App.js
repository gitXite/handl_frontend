import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';


function App() {
    return (
        <Fragment>
            <Header />
            <main>
                <LoginSignup />
            </main>
            <Footer />
        </Fragment>
    );
}


export default App;
