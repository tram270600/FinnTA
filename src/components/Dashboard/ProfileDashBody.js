import React from 'react';
import '../../styles/DashProfile.css'

const ProfileDashBody = () => {
    return (
        <>
            <div className = 'dash-infor'>
                <div className = 'dash-contact'></div>
                <div className = 'dash-button'></div>
            </div>
            <div className = 'dash-grid'>
                <div className = 'grid progress'>
                    <h1>Progressing Course</h1>
                    <div className = 'gird-container'></div>
                </div>
                <div className = 'grid history'>
                    <h1>History Course</h1>
                    <div className = 'grid-container'></div>
                </div>
            </div>
        </>
    )
}
export default ProfileDashBody