import react from 'react';
import './Footer.css';


function Footer() {
    return (
        <footer>
            <div className='footer'>
                <small>Copyright © {new Date().getFullYear()} by Handl. All Rights Reserved.</small>
            </div>
        </footer>
    );
}


export default Footer;
