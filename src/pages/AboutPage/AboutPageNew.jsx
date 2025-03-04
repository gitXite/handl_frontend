import React from 'react';

import MotionWrapper from '@components/MotionWrapper';

import './AboutPageNew.css';


function AboutPageNew() {
    return (
        <div className='about-container'>
            <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                <div className='about-header'>
                    <h1>About HANDL</h1>
                </div>
            </MotionWrapper>
            <div className='about-subcontainer'>
                <div className='about'>
                    <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                        <p className='strong'>What is HANDL?</p>
                    </MotionWrapper>
                    <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                        <p>
                            HANDL is a modern shopping list app designed to make grocery planning effortless. 
                            Whether you're managing weekly groceries, coordinating with family, or keeping track of must-have items, 
                            HANDL keeps everything in sync so you never forget an essential item again.
                        </p>
                    </MotionWrapper>
                </div>
                <div className='about'>
                    <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                        <p className='strong'>About the developer</p>
                    </MotionWrapper>
                    <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                        <p>
                            HANDL is built by an aspiring full-stack developer, working solo to create a simple yet powerful tool 
                            for seamless shopping list management. With a passion for intuitive design and real-time functionality, 
                            this project is a testiment to his love and obsession with software development, crafted to make everyday tasks easier.
                        </p>
                    </MotionWrapper>
                </div>
            </div>
            <div className='tags-container'>
                <div className='tag-header'>
                    <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                        <h1>Why HANDL?</h1>
                    </MotionWrapper>
                </div>
                <div className='tags'>
                    <div className='tag-image-pair'>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <img src={} />
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p className='tag'>Real-Time Sync</p>
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p>Stay updated with live changes as you or others update your shopping needs.</p>
                        </MotionWrapper>
                    </div>
                    <div className='tag-image-pair'>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <img src={} />
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p className='tag'>Simple & Fast</p>
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p>No clutter, no distractions. An intuitive shopping experience through and through</p>
                        </MotionWrapper>
                    </div>
                    <div className='tag-image-pair'>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <img src={} />
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p className='tag'>Collaborative</p>
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p>Share lists with family, friends, or roommates for hassle-free coordination.</p>
                        </MotionWrapper>
                    </div>
                </div>
            </div>
            <div className='tags-container'>
                <div className='tag-header'>
                    <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                        <h1>Security & Privacy</h1>
                    </MotionWrapper>
                </div>
                <div className='tags'>
                    <div className='tag-image-pair'>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <img src={} />
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p className='tag'>Secure Authentication</p>
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p>Your account is protected with encrypted credentials.</p>
                        </MotionWrapper>
                    </div>
                    <div className='tag-image-pair'>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <img src={} />
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p className='tag'>Minimal Data Collection</p>
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p>We only store what’s necessary to provide the best experience.</p>
                        </MotionWrapper>
                    </div>
                    <div className='tag-image-pair'>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <img src={} />
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p className='tag'>Private Lists</p>
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p>Your shopping lists are accessible only to you and those you share them with.</p>
                        </MotionWrapper>
                    </div>
                    <div className='tag-image-pair'>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <img src={} />
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p className='tag'>No Third-Party Tracking</p>
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p>We don’t sell or share your data with advertisers. We take your privacy and data security seriously.</p>
                        </MotionWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
}
