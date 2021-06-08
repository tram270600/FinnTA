import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CardTAView from 'components/Dashboard/CardTAView'
import cap from 'images/cap.svg'
import envelope from 'images/envelope.svg'
import phone from 'images/phone.svg'
import score from 'images/score.svg'
import user from 'images/user.svg'
import bd from 'images/bd.svg'
import line from 'images/line.svg'
import star from 'images/star.svg'
import course from 'images/response.svg'
import clock from 'images/clock.svg'
import gradient1 from 'images/gradient1.svg'
import gradient2 from 'images/gradient2.svg'
import gradient3 from 'images/gradient3.svg'
import gradient4 from 'images/gradient4.svg'
import gradient5 from 'images/gradient5.svg'
import gradient6 from 'images/gradient6.svg'
import gradient7 from 'images/gradient7.svg'
import gradient8 from 'images/gradient8.svg'
import 'styles/DashProfile.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { Grid } from '@material-ui/core';

const ProfileDashBody = () => {

    const imgList = [gradient1, gradient2, gradient3, gradient4, gradient5, gradient6, gradient7, gradient8]
    
    const cardList = []

    for (let i = 0; i < 10; i++) {
        cardList.push(
        <Grid item>
            <CardTAView
                source={imgList[Math.floor(Math.random() * 8)]}
                falcuty='Business Administration'
                subject='Principles of Marketing'
                content='Review chapter for midterm. This is the second part of the SMM starter pack series of articles. If you made it this far, you must be willing to learn about promoting business.'
                isProgress={true}
            />
        </Grid>
        )
    }
    return (
        <>
            <div className='dash-infor'>
                <div className='dash-contact-container'>
                    <div className='dash-contact'>
                        <div className='contact general'>
                            <h3>General Information</h3>
                            <div className='content'>
                                <img src={cap} alt='Cap' />
                                <div>Department: <span>Computer Science and Engineering</span></div>
                            </div>
                            <div className='content'>
                                <img src={score} alt='Score' />
                                <div>Overall: <span>77.8</span></div>
                            </div>
                            <div className='content'>
                                <img src={bd} alt='birthday' />
                                <div>Date of birth: <span>27/06/2000</span></div>
                            </div>
                        </div>
                        <div className='contact social'>
                            <h3>Contact</h3>
                            <div className='content'>
                                <img src={envelope} alt='Email' />
                                <div>Email: <span>ngntram.ityu@gmail.com</span></div>
                            </div>
                            <div className='content'>
                                <img src={phone} alt='Phone' />
                                <div>Phone: <span>0123456789</span></div>
                            </div>
                            <div className='content'>
                                <img src={user} alt='User' />
                                <div>Social: <span>facebook.com/ubyii</span></div>
                            </div>
                        </div>
                    </div>
                    <div className='dash-describe'>
                        <p>Hello everyone, my name is Uby aka Tram Nguyen, this is few thing about myself and there is some course that I am interested in</p>
                    </div>
                </div>
                <div className='dash-button'>
                    <div className='button-container'>
                        <DropdownButton
                            menuAlign='left'
                            title='Create post'
                            bsPrefix='btn-square btn-choose'
                        >
                            <Dropdown.Item href="#">
                                Create Course
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                Create Post
                            </Dropdown.Item>
                        </DropdownButton>
                        <button className='btn-square'>
                            <span>Edit Profile</span>
                        </button>
                    </div>
                    <div className='rating-container'>
                        <div className='rating-gap'>
                            <div className='rating-content'>
                                <img src={star} alt='star' />
                                <span>4.8</span>
                            </div>
                            <h5>Rating</h5>
                        </div>
                        <img src={line} alt='line' />
                        <div className='rating-gap'>
                            <div className='rating-content'>
                                <img src={course} alt='course' />
                                <span>20</span>
                            </div>
                            <h5>Courses</h5>
                        </div>
                        <img src={line} alt='line' />
                        <div className='rating-gap'>
                            <div className='rating-content'>
                                <img src={clock} alt='clock' />
                                <span>In few minutes</span>
                            </div>
                            <h5>Achievement</h5>
                        </div>
                    </div>
                    <div className='follow-container'>
                        <div className='follow-child'>
                            <h3>100</h3>
                            <h4>Posts</h4>
                        </div>
                        <div className='follow-child'>
                            <h3>100K</h3>
                            <h4>Followers</h4>
                        </div>
                        <div className='follow-child'>
                            <h3>400K</h3>
                            <h4>Following</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dash-grid'>
                <h2>Progressing Course</h2>
                <div className='grid-container'>
                    <Grid container spacing={5} direction="row">
                       {cardList}
                    </Grid>
                </div>
            </div>
        </>
    )
}
export default ProfileDashBody