import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/modal.scss';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import {UKeyboardDateTimePicker } from '@unicef/material-ui';
 import { useState } from 'react';
import { TextField } from '@material-ui/core';


const Modal = ({ isShowing, hide }) => {
const [selectedDate, handleDateChange] = useState(new Date());
const [value, setValue] = React.useState(100);
const isValid = value < 1000;
    return isShowing ? ReactDOM.createPortal(  
  <React.Fragment>
    <div id="myModal" class="modal">
        <div class="modal-content">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span class="close">&times;</span> 
            </button>
            <div className="modal-title">
                Start a Course
                <h6>Start a new course to teach </h6>
            </div>
           <divc className="modal-form"> 
                <h3> Course Information </h3>
                <div className="field">
                <label>Department</label>
                    <select NAME="department" SIZE="1">
                        <option VALUE="default"> Choose your faculty </option>
                        <option VALUE="CSE">CSE - Computer Science and Engineering</option>
                        <option VALUE="BA"> BA - Business Administration </option>
                        <option VALUE="IEM">IEM - Industrial Engineering and Management </option>
                    </select>
                </div>
                <div className="field">
                <label>Name of Subject</label>
                    <select NAME="department" SIZE="1">
                        <option VALUE="default"> Choose your faculty </option>
                        <option VALUE="CSE">CSE - Computer Science and Engineering</option>
                        <option VALUE="BA"> BA - Business Administration </option>
                        <option VALUE="IEM">IEM - Industrial Engineering and Management </option>
                    </select>
                </div>
                <div className="field">
                    <div className="input-number">
                        <label>Price</label>
                        <CurrencyTextField
                            label="Amount"
                            variant="standard"
                            // value={value}
                            placeholder="Enter price"
                            currencySymbol="$"
                            outputFormat="string"
                            size = 'small'
                            variant = 'outlined'
                            // onChange={(event, value)=> setValue(value)}
                        />
                    </div>
                </div>
                
                
                <div className="field">
                    <div className="input-number">
                        <label>Date</label>
                        <UKeyboardDateTimePicker
                        label="Date and Time"
                        size="small"
                        colors="red"
                        // value={selectedDate}
                        // onChange={handleDateChange}
                        // InputLabelProps={{className: "dcm"}}
                        /> 
                    </div>
                </div>
                <h3> Teaching Assistant Information </h3>
                <div className="field">
                    <div className="input-number">
                    <label>GPA</label>
                    <CurrencyTextField
                            label="Score"
                            variant="standard"
                            // value={value}
                            placeholder="Enter score"
                            currencySymbol="/100"
                            outputFormat="string"
                            size = 'small'
                            variant = 'outlined'
                            // minimumValue="70"
                            maximumValue="100"
                            helperText="Minimum score to start course is 70"
                            // onChange={(e, value) => setValue(value)}
		                    // error={isValid}
		                    // helperText={isValid && "Minimum score to start course is 70"}
                        />
                    </div>
                </div>
                <div className="field">
                <label>Description/Message</label>
                <textarea rows={4} cols={45} label = "Description" placeholder="Add some description"/>
                    
                </div>
                <div className="Container"> 
                    <input type="submit" value="CREATE COURSE"/>  
                </div>
            </divc>
            
        </div>

    </div>
  </React.Fragment>, document.body
) : null;}

export default Modal;