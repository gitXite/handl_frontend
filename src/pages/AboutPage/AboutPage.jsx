import React from 'react';

import MotionWrapper from '@components/MotionWrapper';

import './AboutPage.css';


function About() {
    return (
        <div className='about-container'>
            <div className='about-subcontainer'>
                <div className='about-subcontainer-left'>
                    <MotionWrapper className={'fade-desc'} transition={{ delay: 0.0 }}>
                        <div className='about'>
                            <strong>What is HANDL?</strong>
                            <p>
                                HANDL is a modern shopping list app designed to make grocery planning effortless. 
                                Whether you're managing weekly groceries, coordinating with family, or keeping track of must-have items, 
                                HANDL keeps everything in sync so you never forget an essential item again.
                            </p>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-desc'} transition={{ delay: 0.2 }}>
                    <div className='about'>
                            <strong>The Team</strong>
                            <p>
                                Currently
                            </p>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className="fade-desc" transition={{ delay: 0.4 }}>
                        <div className="about">
                            <strong>Get Started</strong>
                            <p>
                                Ready to make shopping simpler? <br />
                                <a className='create-account' href="/register">Create an account</a> and start using HANDL today!
                            </p>
                        </div>
                    </MotionWrapper>
                </div>
                <div className='about-subcontainer-right'>
                    <MotionWrapper className={'fade-desc'} transition={{ delay: 0.6 }}>    
                        <div className='about'>
                            <i><strong>Real-time Sync:</strong> Stay updated with live changes as you or others update the list.</i> 
                            <br /><br />
                            <i><strong>Simple & Fast:</strong> No clutter, no distractions—just an intuitive shopping experience.</i> 
                            <br /><br />
                            <i><strong>Collaborative:</strong> Share lists with family, friends, or roommates for hassle-free coordination.</i>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-desc'} transition={{ delay: 0.8 }}>
                        <p className='about'>
                            <strong>Security & Privacy</strong> 
                            <p>We take your privacy and data security seriously.</p>
                            <i><strong>Secure Authentication:</strong> Your account is protected with encrypted credentials.</i>
                            <br /><br />
                            <i><strong>Minimal Data Collection:</strong> We only store what’s necessary to provide the best experience.</i>
                            <br /><br />
                            <i><strong>Private Lists:</strong> Your shopping lists are accessible only to you and those you share them with.</i>
                            <br /><br />
                            <i><strong>No Third-Party Tracking:</strong> We don’t sell or share your data with advertisers.</i>
                        </p>
                    </MotionWrapper>
                </div>
            </div>
        </div>
    );
}


export default About;
