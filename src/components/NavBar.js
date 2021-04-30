import React, {useState} from 'react';
import './styles/NavBar.css'
import {Link} from 'react-router-dom'
import logo from '../images/Logo.png'

const NavBar = () => {
    return (
        <nav className = 'navbar'>
            <div className = 'navbar-container'>
                <Link to = '/' className = 'navbar-logo'>
                    <img src = {logo} className = 'logo' alt = 'Logo' />
                    FinnaTa 
                </Link>
            </div>
            <ul className = 'nav-menu'>
                <li className = 'nav-items'>
                    <Link to = '/' className = 'nav-links'>
                        About
                    </Link>
                </li>
                <li className = 'nav-items'>
                    <Link to = '/' className = 'nav-links'>
                        Home
                    </Link>
                </li>
                <li className = 'nav-items'>
                    <Link to = '/' className = 'nav-links'>
                        News
                    </Link>                    
                </li>
                <li className = 'nav-items'>
                    <Link to = '/' className = 'nav-links'>
                        Find Tutor
                    </Link>
                </li>
                <li className = 'nav-items'>
                    <Link to = '/' className = 'nav-links'>
                        Features
                    </Link>
                </li>
            </ul>
            <button className = 'btn'>Sign In</button>
            <button className = 'btn signup'>Sign Up</button>
        </nav>
    )
}
export default NavBar