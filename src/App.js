import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Footer from './components/Footer/Footer';


function App() {
    const [formResetTrigger, setFormResetTrigger] = useState(false);

    const resetForm = () => {
        setFormResetTrigger(prev => !prev);
    };

    return (
        <Router>
            <Header resetForm={resetForm} />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginSignup isSignUp={false} formResetTrigger={formResetTrigger} />} />
                <Route path='/register' element={<LoginSignup isSignUp={true} formResetTrigger={formResetTrigger} />} />
            </Routes>
            <Footer />
        </Router>
    );
}


export default App;
