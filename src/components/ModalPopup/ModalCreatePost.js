import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/modal.scss';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { UKeyboardDateTimePicker } from '@unicef/material-ui';
import { useState } from 'react';
import avatar from '../../images/avatar.png'
import { TextField } from '@material-ui/core';


const ModalCreatePost = ({ isShowingCreate, hide }) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [value, setValue] = React.useState();
    const isValid = value < 70;
    return isShowingCreate ? ReactDOM.createPortal(
        <React.Fragment>
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span class="close">&times;</span>
                    </button>
                    <div className="modal-title">
                        Create a Course
                        <h6>To give an announcement about new course as tutor or to find tutor and courses as a student </h6>
                    </div>
                    <divc className="modal-form">
                        <div className="user-info">
                            <img src={avatar} alt='avatar' />Tram Nguyen Giang
                        </div>
                        <div className="field">
                            <label>Purpose</label>
                            <select NAME="department" SIZE="1">
                                <option VALUE="default"> Select Purpose of Posting </option>
                                <option VALUE="findstudent"> Announce new Course </option>
                                <option VALUE="findta"> Find Tutor for Course </option>
                                {/* <option VALUE="IEM">IEM - Industrial Engineering and Management </option> */}
                            </select>
                        </div>
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
                            <label>Subject</label>
                            <select NAME="department" SIZE="1">
                                <option VALUE="default"> Choose Subject to Teach/Study </option>
                                <option VALUE="CSE">CSE - Computer Science and Engineering</option>
                                <option VALUE="BA"> BA - Business Administration </option>
                                <option VALUE="IEM">IEM - Industrial Engineering and Management </option>
                            </select>
                        </div>
                        <div className="field">
                            <label>Description/Message</label>
                            <textarea rows={4} cols={47} label="Description" placeholder="Add some description" />

                        </div>
                        <div className="Container">
                            <input type="submit" value="CREATE COURSE" />
                        </div>

                    </divc>

                </div>

            </div>
        </React.Fragment>, document.body
    ) : null;
}

export default ModalCreatePost;