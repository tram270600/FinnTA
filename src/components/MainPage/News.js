import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/News.css'
import NewItem from './NewItem'
import { Fade, Slide } from "react-awesome-reveal";

import { Swiper, SwiperSlide } from 'swiper/react'
import SwipeCore, { Navigation, Pagination } from 'swiper'

import 'swiper/swiper.scss';
import talker from 'utils/talker';

import avatar from 'images/avatar.svg'
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';


SwipeCore.use([Navigation, Pagination]);

const News = () => {
    const [feedback, setFeedback] = useState(<></>)
    const getFeedback = useCallback(async () => {
        let fbList = await talker.Feedback.getFeedback("des", "rate", 0)
        if (fbList.Feedback.length === 0)
            return
        console.log(fbList)

        let feedback = <>
            {fbList.Feedback.map((fb) => {
                var ava
                if (!fbList.User[fb.s_id].Avatar || fbList.User[fb.s_id].Avatar === "")
                    ava = avatar
                else
                    ava = fbList.User[fb.s_id].Avatar
                return <SwiperSlide key={fb._id}>
                    <div
                        className='news-container'>
                        <NewItem
                            style={cardHover}
                            id={fb.s_id}
                            avatar={ava}
                            name={fbList.User[fb.s_id].Name}
                            comment={fb.detail}
                            star={fb.Rate}
                        />
                    </div>
                </SwiperSlide>
            })}
        </>
        setFeedback(feedback)
    }, [])
    useEffect(() => {
        getFeedback()
    }, [])

    const [isHoverLeft, setHoverLeft] = useState(false)
    const [isHoverRight, setHoverRight] = useState(false)

    const params = {
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        slidesPerView: 3
    }
    const styleHover = {
        background: '#0191B4',
        color: '#fff',
        boxShadow: '0px 14px 44px rgba(14,20,34,0.08)'
    }
    const cardHover = {
        border: '2px solid #FEA250'
    }
    return (
        <div className = 'news'>
            <Fade triggerOnce = {true} direction="top" duration={2000}>
                <div className = 'text-container'>
                    <h1>News</h1>
                </div>
                <div className='text-container'>
                    <h3>These are something new everyday include post about finding suitable tutors for specific subject and there are announcement about new course is started.</h3>
                </div>
            </Fade>
            <Slide triggerOnce = {true} direction="left" duration = {2000} >
                <Swiper  {...params}
                    onSwiper={() => console.log("hello")}
                    onSlideChange={() => console.log('slide change')}
                >
                    {feedback}
                    <div className='container'>
                        <div className='swiper-pagination'></div>
                        <div className='swiper-button'>
                            <div
                                style={isHoverLeft ? styleHover : null}
                                onMouseMove={() => setHoverLeft(true)}
                                onMouseLeave={() => setHoverLeft(false)}
                                className='swiper-button-prev'><i className="fas fa-arrow-left" /></div>
                            <div
                                style={isHoverRight ? styleHover : null}
                                onMouseMove={() => setHoverRight(true)}
                                onMouseLeave={() => setHoverRight(false)}
                                className='swiper-button-next'><i className="fas fa-arrow-right" /></div>
                        </div>
                    </div>                
                </Swiper>         
            </Slide>
        </div>
    )
}
export default News