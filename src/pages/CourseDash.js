import React from 'react'
import '../styles/Dashboard.css'
import '../index.css'
import SidebarDash from '../components/Dashboard/SidebarDash'
import NavBar from '../components/Dashboard/NavBar'
import CourseDashBody from '../components/Dashboard/CourseDashBody'

const CourseDash = ({isTA}) => {
    return (
        <div className = 'view-container'>
            <div className = 'profileDash'>
                <NavBar />
            </div>
            <div className = 'dash-container'>
                <div className = 'dash-sidebar'>
                    <SidebarDash 
                        isCourse = {true}
                        isTA = {isTA}
                    />
                </div>
                <div className = 'dash-body'>
                    {/*Course TA view by TA*/}
                    <CourseDashBody 
                        isTA = {isTA}
                    />
                </div>
            </div>
        </div>
    )
}
export default CourseDash
