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
                        <div className='field'>
                            <input type='text' id='name'required/>
                            <label className='form-label' htmlFor='name'>Name</label>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.3 }}>
                        <div className='field'>
                            <input type='text' id='email'required/>
                            <label className='form-label' htmlFor='email'>Email</label>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.4}}>
                        <div className='field'>
                            <input type='text' id='subject'required/>
                            <label className='form-label' htmlFor='subject'>Subject</label>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.5 }}>
                        <div className='field'>
                            <textarea id='message' required></textarea>
                            <label className='textarea-label' htmlFor='message'>Message</label>
                        </div>
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
