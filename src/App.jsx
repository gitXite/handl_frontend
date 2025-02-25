import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';

import LoginSignup from '@pages/loginSignup/LoginSignup';
import LandingPage from '@pages/landingPage/LandingPage';
import Lists from '@pages/lists/Lists';
import About from '@pages/about/About';
import Contact from '@pages/contact/Contact';


const queryClient = new QueryClient();

const MotionWrapper = ({ children, pathname }) => {
    return (
        <motion.div
            className='page-fade'
            key={ pathname }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

function App() {
    const [formResetTrigger, setFormResetTrigger] = useState(false);

    const resetForm = () => {
        setFormResetTrigger(prev => !prev);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Header resetForm={resetForm} />
                <AnimatePresence mode='sync'>
                    <Routes>
                        <Route path='/' element={
                            <MotionWrapper pathname='/'>
                                <LandingPage />
                            </MotionWrapper>}
                        />
                        <Route path='/login' element={
                            <MotionWrapper pathname='login'>
                                <LoginSignup isSignUp={false} formResetTrigger={formResetTrigger} />
                            </MotionWrapper>}
                        />
                        <Route path='/register' element={
                            <MotionWrapper pathname='login'>
                                <LoginSignup isSignUp={true} formResetTrigger={formResetTrigger} />
                            </MotionWrapper>} 
                        />
                        <Route path='/lists' element={
                            <MotionWrapper pathname='lists'>
                                <Lists />
                            </MotionWrapper>}
                        />
                        <Route path='/about' element={
                            <MotionWrapper pathname='about'>
                                <About />
                            </MotionWrapper>}
                        />
                        <Route path='/contact' element={
                            <MotionWrapper pathname='contact'>
                                <Contact />
                            </MotionWrapper>}
                        />
                    </Routes>
                </AnimatePresence>
                <Footer />
            </Router>
        </QueryClientProvider>
    );
}


export default App;
