import React from 'react';

import MotionWrapper from '@components/MotionWrapper';

import github from '@assets/icons/github_2504911.png';
import instagram from '@assets/icons/instagram_2504918.png';
import linkedin from '@assets/icons/linkedin_2504923.png';
import './ContactPage.css';


function Contact() {
    return (
        <div className='contact-container'>
            <div className='contact-left'>
                <h1>Contact Us</h1>
                <MotionWrapper className={'fade-contact'} transition={{ delay: 0 }}>
                    <p>Feel free to reach out</p>
                </MotionWrapper>
                <MotionWrapper className={'fade-contact'} transition={{ delay: 0.2 }}>
                    <p>to one of our developers,</p>
                </MotionWrapper>
                <MotionWrapper className={'fade-contact'} transition={{ delay: 0.4 }}>
                    <p>we want to help</p>
                </MotionWrapper>
                <div className='socials'>
                    <MotionWrapper className={'fade-contact'} transition={{ delay: 0.4 }}>
                        <a href='https://www.github.com/gitXite' target='_blank' rel='noopener noreferrer'>
                            <img src={github}></img>
                        </a>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-contact'} transition={{ delay: 0.5 }}>
                        <a href='https://www.instagram.com/daniel_halaas' target='_blank' rel='noopener noreferrer'>
                            <img src={instagram}></img>
                        </a>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-contact'} transition={{ delay: 0.6 }}>
                        <a href='https://www.linkedin.com/in/daniel-halås-b00363352' target='_blank' rel='noopener noreferrer'>
                            <img src={linkedin}></img>
                        </a>
                    </MotionWrapper>
                </div>
            </div>
            <div className='contact-right'>
                <form className='contact-form'>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.2 }}>
                        <input type='text' placeholder='Name' required/>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.3 }}>
                        <input type='email' placeholder='Email' required/>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.4}}>
                        <input type='text' placeholder='Subject' required/>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.5 }}>
                        <input type='text' placeholder='Message' required/>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.6 }}>
                        <button type='submit'>Submit</button>
                    </MotionWrapper>
                </form>
            </div>
        </div>
    );
}


export default Contact;
