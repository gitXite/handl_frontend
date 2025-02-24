import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
    const queryClient = new QueryClient();

    const resetForm = () => {
        setFormResetTrigger(prev => !prev);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <AnimatePresence mode='sync'>
                    <Header resetForm={resetForm} />
                    <Routes>
                        <Route path='/' element={
                            <motion.div
                                className='page-fade'
                                key='landing'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <LandingPage />
                            </motion.div>
                        } />
                        <Route path='/login' element={
                            <motion.div
                                className='page-fade'
                                key='login'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <LoginSignup isSignUp={false} formResetTrigger={formResetTrigger} />
                            </motion.div>
                        } />
                        <Route path='/register' element={
                            <motion.div
                                className='page-fade'
                                key='login'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <LoginSignup isSignUp={true} formResetTrigger={formResetTrigger} />
                            </motion.div>
                        } />
                        <Route path='/lists' element={
                            <motion.div
                                className='page-fade'
                                key='lists'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Lists />
                            </motion.div>
                        } />
                        <Route path='/about' element={
                            <motion.div
                                className='page-fade'
                                key='about'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <About />
                            </motion.div>
                        } />
                        <Route path='/contact' element={
                            <motion.div
                                className='page-fade'
                                key='contact'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Contact />
                            </motion.div>
                        } />
                    </Routes>
                    <Footer />
                </AnimatePresence>
            </Router>
        </QueryClientProvider>
    );
}


export default App;
