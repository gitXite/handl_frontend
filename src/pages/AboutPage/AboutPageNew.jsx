import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import MotionWrapper from '@components/MotionWrapper';
import { useAuth } from '@hooks/useAuth';

import teamIcon from '@assets/icons/group-chat.png';
import syncIcon from '@assets/icons/cloud-sync.png';
import fastIcon from '@assets/icons/deadline.png';
import secureIcon from '@assets/icons/insurance.png';
import compliantIcon from '@assets/icons/compliant.png';
import privacyIcon from '@assets/icons/privacy.png';
import bullhornIcon from '@assets/icons/bullhorn.png';
import accountIcon from '@assets/icons/add-user.png';
import './AboutPageNew.css';


function AboutPageNew() {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [isSecurity, setIsSecurity] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    const onClick = () => {
        isAuthenticated ? navigate('/') : navigate('/register');
    };

    return (
        <div className='about-container'>
            {!isSecurity ? (
                <>
                    <AnimatePresence>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <div className='header-container'>
                                <MotionWrapper className={'about-fade'} transition={{ duration: 0.3, delay: 0 }} initial={{ x: isFirstRender ? 0 : 200, y: isFirstRender? 0 : 30 }}>
                                    <div className='about-header'>
                                        <h1>About HANDL</h1>
                                    </div>
                                </MotionWrapper>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0.2 }}>
                                    <div className='sub-header'>
                                        <button className='sub-button' onClick={() => setIsSecurity(true)}>Privacy & Security</button>
                                    </div>
                                </MotionWrapper>
                            </div>
                        </MotionWrapper>
                    </AnimatePresence>
                    <div className='about-subcontainer'>
                        <div className='about'>
                            <MotionWrapper className={'about-fade'} transition={{ delay: 0.2 }}>
                                <p className='strong'>What Is It?</p>
                            </MotionWrapper>
                            <MotionWrapper className={'about-fade'} transition={{ delay: 0.25 }}>
                                <p>
                                    HANDL is a modern shopping list app designed to make grocery planning effortless. 
                                    Whether you're managing weekly groceries, coordinating with family, or keeping track of must-have items, 
                                    HANDL keeps everything in sync so you never forget an essential item again.
                                </p>
                            </MotionWrapper>
                        </div>
                        <div className='about'>
                            <MotionWrapper className={'about-fade'} transition={{ delay: 0.3 }}>
                                <p className='strong'>About The Developer</p>
                            </MotionWrapper>
                            <MotionWrapper className={'about-fade'} transition={{ delay: 0.35 }}>
                                <p>
                                    HANDL is built by an aspiring full-stack developer, working solo to create a simple yet powerful tool 
                                    for seamless shopping list management. With a passion for intuitive design and real-time functionality, 
                                    this project is a testiment to his love and obsession with software development, crafted to make everyday tasks easier.
                                </p>
                            </MotionWrapper>
                        </div>
                    </div>
                    <AnimatePresence>
                        <div className='tags-container'>
                            <div className='tags'>
                                <div className='tag-image-pair'>
                                    <MotionWrapper className={'about-fade'} transition={{ delay: isFirstRender? 0.4 : 0 }}>
                                        <img className='about-icon' src={teamIcon} />
                                    </MotionWrapper>
                                    <MotionWrapper className={'about-fade'} transition={{ delay: isFirstRender ? 0.45 : 0.05 }}>
                                        <p className='tag'>Collaborative</p>
                                    </MotionWrapper>
                                    <MotionWrapper className={'about-fade'} transition={{ delay: isFirstRender ? 0.5 : 0.1 }}>
                                        <p className='tag-text'>Share lists with family, friends, or roommates for hassle-free coordination.</p>
                                    </MotionWrapper>
                                </div>
                                <div className='tag-image-pair'>
                                    <MotionWrapper className={'about-fade'} transition={{ delay: isFirstRender ? 0.5 : 0.1 }}>
                                        <img className='about-icon' src={syncIcon} />
                                    </MotionWrapper>
                                    <MotionWrapper className={'about-fade'} transition={{ delay: isFirstRender ? 0.55 : 0.15 }}>
                                        <p className='tag'>Real-Time Sync</p>
                                    </MotionWrapper>
                                    <MotionWrapper className={'about-fade'} transition={{ delay: isFirstRender ? 0.6 : 0.2 }}>
                                        <p className='tag-text'>Stay updated with live changes as you or others update your shopping needs.</p>
                                    </MotionWrapper>
                                </div>
                                <div className='tag-image-pair'>
                                    <MotionWrapper className={'about-fade'} transition={{ delay: isFirstRender ? 0.6 : 0.2 }}>
                                        <img className='about-icon' src={fastIcon} />
                                    </MotionWrapper>
                                    <MotionWrapper className={'about-fade'} transition={{ delay: isFirstRender ? 0.65 : 0.25 }}>
                                        <p className='tag'>Simple & Fast</p>
                                    </MotionWrapper>
                                    <MotionWrapper className={'about-fade'} transition={{ delay: isFirstRender ? 0.7 : 0.3 }}>
                                        <p className='tag-text'>No clutter, no distractions. An intuitive shopping experience through and through</p>
                                    </MotionWrapper>
                                </div>
                                <div className='tag-image-pair'>
                                    <MotionWrapper className={'about-fade'} transition={{ delay: isFirstRender ? 0.7 : 0.3 }}>
                                        <img className='about-icon' src={accountIcon} />
                                    </MotionWrapper>
                                    <MotionWrapper className={'about-fade'} transition={{ delay: isFirstRender ? 0.75 : 0.35 }}>
                                        <p className='tag'>Get Started</p>
                                    </MotionWrapper>
                                    <MotionWrapper className={'about-fade'} transition={{ delay: isFirstRender ? 0.8 : 0.4 }}>
                                        <p className='tag-text'>Ready to make shopping simpler? <button onClick={onClick} className='about-register-button'>Create an account</button> <br /> and start using HANDL today!</p>
                                    </MotionWrapper>
                                </div>
                            </div>
                        </div>
                    </AnimatePresence>
                </>
            ) : (
                <>
                    <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                        <div className='header-container'>
                            <MotionWrapper className={'about-fade'} transition={{ duration: 0.3, delay: 0 }} initial={{ x: isFirstRender ? 0 : 200, y: isFirstRender? 0 : 30 }}>
                                <div className='about-header'>
                                    <h1>Privacy & Security</h1>
                                </div>
                                </MotionWrapper>
                            <MotionWrapper className={'about-fade'} transition={{ delay: 0.2 }}>
                                <div className='sub-header'>
                                    <button className='sub-button' onClick={() => setIsSecurity(false)}>About HANDL</button>
                                </div>
                            </MotionWrapper>
                        </div>
                    </MotionWrapper>
                    <div className='about-subcontainer'>
                        <div className='about'>
                            <MotionWrapper className={'about-fade'} transition={{ delay: 0.2 }}>
                                <p className='strong'>What Is It?</p>
                            </MotionWrapper>
                            <MotionWrapper className={'about-fade'} transition={{ delay: 0.25 }}>
                                <p>
                                    HANDL is a modern shopping list app designed to make grocery planning effortless. 
                                    Whether you're managing weekly groceries, coordinating with family, or keeping track of must-have items, 
                                    HANDL keeps everything in sync so you never forget an essential item again.
                                </p>
                            </MotionWrapper>
                        </div>
                        <div className='about'>
                            <MotionWrapper className={'about-fade'} transition={{ delay: 0.3 }}>
                                <p className='strong'>About The Developer</p>
                            </MotionWrapper>
                            <MotionWrapper className={'about-fade'} transition={{ delay: 0.35 }}>
                                <p>
                                    HANDL is built by an aspiring full-stack developer, working solo to create a simple yet powerful tool 
                                    for seamless shopping list management. With a passion for intuitive design and real-time functionality, 
                                    this project is a testiment to his love and obsession with software development, crafted to make everyday tasks easier.
                                </p>
                            </MotionWrapper>
                        </div>
                    </div>
                    <div className='tags-container'>
                        <div className='tags'>
                            <div className='tag-image-pair'>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                                    <img className='about-icon' src={secureIcon} />
                                </MotionWrapper>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0.05 }}>
                                    <p className='tag'>Secure Authentication</p>
                                </MotionWrapper>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0.1 }}>
                                    <p className='tag-text'>Your account is protected with encrypted credentials.</p>
                                </MotionWrapper>
                            </div>
                            <div className='tag-image-pair'>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0.1 }}>
                                    <img className='about-icon' src={compliantIcon} />
                                </MotionWrapper>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0.15 }}>
                                    <p className='tag'>Minimal Data Collection</p>
                                </MotionWrapper>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0.2 }}>
                                    <p className='tag-text'>We only store what’s necessary to provide the best experience.</p>
                                </MotionWrapper>
                            </div>
                            <div className='tag-image-pair'>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0.2 }}>
                                    <img className='about-icon' src={privacyIcon} />
                                </MotionWrapper>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0.25 }}>
                                    <p className='tag'>Private Lists</p>
                                </MotionWrapper>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0.3 }}>
                                    <p className='tag-text'>Your shopping lists are accessible only to you and those you share them with.</p>
                                </MotionWrapper>
                            </div>
                            <div className='tag-image-pair'>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0.3 }}>
                                    <img className='about-icon' src={bullhornIcon} />
                                </MotionWrapper>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0.35 }}>
                                    <p className='tag'>No Third-Party Tracking</p>
                                </MotionWrapper>
                                <MotionWrapper className={'about-fade'} transition={{ delay: 0.4 }}>
                                    <p className='tag-text'>We don’t sell or share your data with advertisers. We take your privacy and data security seriously.</p>
                                </MotionWrapper>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}


export default AboutPageNew;