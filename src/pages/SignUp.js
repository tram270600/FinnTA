import '../styles/Dashboard.css'
import '../index.css'
import '../styles/Signup.scss'
import showPw from '../images/showPw.svg';
import React, {SyntheticEvent, useState} from 'react';
import useSignUpForm from './useSignUpForm';
import {Redirect} from 'react-router-dom'; 
import ProfileDashBody from '../components/Dashboard/ProfileDashBody';
import SidebarDash from '../components/Dashboard/SidebarDash';
import NavBar from '../components/Dashboard/NavBar'
import Modal from "./Modal";
import useModal from './useModal';
// import Modal from 'react-bootstrap/Modal';


const SignUp = () => {
    const [Password, setPw] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const { handleChange, values, handleSubmit } = useSignUpForm();
    const {isShowing, toggle} = useModal(); //custom modal hook 

    return (
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
                                name="fullname"
                                id="fullname"
                                placeholder="Ex: Nguyen Giang Ngoc Tram"
                                value={values.fullname}
                                onChange={handleChange}
                                required/>
                            <label>Full Name</label>
                            </div>

                            <div className="field">
                                <input type="text" name="email" id="email" placeholder="Enter email" value={values.email}
                                onChange={handleChange} required/>
                                <label>Email</label>
                            </div>

                            <div className="field">
                                <input type="text" name="phonenumber" className="form-input" placeholder="Enter phone number" value={values.phone}
                                onChange={handleChange} ></input>
                                <label>Phone Number</label>
                            </div>

                            <div className="field">
                                <select NAME="department" SIZE="1">
                                    <option VALUE="default"> Choose your faculty </option>
                                    <option VALUE="CSE">CSE - Computer Science and Engineering</option>
                                    <option VALUE="BA"> BA - Business Administration </option>
                                    <option VALUE="IEM">IEM - Industrial Engineering and Management </option>
                                </select>
                                <label>Department</label>
                            </div>
                       </div>
                       
                       <div className="column-right">
                            <div className = "field">
                                <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Enter password"
                                onChange={(e) => {setPw(e.target.value)}} required/>
                                <label> Password </label>
                                <img src={showPw} width={24} onClick={()=>setShowPassword(!showPassword)} 
                                style={{filter: showPassword ? 'none' : 'grayscale(100%)'}}></img>
                            </div>

                            <div className = "field">
                                <input
                                type={showPassword2 ? "text" : "password"}
                                name="ipPass"
                                id="ipPass"
                                placeholder="Confirm"
                                onChange={(e) => {setPw(e.target.value)}} required/>
                                <label> Confirm Password </label>
                                <img src={showPw} width={24} onClick={()=>setShowPassword2(!showPassword2)} 
                                style={{filter: showPassword2 ? 'none' : 'grayscale(100%)'}}></img>
                            </div>

                                <label  style={{ marginTop: '20px',}}>Role</label>
                                <div class="radio-item">
                                    <input type="radio" id="ritema" name="ritem" value="ropt1" checked/>
                                    <label for="ritema">Student</label>
                                </div>

                                <div class="radio-item">
                                    <input type="radio" id="ritemb" name="ritem" value="ropt2"/>
                                    <label for="ritemb">Teaching Assistant</label>
                                </div>
                        </div>
                   </div>
                <h6> By continuing, you agreed to Term of use, and confirmed that you had read our FinnTa's Privacy policy. </h6>
                <div className="Container"> 
                    <input type="submit" value="Sign up"/>  
                </div>
               </form>
               {/* Turn on modal here*/}
               {/* <div className="Modall">
                    <button className="button-default" onClick={toggle}>Show Modal</button>
                    <Modal
                        isShowing={isShowing}
                        hide={toggle}
                    />
                </div> */}
               <p>Already have an account? <a href="/login">Sign in</a></p>

             
        </div>
    )
}
export default SignUp