import '../styles/Dashboard.css'
import '../index.css'
import ProfileDashBody from '../components/Dashboard/ProfileDashBody';
import SidebarDash from '../components/Dashboard/SidebarDash';
import NavBar from '../components/Dashboard/NavBar'
import { useEffect, useState } from 'react';
import CourseDashBody from 'components/Dashboard/CourseDashBody';
import NotiDashBody from 'components/Dashboard/NotiDashBody';
import ScheduleDashBody from 'components/Dashboard/ScheduleDashBody';
import { useTypedSelector } from 'app/store';

const ProfileDash = (props) => {
    const [body, setBody] = useState("PROFILE")
    const [isGuest, setGuest] = useState(props.isGuest)
    const account = useTypedSelector(state => state.Account.data)
    // console.log(props.match.params.id)
    useEffect(() => {
        if (props.match?.params.id === account._id)
            setGuest(false)
    }, [])
    console.log(isGuest)
    console.log(account.Role)

    const getBody = () => {
        switch (body) {
            case "PROFILE":
                return <ProfileDashBody isTA={!isGuest} uid={props.match?.params.id} isStudent={false} />
            case "COURSE":
                return <CourseDashBody isTA={false} isStudent={true} />
            case "CHAT":
                return
            case "NOTIFICATIONS":
                return <NotiDashBody />
            case "SCHEDULE":
                return <ScheduleDashBody isTA={!isGuest} />
            case "SETTINGS":
                return
        }
    }

    const changeBody = (state) => {
        setBody(state);
    }
    console.log("Body:", body)
    return (
        <div className='view-container'>
            <div className='profileDash'>
                <NavBar />
            </div>
            <div className='dash-container'>
                <div className='dash-sidebar'>
                    <SidebarDash body={body} setBody={changeBody} isGuest={isGuest} />
                </div>
                <div className='dash-body'>
                    {getBody()}
                </div>
            </div>
        </div>
    )
}
export default ProfileDash