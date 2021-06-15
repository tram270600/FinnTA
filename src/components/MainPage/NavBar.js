import React, {useState} from 'react';
import '../../styles/NavBar.css'
import {Link, useHistory} from 'react-router-dom'
import logo from '../../images/Logo.png'

const NavBar = () => {
    const history = useHistory();
    const handleClick = (page) =>{
        history.push(`/${page}`)
    }
    return (
        <nav className = '_navbar' style = {{position: "sticky"}} >
            <div className = '_navbar-container'>
                <Link to = '/' className = '_navbar-logo'>
                    <img src = {logo} className = 'logo' alt = 'Logo' />
                    FinnTa 
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
            <button className = 'btn' onClick={()=>handleClick('login')}>Sign In</button>
            <button className = 'btn signup' onClick={()=>handleClick('signup')}>Sign Up</button>
        </nav>
    )
}
export default NavBar