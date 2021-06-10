import '../styles/Dashboard.css'
import '../index.css'
import ProfileDashBody from '../components/Dashboard/ProfileDashBody';
import SidebarDash from '../components/Dashboard/SidebarDash';
import NavBar from '../components/Dashboard/NavBar'

const ProfileDash = ({isTA}) => {
    
    return (
        <div className = 'view-container'>
            <div className = 'profileDash'>
                <NavBar />
            </div>
            <div className = 'dash-container'>
                <div className = 'dash-sidebar'>
                    <SidebarDash 
                        isProfile = {true}
                        isTA = {isTA}
                    />
                </div>
                <div className = 'dash-body'>
                    <ProfileDashBody 
                        isTA = {isTA}
                    />
                </div>
            </div>
        </div>
    )
}
export default ProfileDash