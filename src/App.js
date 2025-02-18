import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Footer from './components/Footer/Footer';


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/login' element={<LoginSignup />}/>
            </Routes>
            <Footer />
        </Router>
    );
}


export default App;
