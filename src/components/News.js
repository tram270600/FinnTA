import React from 'react';
import './styles/News.css'
import NewItem from './NewItem'

import {Swiper, SwiperSlide} from 'swiper/react'
import SwipeCore, {Navigation, Pagination} from 'swiper'

import 'swiper/swiper.scss';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';

SwipeCore.use([Navigation, Pagination]);

const News = () => {

    const data = [
        {
            id: 1,
            avatar: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.6435-9/173675054_1559121364419800_5783364412267366985_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=k80HlU5h9WcAX_RswLr&_nc_ht=scontent.fsgn1-1.fna&oh=57ddf3d651bb520c6862f7c6b0693983&oe=60B16EED',
            name: 'Mario',
            comment: 'Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best',
            star: '4'
        },
        {
            id: 2,
            avatar: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png',
            name: 'Doraemon',
            comment: 'I like it because I like to travel far and still can connect with high speed.',
            star: '3.5'
        },
        {
            id: 3,
            avatar: 'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2019/08/17/nobita.jpg',
            name: 'Nobita',
            comment: 'This is very unusual for my business that currently requires a virtual private network that has high security',
            star: '4'
        },
        {
            id: 4,
            avatar: 'https://photo-baomoi.zadn.vn/w700_r1/2019_08_28_304_31996919/a32bd9c43b84d2da8b95.jpg',
            name: 'Chaien',
            comment: 'I like it because I like to travel far and still can connect with high speed.',
            star: '4.5'
        },
        {
            id: 5,
            avatar: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png',
            name: 'Doraemon',
            comment: 'I like it because I like to travel far and still can connect with high speed.',
            star: '4.5'
        },
    ]
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
        slidesPerView : 3
      }
    return (
        <div className = 'news'>
            <div className = 'text-container'>
                <h1>News</h1>
            </div>
            <div className = 'text-container'>
                <h3>These are something new everyday include post about finding suitable tutors for specific subject and there are announcement about new course is started.</h3>
            </div>
            <Swiper {...params} 
                onSwiper = {() => console.log('swiper') }
                onSlideChange = {() => console.log('slide change')}
            >
                {
                    data.map (user => (
                        <SwiperSlide key = {user.id}>
                            <div className = 'news-container'>
                                <NewItem 
                                avatar = {user.avatar}
                                name = {user.name}
                                comment = {user.comment}
                                star = {user.star}
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
                <button>CLick</button>
            </Swiper>     
        </div>
    )
}
export default News