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
                            <strong className='about-header'>What is HANDL?</strong>
                            <MotionWrapper className={'tag-fade'} transition={{ delay: 0.1 }}>
                                <p>
                                    HANDL is a modern shopping list app designed to make grocery planning effortless. 
                                    Whether you're managing weekly groceries, coordinating with family, or keeping track of must-have items, 
                                    HANDL keeps everything in sync so you never forget an essential item again.
                                </p>
                            </MotionWrapper>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-desc'} transition={{ delay: 0.2 }}>
                        <div className='about'>
                            <strong className='about-header'>About the Developer</strong>
                            <MotionWrapper className={'tag-fade'} transition={{ delay: 0.3 }}>
                                <p>
                                    HANDL is built by an aspiring full-stack developer, working solo to create a simple yet powerful tool 
                                    for seamless shopping list management. With a passion for intuitive design and real-time functionality, 
                                    this project is a testiment to his love and obsession with software development, crafted to make everyday tasks easier.
                                </p>
                            </MotionWrapper>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className="fade-desc" transition={{ delay: 0.4 }}>
                        <div className="about">
                            <strong className='about-header'>Get Started</strong>
                            <MotionWrapper className={'tag-fade'} transition={{ delay: 0.5 }}>
                                <p>
                                    Ready to make shopping simpler? <br />
                                    <a className='create-account' href="/register">Create an account</a> and start using HANDL today!
                                </p>
                            </MotionWrapper>
                        </div>
                    </MotionWrapper>
                </div>
                <div className='about-subcontainer-right'>
                    <MotionWrapper className={'fade-desc'} transition={{ delay: 0.0 }}>
                        <div className='about'>
                            <strong className='about-header'>Why HANDL?</strong> <br />
                            <p>
                                <MotionWrapper className={'tag-fade'} transition={{ delay: 0.1 }}>
                                    <i><i className='tags'>Real-time Sync:</i> Stay updated with live changes as you or others update the list.</i> 
                                    <br /><br />
                                </MotionWrapper>
                                <MotionWrapper className={'tag-fade'} transition={{ delay: 0.2 }}>
                                    <i><i className='tags'>Simple & Fast:</i> No clutter, no distractions—just an intuitive shopping experience.</i> 
                                    <br /><br />
                                </MotionWrapper>
                                <MotionWrapper className={'tag-fade'} transition={{ delay: 0.3 }}>
                                    <i><i className='tags'>Collaborative:</i> Share lists with family, friends, or roommates for hassle-free coordination.</i>
                                </MotionWrapper>
                            </p>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-desc'} transition={{ delay: 0.4 }}>
                        <div className='about'>
                            <strong className='about-header'>Security & Privacy</strong> <br />
                            <p>
                                <MotionWrapper className={'tag-fade'} transition={{ delay: 0.5 }}>
                                    <i><i className='tags'>Secure Authentication:</i> Your account is protected with encrypted credentials.</i>
                                    <br /><br />
                                </MotionWrapper>
                                <MotionWrapper className={'tag-fade'} transition={{ delay: 0.6 }}>
                                    <i><i className='tags'>Minimal Data Collection:</i> We only store what’s necessary to provide the best experience.</i>
                                    <br /><br />
                                </MotionWrapper>
                                <MotionWrapper className={'tag-fade'} transition={{ delay: 0.7 }}>
                                    <i><i className='tags'>Private Lists:</i> Your shopping lists are accessible only to you and those you share them with.</i>
                                    <br /><br />
                                </MotionWrapper>
                                <MotionWrapper className={'tag-fade'} transition={{ delay: 0.8 }}>
                                    <i><i className='tags'>No Third-Party Tracking:</i> We don’t sell or share your data with advertisers. We take your privacy and data security seriously.</i>
                                </MotionWrapper>
                            </p>
                        </div>
                    </MotionWrapper>
                </div>
            </div>
        </div>
    );
}


export default About;
