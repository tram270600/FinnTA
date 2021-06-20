import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/modal.scss';
import avatar from '../../images/avatar.png'
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import useModal from './useModal';
import ModalRating from './ModalRating';
import Modal from "./Modal";
const useStyles = makeStyles({
    root: {
      width: 200,
      margin: "10px auto 10px",
      display: "flex",
    },
    iconFilled: {color: "#FFC87B"},
    iconFilled1: { color: "red" },
    iconFilled2: { color: "red" },
    iconFilled3: { color: "orange" },
    iconFilled4: { color: "orange" },
    iconFilled5: { color: "#FFC87B" },
    iconHover: {},
    iconHover1: { color: "red" },
    iconHover2: { color: "red" },
    iconHover3: { color: "orange" },
    iconHover4: { color: "orange" },
    iconHover5: { color: "#FFC87B" }
  });

const ModalViewRate = ({ isShowingViewRate, hide, data }) => {
    const [value, setValue] = React.useState(4);
    const [hover, setHover] = React.useState(-1);
    const {isShowingRate, toggleRate} = useModal();
    const classes = useStyles();
    const [iconFilledVar, setIconFilled] = React.useState(classes.iconFilled);
    const [iconHoverVar, setIconHover] = React.useState(classes.iconHover);
    return isShowingViewRate ? ReactDOM.createPortal(  
  <React.Fragment>
    <div id="myModal" class="modal">
        <div class="modal-content">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span class="close">&times;</span> 
            </button>
            <div className="modal-title">
                Rating Tutor
                <h6>List of rating of Teaching Assistant </h6>
            </div>
           <div className="modal-form"> 
                <div className="rate-indicator">
                <h2 style={{textAlign:"center", fontSize:"48px", fontFamily:"Inter", fontWeight:"700"}}> {data.Rate} <h6 style={{display:"inline-block"}}>/5</h6> </h2>
                </div>
                
                <div className={classes.root}>
                    <Rating
                        readOnly
                        className="rating"
                        name="hover-feedback"
                        value={value}
                        defaultValue={2}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                          switch (true) {
                            case newValue <= 1: {
                              setIconFilled(classes.iconFilled1);
                              break;
                            }
                            case newValue <= 2 && newValue > 1: {
                              setIconFilled(classes.iconFilled2);
                              break;
                            }
                            case newValue <= 3 && newValue > 2: {
                              setIconFilled(classes.iconFilled3);
                              break;
                            }
                            case newValue <= 4 && newValue > 3: {
                              setIconFilled(classes.iconFilled4);
                              break;
                            }
                            case newValue > 4: {
                              setIconFilled(classes.iconFilled5);
                              break;
                            }
                          }
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                          switch (true) {
                            case newHover <= 1: {
                              setIconHover(classes.iconHover1);
                              break;
                            }
                            case newHover <= 2 && newHover > 1: {
                              setIconHover(classes.iconHover2);
                              break;
                            }
                            case newHover <= 3 && newHover > 2: {
                              setIconHover(classes.iconHover3);
                              break;
                            }
                            case newHover <= 4 && newHover > 3: {
                              setIconHover(classes.iconHover4);
                              break;
                            }
                            case newHover > 4: {
                              setIconHover(classes.iconHover5);
                              break;
                            }
                          }}}
                        icon={<Star fontSize="large"/>}
                        emptyIcon={<StarBorder fontSize="large" />}
                        classes={{
                          iconFilled: iconFilledVar,
                          iconHover: iconHoverVar
                        }}
                    />
                </div>
                    
                    <div className="Container"> 
                        <input type="submit" value="RATE TUTOR" onClick={toggleRate}/>  
                        <ModalRating
                        isShowingRate={isShowingRate}
                        hide={toggleRate}
                        />
                    </div>
                </div>
                {console.log(data)}
                <div className="comment-box">
                        <div className="box">
                            <div className="review-info">
                            <div className="info">
                                <img src = {avatar} alt = 'avatar'/>Uby Nguyen
                              </div>
                              <div className="rating">
                                <h5>5</h5>
                                <Star fontSize="small"style={{color:"#35BBCA", marginLeft: "2px", marginRight: "10px"}}/> 
                              </div>
                            </div>
                            <h5> The quality is good, I love the way he communicates with the member in class </h5>
                            <h6>22-03-2021 12:37</h6>
                        </div>
                        <div className="box">
                            <div className="review-info">
                              <div className="info">
                                <img src = {avatar} alt = 'avatar'/>Doku Tran
                              </div>
                              <div className="rating">
                                <h5>4</h5>
                                <Star fontSize="small"style={{color:"#35BBCA", marginLeft: "2px", marginRight: "10px"}}/> 
                              </div>
                            </div>
                            <h5> The quality is good, I love the way he communicates with the member in class </h5>
                            <h6>22-03-2021 12:37</h6>
                        </div>
                        <div className="box">
                              <div className="review-info">
                              <div className="info">
                                <img src = {avatar} alt = 'avatar'/>Mario Nguyen Huynh Phuong
                              </div>
                              <div className="rating">
                                <h5>3</h5>
                                <Star fontSize="small"style={{color:"#35BBCA", marginLeft: "2px", marginRight: "10px"}}/> 
                              </div>
                            </div>
                            <h5> The quality is good, I love the way he communicates with the member in class </h5>
                            <h6>22-03-2021 12:37</h6>
                        </div>
                        <div className="box">
                              <div className="review-info">
                              <div className="info">
                                <img src = {avatar} alt = 'avatar'/>Tram Nguyen Giang
                              </div>
                            <div className="rating">
                                <h5>4</h5>
                                <Star fontSize="small"style={{color:"#35BBCA", marginLeft: "2px", marginRight: "10px"}}/> 
                              </div>
                            </div>
                            <h5> The quality is good, I love the way he communicates with the member in class </h5>
                            <h6>22-03-2021 12:37</h6>
                        </div>
              
                        <div className="box">
                            <div className="review-info">
                            <div className="info">
                                <img src = {avatar} alt = 'avatar'/>Uby Nguyen
                              </div>
                              <div className="rating">
                                <h5>5</h5>
                                <Star fontSize="small"style={{color:"#35BBCA", marginLeft: "2px", marginRight: "10px"}}/> 
                              </div>
                            </div>
                            <h5> The quality is good, I love the way he communicates with the member in class </h5>
                            <h6>22-03-2021 12:37</h6>
                        </div>
                        <div className="box">
                            <div className="review-info">
                              <div className="info">
                                <img src = {avatar} alt = 'avatar'/>Doku Tran
                              </div>
                              <div className="rating">
                                <h5>4</h5>
                                <Star fontSize="small"style={{color:"#35BBCA", marginLeft: "2px", marginRight: "10px"}}/> 
                              </div>
                            </div>
                            <h5> The quality is good, I love the way he communicates with the member in class </h5>
                            <h6>22-03-2021 12:37</h6>
                        </div>
                 
                        <div className="box">
                            <div className="review-info">
                            <div className="info">
                                <img src = {avatar} alt = 'avatar'/>Tram Nguyen Giang
                              </div>
                              <div className="rating">
                                <h5>5</h5>
                                <Star fontSize="small"style={{color:"#35BBCA", marginLeft: "2px", marginRight: "10px"}}/> 
                              </div>
                            </div>
                            <h5> The quality is good, I love the way he communicates with the member in class </h5>
                            <h6>22-03-2021 12:37</h6>
                        </div>
                </div> 
            </div>
            
        </div>
  </React.Fragment>, document.body
) : null;}

export default ModalViewRate;