import React from 'react'
import 'styles/DashCourse.scss'
import filter from 'images/filter.svg'
import CardGrid from './CardGrid';

const CourseDashBody = ({isTA, isStudent}) => {
   
    return (
        <div className='dashcourse-container'>
            <div className='dash-grid'>
                <div className='dash-title'>
                    <span>Progressing Course</span>
                    <div className='filter'>
                        <img src={filter} alt='filter' />
                        <span>Filter</span>
                    </div>
                </div>
                <CardGrid 
                    isProgress = {true}
                    isTA = {isTA}
                    isStudent = {isStudent}
                />
            </div>
            <div className='dash-grid'>
                <div className='dash-title'>
                    <span>History Course</span>
                </div>
                <CardGrid 
                    isProgress = {false}
                    isTA = {isTA}
                    isStudent = {isStudent}
                />
            </div>
        </div>
    )
}
export default CourseDashBody