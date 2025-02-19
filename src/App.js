import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Footer from './components/Footer/Footer';


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginSignup />}/>
                <Route path='/register' element={<LoginSignup />}/>
            </Routes>
            <Footer />
        </Router>
    );
}


export default App;
