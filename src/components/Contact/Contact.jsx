import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';


function Contact() {
    return (
        <div className='contact-container'>
            <div className='contact-left'>
                <h1>Contact Us</h1>
                <motion.div
                    className='fade-contact'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0 }}
                >
                    <p>Feel free to reach out</p>
                </motion.div>
                <motion.div
                    className='fade-contact'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <p>to one of our developers,</p>
                </motion.div>
                <motion.div
                    className='fade-contact'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <p>we want to help</p>
                </motion.div>
            </div>
            <div className='contact-right'>
                <form className='contact-form'>
                    <input type='text' placeholder='Name' required/>
                    <input type='email' placeholder='Email' required/>
                    <input type='text' placeholder='Subject' required/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}


export default Contact;