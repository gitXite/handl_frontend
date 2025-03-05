import react from 'react';
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
            <div className='footer-socials'>
                <img />
                <img />
                <img />
                <small>support@handl.dev</small>
            </div>
        </footer>
    );
}


export default Footer;
