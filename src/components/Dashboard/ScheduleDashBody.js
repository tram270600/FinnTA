import React from 'react'
import 'styles/DashSchedule.scss'
import { Calendar } from 'react-material-event-calendar';


const ScheduleDashBody = ({ isTA }) => {
    const colorList = ["#35BBCA", "#FE7A15", "#F8D90F", "#C68BFF", "#709CFF", "#FFBBEC"]
    const getSelectedDays = (days) => {
        console.log(days)
    }
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const subjectName = ["Computer Architecture", "Principle of Programming Language", "Web Application Development"];

    return (
        <div className='dashschedule-container'>
            <h3> My Schedule </h3>
            <div className='dash-calendar'>
                <Calendar month={currentMonth} title="Calendar"
                    getSelectedDays={getSelectedDays}
                    year={currentYear}
                    selectedDays={
                        {
                            '2021-6': [{ '3': { info: subjectName[0], color: colorList[0] } }, { '8': { info: subjectName[2], color: colorList[2] },  }],
                            '2021-5': [{ '25': { info: subjectName[1], color: colorList[1] } }],
                        }
                    } />
                <div className='dash-note'>
                    <div className='course-note'>
                        <div className='color-indicator' style={{ background: colorList[0] }}>
                        </div>
                        <h6> Physics 2</h6>
                    </div>

                    <div className='course-note'>
                        <div className='color-indicator' style={{ background: colorList[1] }}>
                        </div>
                        <h6> Fundamental of Financial Management </h6>
                    </div>

                    <div className='course-note'>
                        <div className='color-indicator' style={{ background: colorList[2] }}>
                        </div>
                        <h6> Applied Linear Algebra </h6>
                    </div>


                </div>
            </div>


        </div>
    )
}
export default ScheduleDashBody