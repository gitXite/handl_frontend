import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import { ContextProvider } from './context/ContextProvider';

import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';

import AuthPage from '@pages/AuthPage/AuthPage';
import LandingPage from '@pages/LandingPage/LandingPage';
import ListPage from '@pages/ListPage/ListPage';
import ItemsPage from '@pages/ListPage/ItemsPage/ItemsPage';
import AboutPage from '@pages/AboutPage/AboutPage';
import ContactPage from '@pages/ContactPage/ContactPage';
import ConfirmEmailPage from '@pages/ConfirmEmailPage/ConfirmEmailPage';
import ForgotPasswordPage from '@pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '@pages/ResetPasswordPage/ResetPasswordPage';


const queryClient = new QueryClient();

const MotionWrapper = ({ children, pathname }) => {
    return (
        <motion.div
            className='page-fade'
            key={ pathname }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
            <ContextProvider>
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
                                    <AuthPage isSignUp={false} formResetTrigger={formResetTrigger} />
                                </MotionWrapper>}
                            />
                            <Route path='/register' element={
                                <MotionWrapper pathname='login'>
                                    <AuthPage isSignUp={true} formResetTrigger={formResetTrigger} />
                                </MotionWrapper>} 
                            />
                            <Route path='/lists' element={
                                <MotionWrapper pathname='lists'>
                                    <ListPage />
                                </MotionWrapper>}
                            />
                            <Route path='/lists/:id' element={
                                <MotionWrapper pathname='lists:id'>
                                    <ItemsPage />
                                </MotionWrapper>}
                            />
                            <Route path='/about' element={
                                <MotionWrapper pathname='about'>
                                    <AboutPage />
                                </MotionWrapper>}
                            />
                            <Route path='/contact' element={
                                <MotionWrapper pathname='contact'>
                                    <ContactPage />
                                </MotionWrapper>}
                            />
                            <Route path='/confirm-email' element={
                                <MotionWrapper pathname='confirm-email'>
                                    <ConfirmEmailPage />
                                </MotionWrapper>}
                            />
                            <Route path='/forgot-password' element={
                                <MotionWrapper pathname='forgot-password'>
                                    <ForgotPasswordPage />
                                </MotionWrapper>} 
                            />
                            <Route path='/reset-password' element={
                                <MotionWrapper pathname='reset-password'>
                                    <ResetPasswordPage />
                                </MotionWrapper>} 
                            />
                        </Routes>
                    </AnimatePresence>
                    <Footer />
                </Router>
            </ContextProvider>
        </QueryClientProvider>
    );
}


export default App;
