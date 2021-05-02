import React from 'react'
import '../../styles/Footer.css'
import {Link} from 'react-router-dom'
import logo from '../../images/Logo.png'

const Footer = () => {
    return(
        <footer className = 'footer-container'>
            <div className = 'wrapper'>
                <div className = 'footer-infor'>
                    <div className = 'footer-logo'>
                        <Link to = '/' className = 'navbar-logo logo-footer'>
                            <img src = {logo} className = 'logo' alt = 'Logo' />
                            FinnaTa 
                        </Link>
                    </div>
                    <p>FinnTa is a service that helps student to find teaching assistant, tutor to boost up score.</p>
                    <div className = 'social-media'>
                        <Link 
                        to = '/' 
                        className = 'social-icon-link facebook' 
                        target = '_blank' 
                        aria-label = 'Facebook' 
                        >
                            <i className = 'fab fa-facebook-f'></i>
                        </Link>

                        <Link 
                        to = '/' 
                        className = 'social-icon-link instagram' 
                        target = '_blank' 
                        aria-label = 'Instagram' >
                            <i className = 'fab fa-instagram'></i>
                        </Link>

                        <Link 
                        to = '/' 
                        className = 'social-icon-link twitter' 
                        target = '_blank' 
                        aria-label = 'Twitter' 
                        >
                            <i className = 'fab fa-twitter'></i>
                        </Link>

                        <Link 
                        to = '/' 
                        className = 'social-icon-link linkedin' 
                        target = '_blank' 
                        aria-label = 'LinkedIn' 
                        >
                            <i className = 'fab fa-linkedin'></i>
                        </Link>
                    </div>
                    <small className = 'website-rights'>©2020 Finnta Policy</small>
                </div>
                <div className = 'footer-links'>
                    <div className = 'footer-link-wrapper'>
                        <div className = 'footer-link-items'>
                            <h2>Product</h2>
                            <Link to = '/'>Download</Link>
                            <Link to = '/'>Pricing</Link>
                            <Link to = '/'>Locations</Link>
                            <Link to = '/'>Server</Link>
                            <Link to = '/'>Countries</Link>
                            <Link to = '/'>Blog</Link>
                        </div>
                        <div className = 'footer-link-items'>
                            <h2>Engage</h2>
                            <Link to = '/'>LaslesVPN ?</Link>
                            <Link to = '/'>FAQ</Link>
                            <Link to = '/'>Tutorials</Link>
                            <Link to = '/'>About us</Link>
                            <Link to = '/'>Privacy Policy</Link>
                            <Link to = '/'>Terms of Service</Link>
                        </div>
                        <div className = 'footer-link-items'>
                            <h2>Earn Money</h2>
                            <Link to = '/'>Affiliate</Link>
                            <Link to = '/'>Become Partner</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer