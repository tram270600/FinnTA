import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/modal.scss';
import avatar from '../../images/avatar.png';
import calendar from '../../images/calendar.svg';
import clockbig from '../../images/clockbig.svg'
import coin from '../../images/coin.svg';
import { makeStyles } from '@material-ui/core/styles';
import Star from "@material-ui/icons/Star";
import laptop from '../../images/laptop.svg';
import { marginTop } from '@xstyled/system';
import { Link } from 'react-router-dom'
const ModalCourse = ({ isShowingCourse, hide, faculty, subject, content, price, duration, tutorname, gpa, uid }) => {
    return isShowingCourse ? ReactDOM.createPortal(  
  <React.Fragment>
    <div id="myModal" class="modal" style={{marginTop:"40px"}}>
        <div className="course-info">
            <div className="gradient-bg">
                <button className="modalcourse-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                    <span class="closee">&times;</span> 
                </button>
                <img src = {laptop} alt = 'laptop' style={{width:"160px"}}/>
            </div>
            <div className="header">
                <div className="ta-info">
                    <Link to={`/profile/${uid}`} style={{ color: 'black' }}>
                    <div className="info">
                        <img src = {avatar} alt = 'avatar'/>{tutorname}
                        <div className="rating">
                            <h5>5</h5>
                            <Star fontSize="small"style={{color:"#FFC87B",marginRight: "10px"}}/> 
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="Container"> 
                <Link to={`/profile/${uid}`} style={{ color: 'black' }}>
                        <input type="submit" style={{width:"144px", height:"38px", marginRight:"50px"}} value="Book Course"/>  </Link>
                </div>
            </div>
            <div className="course-detail">
                <h6> Department:</h6> {faculty} <br></br>
                <h6>Overall:</h6>  {gpa}/100
                <h3 style={{marginTop:"20px"}}> {faculty} </h3>
                <h1> {subject} </h1>
                <h5> {content}</h5>
                <div className="threebox">
                    <div className="box"> 
                        <h3> DURATION </h3>
                        <img src = {calendar} alt = 'calendar'/>
                        {duration}
                    </div>
                    <div className="box"> 
                        <h3> TIME </h3>
                        <img src = {clockbig} alt = 'clock'/>
                        Evening: 13h - 15h
                    </div>
                    <div className="box"> 
                    <h3> PRICE </h3>
                    <img src = {coin} alt = 'coin'/>
                    ${price}
                    </div>
                </div>
            </div>
            
        </div>
        </div>
  </React.Fragment>, document.body
) : null;}

export default ModalCourse;