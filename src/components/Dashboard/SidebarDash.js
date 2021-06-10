import React, {useState} from 'react';
import {Link} from 'react-router-dom'

const SidebarDash = (props) => {
    const [userHover, setUserHover] = useState(false);
    const [isUser, setUser] = useState(props.isProfile)

    const [courseHover, setCourseHover] = useState(false);
    const [isCourse, setCourse] = useState(props.isCourse);

    const [chatHover, setChatHover] = useState(false);
    const [isChat, setChat] = useState(props.isChat);

    const [notiHover, setNotiHover] = useState(false);
    const [isNoti, setNoti] = useState(props.isNoti);

    const [scheHover, setScheHover] = useState(false);
    const [isSche, setSche] = useState(props.isSche);

    const [settingHover, setSettingHover] = useState (false);
    const [isSetting, setSetting] = useState(props.isSetting);

    const [logHover, setLogHover] = useState(false)
    const [isLog, setLog] = useState(props.isLog);

    const style = {
        color: "#0191B4",
        transform: "scale(1.1)",
        transition: "0.3s all ease-out"
    }
    return (
        <>
            <div className = 'avatar inDash'>
                    <img src = "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/173675054_1559121364419800_5783364412267366985_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=iYlzD0IeYT4AX8hCA2y&_nc_ht=scontent-hkg4-1.xx&oh=72b4b5442405e38859a0b3c1f8c1e06f&oe=60E0E4ED" alt = 'Avatar' />
                    <h2>Mario Nguyen</h2>
                </div>
            <div className = 'dash-sidebar-menu'>
                <Link 
                onClick = {(event) => setUser(true)}
                to = '/taprofile' 
                className = 'menu-icon'
                onMouseMove = {(event) => setUserHover(true)}
                onMouseLeave = {(event) => setUserHover(false)}
                >
                    <i style = {(userHover || isUser) ? style : null} class="far fa-user"></i>
                    <h3 style = {(userHover || isUser) ? style : null}>PROFILE</h3>
                </Link>
                <Link 
                onClick = {(event) => setCourse(true)}
                to = '/tacourse' 
                className = 'menu-icon'
                onMouseMove = {(event) => setCourseHover(true)}
                onMouseLeave = {(event) => setCourseHover(false)}
                >
                    <i style = {(courseHover || isCourse) ? style : null} class="fas fa-border-all"></i>
                    <h3 style = {(courseHover || isCourse) ? style : null}>COURSE</h3>
                </Link>
                <Link  
                to = '/' 
                className = 'menu-icon'
                onMouseMove = {(event) => setChatHover(true)}
                onMouseLeave = {(event) => setChatHover(false)}
                >
                    <i style = {(chatHover || isChat) ? style : null} class="far fa-comment-dots"></i>
                    <h3 style = {(chatHover || isChat) ? style : null}>CHAT</h3>
                </Link>
                <Link 
                to ='/tanoti' 
                className = 'menu-icon'
                onMouseMove = {(event) => setNotiHover(true)}
                onMouseLeave = {(event) => setNotiHover(false)}
                >
                    <i style = {(notiHover || isNoti) ? style : null} class="far fa-bell"></i>
                    <h3 style = {(notiHover || isNoti) ? style : null}>NOTIFICATIONS</h3>
                </Link>
                <Link 
                to = '/' 
                className = 'menu-icon'
                onMouseMove = {(event) => setScheHover(true)}
                onMouseLeave = {(event) => setScheHover(false)}
                >
                    <i style = {(scheHover || isSche) ? style : null} class="far fa-calendar-alt"></i>
                    <h3 style = {(scheHover || isSche) ? style : null}>SCHEDULE</h3>
                </Link>
                <Link 
                to = '/' 
                className = 'menu-icon'
                onMouseMove = {(event) => setSettingHover(true)}
                onMouseLeave = {(event) => setSettingHover(false)}
                >
                    <i style = {(settingHover || isSetting) ? style : null} class="fas fa-cog"></i>
                    <h3 style = {(settingHover || isSetting) ? style : null}>SETTINGS</h3>
                </Link>
            </div>
            <div className = 'log-out'>
                <Link
                to = '/' 
                className = 'menu-icon'
                onMouseMove = {(event) => setLogHover(true)}
                onMouseLeave = {(event) => setLogHover(false)}
                >
                    <i style = {logHover ? style : null} class="fas fa-power-off"></i>
                    <h3 style = {logHover ? style : null}>LOG OUT</h3>
                </Link>
            </div>
         </>
    )
}
export default SidebarDash