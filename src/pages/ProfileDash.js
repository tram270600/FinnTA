import '../styles/Dashboard.css'
import '../index.css'
import ProfileDashBody from '../components/Dashboard/ProfileDashBody';
import SidebarDash from '../components/Dashboard/SidebarDash';
import NavBar from '../components/Dashboard/NavBar'
import { useState } from 'react';
import CourseDashBody from 'components/Dashboard/CourseDashBody';
import NotiDashBody from 'components/Dashboard/NotiDashBody';
import ScheduleDashBody from 'components/Dashboard/ScheduleDashBody';

const ProfileDash = ({isGuest}) => {
    const [body, setBody] = useState("PROFILE")

    const getBody = () =>{
        switch(body){
            case "PROFILE":
                return <ProfileDashBody />
            case "COURSE":
                return <CourseDashBody isTA = {!isGuest}/>
            case "CHAT":
                return 
            case "NOTIFICATIONS":
                return <NotiDashBody/>
            case "SCHEDULE":
                return <ScheduleDashBody isTA = {!isGuest}/>
            case "SETTINGS":
                return
        }
    }

    const changeBody = (state) =>{
        setBody(state);
    }
    console.log("Body:",body)
    return (
        <div className = 'view-container'>
            <div className = 'profileDash'>
                <NavBar />
            </div>
            <div className = 'dash-container'>
                <div className = 'dash-sidebar'>
                    <SidebarDash body={body} setBody={changeBody} isGuest={isGuest}/>
                </div>
                <div className = 'dash-body'>
                    {/* <ProfileDashBody /> */}
                    {getBody()}
                </div>
            </div>
        </div>
    )
}
export default ProfileDash