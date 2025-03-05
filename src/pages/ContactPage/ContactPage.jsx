import React, { useState } from 'react';

import MotionWrapper from '@components/MotionWrapper';

import github from '@assets/icons/github_2504911.png';
import instagram from '@assets/icons/instagram_2504918.png';
import linkedin from '@assets/icons/linkedin_2504923.png';
import './ContactPage.css';
import api from '../../utils/api';


function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    const [notice, setNotice] = useState();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const resetForm = () => setFormData ({
        name: '',
        email: '',
        subject: '',
        message:''
    });

    const handleChange = (field) => (e) => {
        setFormData({...formData, [field]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotice('');

        const body = {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
        };

        try {
            setIsLoading(true);
            const result = await api.post('/api/contact/submit-form', body);
            console.log(result.message);
            setNotice(result.message);
            resetForm();
        } catch (error) {
            console.error('Failed to send form:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            setNotice(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

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
                <form className='contact-form' onSubmit={(e) => handleSubmit(e)}>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.2 }}>
                        <div className='field'>
                            <input 
                                type='text' 
                                value={formData.name}
                                onChange={handleChange('name')}
                                id='name' 
                                required
                            />
                            <label className='form-label' htmlFor='name'>Name</label>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.3 }}>
                        <div className='field'>
                            <input 
                                type='text'
                                value={formData.email}
                                onChange={handleChange('email')} 
                                id='email'
                                required
                            />
                            <label className='form-label' htmlFor='email'>Email</label>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.4}}>
                        <div className='field'>
                            <input 
                                type='text' 
                                value={formData.subject}
                                onChange={handleChange('subject')}
                                id='subject'
                                required
                            />
                            <label className='form-label' htmlFor='subject'>Subject</label>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.5 }}>
                        <div className='field'>
                            <textarea 
                            id='message' 
                            value={formData.message}
                            onChange={handleChange('message')}
                            required />
                            <label className='textarea-label' htmlFor='message'>Message</label>
                        </div>
                    </MotionWrapper>
                    <MotionWrapper className={'fade-form'} transition={{ delay: 0.6 }}>
                        {isLoading ? <div className='signup-loading'><span>.</span><span>.</span><span>.</span></div> : null}
                        {notice && <p className='error-text-contact'>{notice}</p>}
                        <button type='submit'>Submit</button>
                    </MotionWrapper>
                </form>
            </div>
        </div>
    );
}


export default Contact;
