import React from 'react';
import { delay, motion } from 'framer-motion';
import './About.css';


function About() {
    return (
        <div className='about-container'>
            <div className='about-header'>
                <h1>About HANDL</h1>
            </div>
            <motion.div
                className='fade-desc'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Culpa, dolorum eius alias explicabo laborum facere harum adipisci ratione suscipit libero possimus voluptatem minus asperiores similique eligendi in assumenda. 
                    Cumque, sunt?
                </p>
            </motion.div>
            <motion.div
                className='fade-desc'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Culpa, dolorum eius alias explicabo laborum facere harum adipisci ratione suscipit libero possimus voluptatem minus asperiores similique eligendi in assumenda. 
                    Cumque, sunt?
                </p>
            </motion.div>
            <motion.div
                className='fade-desc'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Culpa, dolorum eius alias explicabo laborum facere harum adipisci ratione suscipit libero possimus voluptatem minus asperiores similique eligendi in assumenda. 
                    Cumque, sunt?
                </p>
            </motion.div>
        </div>
    );
}


export default About;