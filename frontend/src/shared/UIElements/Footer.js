import React from 'react';
import './css/Footer.css';

const Footer = props => {
    return (
        <footer className="footer">
            <h1>Lucky Lotus</h1>
            <span className="line"></span>
            <div className="address">
                <h3>Address</h3>
                <p>89 Example Avenue London, TA11 OPK</p>
            </div>
            <div className="opening-times">
            <h3>Opening Times</h3>
            <p>Mon-Fri: 11am-10pm</p>
            <p>Sat-Sun: 11am-11pm</p>
            </div>
            <div className="contact">
                <h3>Contact Us</h3>
                <p>020 7654 8103</p>
                <p>info@luckylotus.com</p>
            </div>
            <div className="social-media">
                <h3>Follow Us</h3>
                <p className="social-media__icons">
                    <i className="fa fa-twitter"></i>
                    <i className="fa fa-facebook-official"></i>
                    <i className="fa fa-instagram"></i>
                    <i className="fa fa-pinterest"></i>
                </p>
            </div>
        </footer>
    )
}

export default Footer;