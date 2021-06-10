import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/modal.scss';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import {UKeyboardDateTimePicker } from '@unicef/material-ui';
import { useState } from 'react';
import avatar from '../../images/avatar.png'
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Star from "@material-ui/icons/Star";
import {
    ThemeProvider,
    createMuiTheme
  } from "@material-ui/core/styles";
import { fontFamily } from '@xstyled/system';
    
const useStyles = makeStyles({
    root: {
      width: 200,
      margin: "10px 90px 10px",
      display: "flex",
      alignItems: "center"
    },
    iconFilled: {color: "#35BBCA"},
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


const ModalRating = ({ isShowingRate, hide }) => {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();
    const [iconFilledVar, setIconFilled] = React.useState(classes.iconFilled);
    const [iconHoverVar, setIconHover] = React.useState(classes.iconHover);
    const labels = {
      0.5: 'Useless',
      1: 'Useless+',
      1.5: 'Poor',
      2: 'Poor+',
      2.5: 'Ok',
      3: 'Ok+',
      3.5: 'Good',
      4: 'Good+',
      4.5: 'Excellent',
      5: 'Excellent+',
    };
    return isShowingRate ? ReactDOM.createPortal(  
  <React.Fragment>
    <div id="myModal" class="modal">
        <div class="modal-content">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span class="close">&times;</span> 
            </button>
            <div className="modal-title">
            Rating Tutor - Course
                <h6>Describe your experience after finishing the course with Teaching Assistant</h6>
            </div>
           <div className="modal-form"> 
                <div className="user-info">
                    <img src = {avatar} alt = 'avatar' />Tram Nguyen Giang
                </div>
                <h3> Course Information </h3>

                <div className="field">
                <label>Subject</label>
                    <select NAME="subject" SIZE="1" >
                        <option VALUE="default"> Choose Subject to Rate </option>
                        <option VALUE="CSE">CSE - Computer Science and Engineering</option>
                        <option VALUE="BA"> BA - Business Administration </option>
                        <option VALUE="IEM">IEM - Industrial Engineering and Management </option>
                    </select>
                </div>

                <h3> Rating Teaching Assistant and courses </h3>
                <div className={classes.root}>
                    <Rating
                        className="rating"
                        name="hover-feedback"
                        value={value}
                        // precision={0.5}
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
                        classes={{
                          iconFilled: iconFilledVar,
                          iconHover: iconHoverVar
                        }}
                    />
                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                </div>
                 
                <div className="field">
                    <label>Description/Message</label>
                    <textarea rows={7} cols={47} label = "Description" placeholder="Add some description"/>
                </div>
                <div className="Container"> 
                    <input type="submit" value="SEND RATING"/>  
                </div>
                
            </div>
        </div>
    </div>
  </React.Fragment>, document.body
) : null;}

export default ModalRating;