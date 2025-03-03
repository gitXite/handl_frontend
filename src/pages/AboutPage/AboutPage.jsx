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
                            <strong>About the Developer</strong>
                            <p>
                                HANDL is built by an aspiring full-stack developer, working solo to create a simple yet powerful tool 
                                for seamless shopping list management. With a passion for intuitive design and real-time functionality, 
                                this project is a testiment to his love and obsession with software development, crafted to make everyday tasks easier.
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
                            <strong>Why HANDL?</strong> <br />
                            <i>Real-time Sync: Stay updated with live changes as you or others update the list.</i> 
                            <br /><br />
                            <i>Simple & Fast: No clutter, no distractions—just an intuitive shopping experience.</i> 
                            <br /><br />
                            <i>Collaborative: Share lists with family, friends, or roommates for hassle-free coordination.</i>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-desc'} transition={{ delay: 0.8 }}>
                        <p className='about'>
                            <strong>Security & Privacy</strong> <br />
                            We take your privacy and data security seriously.
                            <br /><br />
                            <i>Secure Authentication: Your account is protected with encrypted credentials.</i>
                            <br /><br />
                            <i>Minimal Data Collection: We only store what’s necessary to provide the best experience.</i>
                            <br /><br />
                            <i>Private Lists: Your shopping lists are accessible only to you and those you share them with.</i>
                            <br /><br />
                            <i>No Third-Party Tracking: We don’t sell or share your data with advertisers.</i>
                        </p>
                    </MotionWrapper>
                </div>
            </div>
        </div>
    );
}


export default About;
