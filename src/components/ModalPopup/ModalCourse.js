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
const ModalCourse = ({ isShowingCourse, hide }) => {
    return isShowingCourse ? ReactDOM.createPortal(  
  <React.Fragment>
    <div id="myModal" class="modal">
        <div className="course-info">
            <div className="gradient-bg">
                <button className="modalcourse-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                    <span class="closee">&times;</span> 
                </button>
                <img src = {laptop} alt = 'laptop' style={{width:"160px"}}/>
            </div>
            <div className="header">
                <div className="ta-info">
                    <div className="info">
                        <img src = {avatar} alt = 'avatar'/>Patricia Kemp
                        <div className="rating">
                            <h5>5</h5>
                            <Star fontSize="small"style={{color:"#FFC87B",marginRight: "10px"}}/> 
                        </div>
                    </div>
                    
                </div>
                <div className="Container"> 
                        <input type="submit" style={{width:"144px", height:"38px", marginRight:"50px"}} value="Book Course"/>  
                </div>
            </div>
            <div className="course-detail">
                <h6> Department:</h6> Computer Science and Engineering <br></br>
                <h6>Overall:</h6>  77.8/100
                <h3 style={{marginTop:"20px"}}> GENERAL </h3>
                <h1> Calculus 2 </h1>
                <h5> Review chapter for midterm.
This is the second part of the SMM starter pack series of articles. If you made it this far, you must be willing to learn about promoting business.</h5>
                <div className="threebox">
                    <div className="box"> 
                        <h3> DATE </h3>
                        <img src = {calendar} alt = 'calendar'/>
                        27th Jun
                    </div>
                    <div className="box"> 
                        <h3> TIME </h3>
                        <img src = {clockbig} alt = 'clock'/>
                        Evening: 13h - 15h
                    </div>
                    <div className="box"> 
                    <h3> PRICE </h3>
                    <img src = {coin} alt = 'coin'/>
                    $90.00
                    </div>
                </div>
            </div>
            
        </div>
        </div>
  </React.Fragment>, document.body
) : null;}

export default ModalCourse;