import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../images/Logo.png'
import NotifyMe from 'react-notification-timeline'
import '../../styles/NavBar.css'
import { useTypedSelector } from 'app/store'
import avatar from 'images/avatar.png'

const NavBar = () => {

    const data = [
        {
            "update": "70 new employees are shifted",
            "timestamp": new Date().getTime()
        },
        {
            "update": "Time to take a Break, TADA!!!",
            "timestamp": new Date().getTime()
        },
        {
            "update": "Time to take a Drink, TADA!!!",
            "timestamp": new Date().getTime()
        }
    ]
    const background = { background: "#5DE2E8" }
    const [isHover, setHover] = useState(false)

    const history = useHistory();
    const handleClick = (page) => {
        history.push(`/${page}`)
    }
    const account = useTypedSelector(state => state.Account)

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo'>
                    <img src={logo} className='logo' alt='Logo' />
                    FinnTA
                </Link>
            </div>
            <ul className='nav-menu dash'>
                <li className='nav-items'>
                    <Link to='/' className='nav-links'>
                        About
                    </Link>
                </li>
                <li className='nav-items'>
                    <Link to='/' className='nav-links'>
                        Home
                    </Link>
                </li>
                <li className='nav-items'>
                    <Link to='/' className='nav-links'>
                        News
                    </Link>
                </li>
                <li className='nav-items'>
                    <Link to='/' className='nav-links'>
                        Find Tutor
                    </Link>
                </li>
                <li className='nav-items'>
                    <Link to='/' className='nav-links'>
                        Features
                    </Link>
                </li>
            </ul>
            {/* Object.keys(account.data).length !== 0 */}
            { true ?
                <>
                    <div className='noti-container'>
                        <div
                            onMouseMove={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            style={isHover ? background : null}
                            className='icon-dash'
                        >
                            <i class="fas fa-search" onClick={() => handleClick('search')}></i>
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
                            color="black"
                        />
                        <div className='avatar-nav' style={{ cursor: 'pointer' }}
                            onClick={() => handleClick('profile')}>
                            <div className='name'>
                                <img src={account.data.avatar} alt='Avatar' />
                                <span>{account.data.Name}</span>
                            </div>
                        </div>
                    </div>
                </> : <>
                    <button className='btn' onClick={() => handleClick('login')}>Sign In</button>
                    <button className='btn signup' onClick={() => handleClick('signup')}>Sign Up</button>
                </>}
        </nav>
    )
}
export default NavBar