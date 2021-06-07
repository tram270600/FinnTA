import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import logo from '../../images/Logo.png'
import avatar from '../../images/avatar.png'
import NotifyMe from 'react-notification-timeline';
import '../../styles/NavBar.css'

const NavBar = () => {

    const data =  [
        {
            "update":"70 new employees are shifted",
            "timestamp": new Date().getTime()
        },
        {
            "update":"Time to take a Break, TADA!!!",
            "timestamp": new Date().getTime()
        },
        {
            "update":"Time to take a Drink, TADA!!!",
            "timestamp": new Date().getTime()
        }
      ]
    const background = {background: "#5DE2E8"}
    const [isHover, setHover] = useState(false)
    return (
        <nav className = 'navbar'>
            <div className = 'navbar-container'>
                <Link to = '/' className = 'navbar-logo'>
                    <img src = {logo} className = 'logo' alt = 'Logo' />
                    FinnaTa 
                </Link>
            </div>
            <ul className = 'nav-menu dash'>
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
            <div className = 'noti-container'>
                <div 
                onMouseMove = {(event) => setHover(true)}
                onMouseLeave = {(event) => setHover (false)}
                style = {isHover ? background : null}
                className = 'icon-dash'
                >
                    <i class="fas fa-search"></i>
                </div>
                <NotifyMe
                            data={data}
                            storageKey='notific_key'
                            notific_key='timestamp'
                            notific_value='update'
                            heading='Notification Alerts'
                            sortedByKey={false}
                            showDate={true}
                            size={21}
                            color= "black"
                />
                <div className = 'avatar'>
                    <div className = 'name'>
                        <img src = {avatar} alt = 'Avatar'/>
                        <span>Mario</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default NavBar