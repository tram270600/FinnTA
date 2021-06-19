import '../styles/Dashboard.css'
import '../index.css'
import '../styles/Signup.scss'
import showPw from '../images/showPw.svg';
import React, { SyntheticEvent, useState } from 'react';
import useSignUpForm from './useSignUpForm';
import ProfileDashBody from '../components/Dashboard/ProfileDashBody';
import SidebarDash from '../components/Dashboard/SidebarDash';
import NavBar from '../components/Dashboard/NavBar'
import Modal from "../components/ModalPopup/Modal";
import useModal from '../components/ModalPopup/useModal';
import ModalCreatePost from '../components/ModalPopup/ModalCreatePost';
import ModalEditProfile from '../components/ModalPopup/ModalEditProfile';
import ModalConfirmBook from '../components/ModalPopup/ModalConfirmBook';
import ModalRating from '../components/ModalPopup/ModalRating';
import ModalViewRate from '../components/ModalPopup/ModalViewRate';
import ModalCourse from '../components/ModalPopup/ModalCourse';
import useModalCourse from 'components/ModalPopup/useModalCourse';
import ModalConfirmTeach from 'components/ModalPopup/ModalConfirmTeach';
import talker from 'utils/talker';
import { useTypedSelector } from 'app/store';
import { Link, Redirect } from 'react-router-dom';
// import Modal from 'react-bootstrap/Modal';


const SignUp = () => {
    const [Password, setPw] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const { handleChange, handleSubmit, values, errors, redirect } = useSignUpForm();

    const { isShowing, toggle } = useModal(); //custom modal hook 
    const { isShowingCreate, toggleCreate } = useModal();
    const { isShowingProfile, toggleProfile } = useModal();
    const { isShowingBook, toggleBook } = useModal();
    const { isShowingRate, toggleRate } = useModal();
    const { isShowingViewRate, toggleViewRate } = useModal();
    const { isShowingCourse, toggleCourse } = useModalCourse();
    const { isShowingConfirmTeach, toggleConfirmTeach } = useModalCourse();

    const department = useTypedSelector(state => state.Department.data)

    if (redirect)
        return <Redirect to='/' />

    return (
        <div className='backGround'>
            <div className="loginForm">
                <form action="GET" className="inputForm" onSubmit={handleSubmit}>
                    <div className="header">
                        <h2> Ready to find your  </h2>
                        <h1> Teaching Assistant ?</h1>
                        <b> Sign up to our website and start to find your tutor to improve your score today ! </b>
                    </div>
                    <div className="row">
                        <div className="column-left">
                            <div className="field">
                                <input
                                    type="text"
                                    name="Name"
                                    id="fullname"
                                    placeholder="Ex: Nguyen Giang Ngoc Tram"
                                    value={values.fullname}
                                    onChange={handleChange}
                                    required />
                                <label>Full Name</label>
                            </div>

                            <div className="field">
                                <input type="email" name="Email" id="email" placeholder="Enter email" value={values.email}
                                    onChange={handleChange} required />
                                <label>Email</label>
                            </div>

                            <div className="field">
                                <input type="number" name="Phone" className="form-input" placeholder="Enter phone number" value={values.phone}
                                    onChange={handleChange} ></input>
                                <label>Phone Number</label>
                            </div>

                            <div className="field">
                                <select NAME="d_id" onChange={handleChange}>
                                    <option VALUE=""> Choose your faculty </option>
                                    {Object.keys(department).map((d) => {
                                        return <option value={department[d]._id}>
                                            {department[d].name}
                                        </option>
                                    })}
                                </select>
                                <label>Department</label>
                            </div>
                        </div>

                        <div className="column-right">
                            <div className="field">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="Password"
                                    id="password"
                                    placeholder="Enter password"
                                    onChange={handleChange} required />
                                <label> Password </label>
                                <img src={showPw} width={24} onClick={() => setShowPassword(!showPassword)}
                                    style={{ filter: showPassword ? 'none' : 'grayscale(100%)' }}></img>
                            </div>

                            <div className="field">
                                <input
                                    type={showPassword2 ? "text" : "password"}
                                    name="Password2"
                                    id="password"
                                    placeholder="Confirm"
                                    onChange={handleChange} required />
                                <label> Confirm Password </label>
                                <img src={showPw} width={24} onClick={() => setShowPassword2(!showPassword2)}
                                    style={{ filter: showPassword2 ? 'none' : 'grayscale(100%)' }}></img>
                            </div>

                            <label style={{ marginTop: '20px', }}>Role</label>
                            <div class="radio-item">
                                <input type="radio" id="ritema"
                                    name="Role" value="Student"
                                    onChange={handleChange} checked />
                                <label for="ritema">Student</label>
                            </div>

                            <div class="radio-item">
                                <input type="radio" id="ritemb"
                                    name="Role" value="T.A"
                                    onChange={handleChange} />
                                <label for="ritemb">Teaching Assistant</label>
                            </div>
                        </div>
                    </div>
                    <h6> By continuing, you agreed to Term of use, and confirmed that you had read our FinnTa's Privacy policy. </h6>
                    <div className="Container">
                        <input type="submit" value="Sign up" />
                    </div>
                </form>
                {/* Turn on modal here*/}
                {/* <div className="Modall">
                    <button className="button-default" onClick={toggle}>Show Modal</button>
                    <Modal
                        isShowing={isShowing}
                        hide={toggle}
                    />
                </div>
                <div className="Modall">
                    <button className="button-default" onClick={toggleCreate}>Show Modal Create</button>
                    <ModalCreatePost
                        isShowingCreate={isShowingCreate}
                        hide={toggleCreate}
                    />
                </div> */}
                {/* <div className="Modall">
                    <button className="button-default" onClick={toggleProfile}>Show Modal Profile</button>
                    <ModalEditProfile
                        isShowingProfile={isShowingProfile}
                        hide={toggleProfile}
                    />
                </div>
                <div className="Modall">
                    <button className="button-default" onClick={toggleBook}>Show Modal Book</button>
                    <ModalConfirmBook
                        isShowingBook={isShowingBook}
                        hide={toggleBook}
                    />
                </div> */}
                {/* <div className="Modall">
                    <button className="button-default" onClick={toggleRate}>Show Modal Rate</button>
                    <ModalRating
                        isShowingRate={isShowingRate}
                        hide={toggleRate}
                    />
                </div> */}
                {/* <div className="Modall">
                    <button className="button-default" onClick={toggleViewRate}>Show Modal Rate</button>
                    <ModalViewRate
                        isShowingViewRate={isShowingViewRate}
                        hide={toggleViewRate}
                    />
                </div> */}
                {/* <div className="Modall">
                    <button className="button-default" onClick={toggleCourse}>Show Modal Course</button>
                    <ModalCourse
                        isShowingCourse={isShowingCourse}
                        hide={toggleCourse}
                    />
                </div> */}
                {/* <div className="Modall">
                    <button className="button-default" onClick={toggleConfirmTeach}>Show Modal Confirm Teach</button>
                    <ModalConfirmTeach
                        isShowingConfirmTeach={isShowingConfirmTeach}
                        hide={toggleConfirmTeach}
                    />
                </div> */}
                <p>Already have an account?<Link to="/login">Sign in</Link></p>
            </div>
        </div>
    )
}
export default SignUp