import React from 'react';

import MotionWrapper from '@components/MotionWrapper';

import './AboutPageNew.css';


function AboutPageNew() {
    return (
        <div className='about-container'>
            <MotionWrapper className='about-fade' transition={{ delay: 0 }}>
                <div className='about-header'>
                    <h1>About HANDL</h1>
                </div>
            </MotionWrapper>
            <MotionWrapper className='about-fade' transition={{ delay: 0 }}>
                <div className='about'>
                    <MotionWrapper className='about-fade' transition={{ delay: 0 }}>
                        <strong>What is HANDL?</strong>
                    </MotionWrapper>
                    <MotionWrapper className='about-fade' transition={{ delay: 0 }}>
                        <p>
                            
                        </p>
                    </MotionWrapper>
                </div>
            </MotionWrapper>
            <MotionWrapper className='about-fade' transition={{ delay: 0 }}>
                <div className='about'>
                    <MotionWrapper className='about-fade' transition={{ delay: 0 }}>
                        <strong>About the developer</strong>
                    </MotionWrapper>
                    <MotionWrapper className='about-fade' transition={{ delay: 0 }}>
                        <p>
                            
                        </p>
                    </MotionWrapper>
                </div>
            </MotionWrapper>
        </div>
    );
}
