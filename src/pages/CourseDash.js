import React from 'react'
import '../styles/Dashboard.css'
import '../index.css'
import SidebarDash from '../components/Dashboard/SidebarDash'
import NavBar from '../components/Dashboard/NavBar'
import CourseDashBody from '../components/Dashboard/CourseDashBody'

const CourseDash = () => {
    return (
        <div className = 'view-container'>
            <div className = 'profileDash'>
                <NavBar />
            </div>
            <div className = 'dash-container'>
                <div className = 'dash-sidebar'>
                    <SidebarDash 
                        isCourse = {true}
                    />
                </div>
                <div className = 'dash-body'>
                    {/*Course TA view by TA*/}
                    <CourseDashBody />
                </div>
            </div>
        </div>
    )
}
export default CourseDash
