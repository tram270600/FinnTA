import {Link} from 'react-router-dom'
import logo from '../../images/Logo.png'
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
            <div className = 'noti-container'>
                <div className = 'icon'>
                    <i class="fas fa-search"></i>
                </div>
                <div className = 'icon'>
                    <NotifyMe
                        className = 'noti'
                        data={data}
                        storageKey='notific_key'
                        notific_key='timestamp'
                        notific_value='update'
                        heading='Notification Alerts'
                        sortedByKey={false}
                        showDate={true}
                        size={64}
                        color="yellow"
                    />
                </div>
            </div>
        </nav>
    )
}
export default NavBar