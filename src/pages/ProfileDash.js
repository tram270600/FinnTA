import '../styles/Dashboard.css'
import '../index.css'
import ProfileDashBody from '../components/Dashboard/ProfileDashBody';
import SidebarDash from '../components/Dashboard/SidebarDash';
import NavBar from '../components/Dashboard/NavBar'

const ProfileDash = () => {
    
    return (
        <>
            <div className = 'profileDash'>
                <NavBar />
            </div>
            <div className = 'dash-container'>
                <div className = 'dash-sidebar'>
                    <SidebarDash 
                        isProfile = {true}
                    />
                </div>
                <div className = 'dash-body'>
                    {/*Profile TA view by TA*/}
                    <ProfileDashBody />
                </div>
            </div>
        </>
    )
}
export default ProfileDash