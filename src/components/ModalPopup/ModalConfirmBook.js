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


const ModalConfirmBook = ({ isShowingBook, hide }) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [value, setValue] = React.useState();
    const [valuep, setValueP] = React.useState();
    const theme = createMuiTheme({
        palette: {
          primary:  {main: '#35BBCA',}
        }
    });
    return isShowingBook ? ReactDOM.createPortal(  
  <React.Fragment>
    <div id="myModal" class="modal">
        <div class="modal-content">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span class="close">&times;</span> 
            </button>
            <div className="modal-title">
            Booking Confirmation
                <h6>Register a course to study </h6>
            </div>
           <div className="modal-form"> 
                <div className="user-info">
                    <img src = {avatar} alt = 'avatar' />Tram Nguyen Giang
                </div>
                <h3> Course Information </h3>

                <div className="field">
                <label>Subject</label>
                    <select NAME="subject" SIZE="1" >
                        <option VALUE="default"> Choose Subject to Book </option>
                        <option VALUE="CSE">CSE - Computer Science and Engineering</option>
                        <option VALUE="BA"> BA - Business Administration </option>
                        <option VALUE="IEM">IEM - Industrial Engineering and Management </option>
                    </select>
                </div>

                <div className="field">
                        <div className="input-number">
                            <label>Date - Time</label>
                            <UKeyboardDateTimePicker
                                style ={{width: '70%'}}
                                size="small"
                                value={selectedDate}
                                onChange={handleDateChange}
                            /> 
                        </div>
                </div>
                
                <div className="field">
                    <div className="input-number">
                        <label>Price</label>
                        <ThemeProvider theme={theme}>
                            <CurrencyTextField
                                        style ={{width: '70%'}}
                                        // inputProps={{ style: { fontFamily: 'nunito', color: 'green',  borderColor: "yellow !important"}}}
                                        variant="standard"
                                        value={valuep}
                                        placeholder="Enter price"
                                        currencySymbol="$"
                                        outputFormat="string"
                                        size = 'small'
                                        variant = 'outlined'
                                        minimumValue="0"
                                        onChange={(e, valuep) => setValueP(valuep)}
                            />     
                        </ThemeProvider>
                    </div>
                </div>

                <h3> Teaching Assistant Information </h3>
                <div className="field">
                    <div className="input-number">
                        <label>Tutor's Name</label>
                        <TextField  
                                style ={{width: '70%'}}
                                size="small" 
                                id="outlined-basic" variant="outlined" placeholder="Add some description" />
                    </div>
                </div>
                <div className="field">
                    <div className="input-number">
                        <label>GPA</label>
                        <ThemeProvider theme={theme}>
                            <CurrencyTextField
                                        style ={{width: '70%'}}
                                        variant="standard"
                                        value={value}
                                        placeholder="Enter score"
                                        currencySymbol="/100"
                                        outputFormat="string"
                                        size = 'small'
                                        variant = 'outlined'
                                        maximumValue="100"
                                        onChange={(e, value) => setValue(value)}
                            />     
                        </ThemeProvider>
                    </div>
                </div>
                <div className="Container"> 
                    <input type="submit" value="REGISTER COURSE"/>  
                </div>
                
            </div>
        </div>
    </div>
  </React.Fragment>, document.body
) : null;}

export default ModalConfirmBook;