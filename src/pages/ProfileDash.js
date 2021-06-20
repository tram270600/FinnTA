import '../styles/Dashboard.css'
import '../index.css'
import ProfileDashBody from '../components/Dashboard/ProfileDashBody';
import SidebarDash from '../components/Dashboard/SidebarDash';
import NavBar from '../components/Dashboard/NavBar'
import { useEffect, useState } from 'react';
import CourseDashBody from 'components/Dashboard/CourseDashBody';
import NotiDashBody from 'components/Dashboard/NotiDashBody';
import ScheduleDashBody from 'components/Dashboard/ScheduleDashBody';
import Chat from 'components/Dashboard/Chat'
import { useTypedSelector } from 'app/store';

const ProfileDash = (props) => {
    const [body, setBody] = useState("PROFILE")
    const account = useTypedSelector(state => state.Account.data)
    const [guest, setGuest] = useState(true)
    const role = account.Role ?? "Guest"
    let uid = props.match?.params.id
    console.log(guest)
    useEffect(() => {
        if (uid === account._id | !uid)
            setGuest(false)
    }, [uid])

    const getBody = () => {
        switch (body) {
            case "PROFILE":
                return <ProfileDashBody guest={guest} uid={uid ?? account._id} viewer_role={role} />
            case "COURSE":
                return <CourseDashBody uid={uid ?? account._id} isGuest={guest} viewer_role={role} />
            case "CHAT":
                return <Chat />
            case "NOTIFICATIONS":
                return <NotiDashBody />
            case "SCHEDULE":
                return <ScheduleDashBody isTA={!guest} />
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
                    <SidebarDash body={body} setBody={changeBody} isGuest={guest} uid={uid} />
                </div>
                <div className='dash-body'>
                    {getBody()}
                </div>
            </div>
        </div>
    )
}
export default ProfileDash