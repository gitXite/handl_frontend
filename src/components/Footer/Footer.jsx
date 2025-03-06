import react from 'react';

import logo from '@assets/icons/logo.png';
import github from '@assets/icons/github_2504911.png';
import instagram from '@assets/icons/instagram_2504918.png';
import linkedin from '@assets/icons/linkedin_2504923.png';

import './Footer.css';


function Footer() {
    return (
        <footer>
            <div className='footer-logo'>
                <h1>HANDL</h1>
            </div>
            <div className='footer-copyright'>
                <small>Copyright © {new Date().getFullYear()} by HANDL. All Rights Reserved.</small>
            </div>
            <div className='logo'>
                <img className='footer-logo-img' src={logo}></img>
            </div>
            <div className='footer-socials'>
                <small>support@handl.dev</small>
                <a href='https://www.github.com/gitXite' target='_blank' rel='noopener noreferrer'>
                    <img src={github}></img>
                </a>
                <a href='https://www.instagram.com/daniel_halaas' target='_blank' rel='noopener noreferrer'>
                    <img src={instagram}></img>
                </a>
                <a href='https://www.linkedin.com/in/daniel-halås-b00363352' target='_blank' rel='noopener noreferrer'>
                    <img src={linkedin}></img>
                </a>
            </div>
        </footer>
    );
}


export default Footer;
