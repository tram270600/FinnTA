import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/modal.scss';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import {UKeyboardDateTimePicker } from '@unicef/material-ui';
import { useState } from 'react';
import avatar from '../../images/avatar.png'
import { TextField } from '@material-ui/core';
import {
    ThemeProvider,
    createMuiTheme
  } from "@material-ui/core/styles";


const ModalEditProfile = ({ isShowingProfile, hide }) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [value, setValue] = React.useState();
    const isValid = value < 70;
    const theme = createMuiTheme({
        palette: {
          primary:  {main: '#35BBCA',}
        }
    });
    return isShowingProfile ? ReactDOM.createPortal(  
  <React.Fragment>
    <div id="myModal" class="modal">
        <div class="modal-content">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span class="close">&times;</span> 
            </button>
            <div className="modal-title">
                Edit Profile
                <h6>Provide some information for people to know about yourself </h6>
            </div>
           <div className="modal-form"> 
                <div className="user-info">
                    <img src = {avatar} alt = 'avatar' />Tram Nguyen Giang
                </div>
                <h3> General Information </h3>

                <div className="field">
                <label>Department</label>
                    <select NAME="department" SIZE="1" >
                        <option VALUE="default"> Choose your faculty </option>
                        <option VALUE="CSE">CSE - Computer Science and Engineering</option>
                        <option VALUE="BA"> BA - Business Administration </option>
                        <option VALUE="IEM">IEM - Industrial Engineering and Management </option>
                    </select>
                </div>

                <div className="field">
                        <div className="input-number">
                            <label>Birthday</label>
                            <UKeyboardDateTimePicker
                                style ={{width: '70%'}}
                                size="small"
                                value={selectedDate}
                                onChange={handleDateChange}
                                // InputLabelProps={{className: "dcm"}}
                            /> 
                        </div>
                </div>
                
                <div className="field">
                    <div className="input-number">
                        <label>Overall</label>
                        <ThemeProvider theme={theme}>
                            <CurrencyTextField
                                        style ={{width: '70%'}}
                                        // inputProps={{ style: { fontFamily: 'nunito', color: 'green',  borderColor: "yellow !important"}}}
                                        variant="standard"
                                        value={value}
                                        placeholder="Enter score"
                                        currencySymbol="/100"
                                        outputFormat="string"
                                        size = 'small'
                                        variant = 'outlined'
                                        maximumValue="100"
                                        onChange={(e, value) => setValue(value)}
                                        error={isValid}
                                        helperText={isValid && "Minimum score to become TA is 70"}
                            />     
                        </ThemeProvider>
                    </div>
                </div>
    
                <div className="field">
                    <label>Description</label>
                    <textarea rows={2} cols={45} label = "Description" placeholder="Add some description"/>
                </div>
                <h3> Contact Information </h3>
                <div className="field">
                    <div className="input-number">
                        <label>Email</label>
                        <TextField  
                                style ={{width: '70%'}}
                                size="small" 
                                id="outlined-basic" variant="outlined" placeholder="Add some description" />
                    </div>
                </div>
                <div className="field">
                    <div className="input-number">
                        <label>Phone</label> 
                        <TextField  
                                style ={{width: '70%'}}
                                size="small" 
                                id="outlined-basic" variant="outlined" placeholder="Add some description" />
                    </div>
                </div>
                <div className="field">
                    <div className="input-number">
                        <label>Social Link</label>
                        <TextField  
                                style ={{width: '70%'}}
                                size="small" 
                                id="outlined-basic" variant="outlined" placeholder="Add some description" />
                    </div>
                </div>
                <div className="Container"> 
                    <input type="submit" className="button-secondary" value="DISCARD"  onClick={hide}/>
                    <input type="submit" value="SAVE CHANGE"/>  
                </div>
                
            </div>
        </div>
    </div>
  </React.Fragment>, document.body
) : null;}

export default ModalEditProfile;