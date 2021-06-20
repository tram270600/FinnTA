import React from 'react'
import { Fade, Slide } from "react-awesome-reveal";
import CardGrid from 'components/Dashboard/CardGrid';
import { useTypedSelector } from 'app/store';

const Courses = () => {
    const account = useTypedSelector(state => state.Account.data)
    return (
        <>
            <div className='news'>
                <Fade triggerOnce={true} direction="top" duration={2000}>
                    <div className='text-container'>
                        <h1>Available Courses</h1>
                    </div>
                    <div className='text-container'>
                        <h3>Finding Tutor that suits with your requirement who are ale to help you to boost up your marks.</h3>
                    </div>
                </Fade>
                <Slide triggerOnce={true} direction="left" duration={2000} >
                    <CardGrid
                        available={true}
                        role={account.Role === "Student" ? "T.A" : "Student"}
                        keyword={"Lin Fun"}
                        isGuest={true}
                    />
                </Slide>
            </div>
        </>
    )
}
export default Courses