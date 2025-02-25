import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import Header from '@components/Header/Header';
import LandingPage from '@components/LandingPage/LandingPage';
import LoginSignup from '@components/LoginSignup/LoginSignup';
import Footer from '@components/Footer/Footer';
import About from '@components/About/About';
import Contact from '@components/Contact/Contact';
import Lists from '@components/Lists/Lists';


function App() {
    const [formResetTrigger, setFormResetTrigger] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const queryClient = new QueryClient();
    const location = useLocation();
    const prevLocationRef = useRef(null);

    const resetForm = () => {
        setFormResetTrigger(prev => !prev);
    };

    useEffect (() => {
        if (prevLocationRef.current !== location.pathname) {
            setIsInitialLoad(false);
        }
        prevLocationRef.current = location.pathname;
    }, [location]);
    
    const isLoginOrSignup = location.pathname === '/login' || location.pathname === '/register';

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Header resetForm={resetForm} />
                <AnimatePresence mode='sync'>
                    <motion.div
                        className='page-fade'
                        key={location.pathname}
                        initial={{ opacity: isLoginOrSignup && isInitialLoad ? 0 : 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: isLoginOrSignup && isInitialLoad ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Routes location={location} key={location.pathname}>
                            <Route path='/' element={<LandingPage />} />
                            <Route path='/login' element={<LoginSignup isSignUp={false} formResetTrigger={formResetTrigger} />} />
                            <Route path='/register' element={<LoginSignup isSignUp={true} formResetTrigger={formResetTrigger} />} />
                            <Route path='/lists' element={<Lists />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/contact' element={<Contact />} />
                        </Routes>
                    </motion.div>
                </AnimatePresence>
                <Footer />
            </Router>
        </QueryClientProvider>
    );
}


export default App;
