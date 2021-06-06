import React, {useState} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import cap from '../../images/cap.svg'
import envelope from '../../images/envelope.svg'
import phone from '../../images/phone.svg'
import score from '../../images/score.svg'
import user from '../../images/user.svg'
import bd from '../../images/bd.svg'
import '../../styles/DashProfile.css'
import Dropdown from 'react-bootstrap/Dropdown'

const ProfileDashBody = () => {

    return (
        <>
            <div className = 'dash-infor'>
                <div className = 'dash-contact-container'>
                    <div className = 'dash-contact'>
                        <div className = 'contact general'>
                            <h3>General Information</h3>
                            <div className = 'content'>
                                <img src = {cap} alt = 'Cap' />
                                <h5>Department: <span>Computer Science and Engineering</span></h5>
                            </div>
                            <div className = 'content'>
                                <img src = {score} alt = 'Score' />
                                <h5>Overall: <span>77.8</span></h5>
                            </div>
                            <div className = 'content'>
                                <img src = {bd} alt = 'birthday' />
                                <h5>Date of birth: <span>27/06/2000</span></h5>
                            </div>
                        </div>
                        <div className = 'contact social'>
                            <h3>Contact</h3>
                            <div className = 'content'>
                                <img src = {envelope} alt = 'Email' />
                                <h5>Email: <span>ngntram.ityu@gmail.com</span></h5>
                            </div>
                            <div className = 'content'>
                                <img src = {phone} alt = 'Phone' />
                                <h5>Phone: <span>0123456789</span></h5>
                            </div>
                            <div className = 'content'>
                                <img src = {user} alt = 'User' />
                                <h5>Social: <span>facebook.com/ubyii</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className = 'dash-describe'>
                        <p>Hello everyone, my name is Uby aka Tram Nguyen, this is few thing about myself and there is some course that I am interested in</p>
                    </div>
                </div>
                <div className = 'dash-button'>
                    <div className = 'button-container'>
                        <DropdownButton 
                            menuAlign = 'left' 
                            title = 'Create post'
                            bsPrefix = 'btn-square btn-choose'
                        >
                            <Dropdown.Item href = "#">
                                Create Course
                            </Dropdown.Item>
                            <Dropdown.Item href = "#">
                                Create Post
                            </Dropdown.Item>
                        </DropdownButton>
                        <button className = 'btn-square'>
                            <span>Edit Profile</span>
                        </button>
                    </div>
                    <div className = 'follow-container'>
                        <div className = 'follow-child'>
                            <h3>100</h3>    
                            <h4>Posts</h4>
                        </div>
                        <div className = 'follow-child'>
                            <h3>100K</h3>
                            <h4>Followers</h4>
                        </div>
                        <div className = 'follow-child'>
                            <h3>400K</h3>
                            <h4>Following</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'dash-grid'>
                <div className = 'grid progress'>
                    <h1>Progressing Course</h1>
                    <div className = 'gird-container'></div>
                </div>
            </div>
        </>
    )
}
export default ProfileDashBody