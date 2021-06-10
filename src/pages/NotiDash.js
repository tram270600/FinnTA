import React from 'react'
import '../styles/Dashboard.css'
import '../index.css'
import NavBar from 'components/Dashboard/NavBar'
import SidebarDash from 'components/Dashboard/SidebarDash'
import NotiDashBody from 'components/Dashboard/NotiDashBody'

const NotiDash = () => {
    return (
        <div className='view-container'>
            <div className='profileDash'>
                <NavBar />
            </div>
            <div className='dash-container'>
                <div className='dash-sidebar'>
                    <SidebarDash
                        isNoti={true}
                    />
                </div>
                <div className='dash-body noti'>
                    {/*Noti TA view by TA*/}
                    <NotiDashBody />
                </div>
            </div>
        </div>
    )
}
export default NotiDash