import React from 'react';

import MotionWrapper from '@components/MotionWrapper';

import './AboutPage.css';


function About() {
    return (
        <div className='about-container'>
            <div className='about-header'>
                <h1>About HANDL</h1>
            </div>
            <MotionWrapper className={'fade-desc'} transition={{ delay: 0.0 }}>
                <p className='about-p'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Culpa, dolorum eius alias explicabo laborum facere harum adipisci ratione suscipit libero possimus voluptatem minus asperiores similique eligendi in assumenda. 
                    Cumque, sunt?
                </p>
            </MotionWrapper>
            <MotionWrapper className={'fade-desc'} transition={{ delay: 0.2 }}>
                <p className='about-p'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Culpa, dolorum eius alias explicabo laborum facere harum adipisci ratione suscipit libero possimus voluptatem minus asperiores similique eligendi in assumenda. 
                    Cumque, sunt?
                </p>
            </MotionWrapper>
            <MotionWrapper className={'fade-desc'} transition={{ delay: 0.4 }}>
                <p className='about-p'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Culpa, dolorum eius alias explicabo laborum facere harum adipisci ratione suscipit libero possimus voluptatem minus asperiores similique eligendi in assumenda. 
                    Cumque, sunt?
                </p>
            </MotionWrapper>
        </div>
    );
}


export default About;
