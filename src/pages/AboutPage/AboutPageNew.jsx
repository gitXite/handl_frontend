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
                    </div>
                    <div className='tag-image-pair'>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <img src={} />
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p className='tag'>Simple & Fast</p>
                        </MotionWrapper>
                    </div>
                    <div className='tag-image-pair'>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <img src={} />
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p className='tag'>Collaborative</p>
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
                    </div>
                    <div className='tag-image-pair'>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <img src={} />
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p className='tag'>Minimal Data Collection</p>
                        </MotionWrapper>
                    </div>
                    <div className='tag-image-pair'>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <img src={} />
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p className='tag'>Private Lists</p>
                        </MotionWrapper>
                    </div>
                    <div className='tag-image-pair'>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <img src={} />
                        </MotionWrapper>
                        <MotionWrapper className={'about-fade'} transition={{ delay: 0 }}>
                            <p className='tag'>No Third-Party Tracking</p>
                        </MotionWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
}
