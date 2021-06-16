import { useEffect } from 'react';
import CardItem from './CardItem'
import '../../styles/Cards.scss'
import { Fade } from "react-awesome-reveal";
import talker from 'utils/talker';
import { department, resAccount } from 'global/dataType';
import { useAppDispatch, useTypedSelector } from 'app/store';
import { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { getAllDepartment } from 'reducer/thunks/DepartmentThunk';
import { useCallback } from 'react';

const Card = () => {
    const gradientList = ['linear-gradient(180deg, #0191B4 0%, #35BBCA 100%)',
        'linear-gradient(180deg, #FE7A15 0%, #FFAF72 100%)',
        "linear-gradient(180deg, #A64DFF 0%, #C68BFF 100%)",
        "linear-gradient(108deg, rgba(248, 217, 15, 0.9) 1.48%, rgba(254, 122, 21, 0.9) 100%), #BCD1FF",
        "linear-gradient(180deg, #709CFF 0%, #64CDFF 100%)"]

    const [cards, setCards] = useState(<></>)
    const department = useTypedSelector(state => state.Department)
    const getCard = useCallback(async () => {
        console.log(department)
        let TAList = await talker.TA.getSortTA("des", "rate", 0)
        if (TAList.TA.length === 0)
            return
        let tempCard = <>
            {TAList.TA.map((ta) => {
                console.log(ta)
                let c_idLs = TAList.Class[ta._id]
                console.log(c_idLs)
                let res = c_idLs.map((c_id) => {
                    return Object.values(department.data).filter((d) => {
                        if (d.courses[c_id])
                            return true
                        return false
                    }).map((d) => {
                        return d.courses[c_id]
                    })
                }).flat()
                return <CardItem
                    avatar={ta.Avatar}
                    name={ta.Name}
                    major={department.data[ta.d_id].name}
                    gpa={ta.GPA}
                    star={ta.Rate}
                    background={gradientList[0]}
                    color='#231F20'
                    listSubject={res}
                />
            })}
        </>
        setCards(tempCard)
    }, [department])

    useEffect(() => {
        if (Object.keys(department.data).length !== 0)
            getCard()
    }, [getCard])

    return (
        <Fade duration={2300} direction="left">
            <div className='cards'>
                <div className='text-container'>
                    <h1>Teaching Assistant Around You</h1>
                </div>
                <div className='text-container'>
                    <h3>Finding Tutor that suits with your requirement who are able to help you to boost up your marks</h3>
                </div>

                <div className='cards-container'>
                    <div className='cards-wrapper'>
                        <div className='cards-items'>
                            {department.status === "idle" ? cards : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}
export default Card