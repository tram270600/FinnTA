import React from 'react'
import '../styles/Dashboard.css'
import '../index.css'
import NavBar from 'components/Dashboard/NavBar'
import SidebarDash from 'components/Dashboard/SidebarDash'
import NotiDashBody from 'components/Dashboard/NotiDashBody'
import ScheduleDashBody from 'components/Dashboard/ScheduleDashBody'

const ScheduleDash = ({isTA}) => {
    return (
        <div className='view-container'>
            <div className='profileDash'>
                <NavBar />
            </div>
            <div className='dash-container'>
                <div className='dash-sidebar'>
                    <SidebarDash
                        isSche={true}
                        isTA = {isTA}
                    />
                </div>
                <div className='dash-body noti'>
                    {/*Schedule TA view by TA*/}
                    <ScheduleDashBody 
                        isTA = {isTA}
                    />
                </div>
            </div>
        </div>
    )
}
export default ScheduleDash