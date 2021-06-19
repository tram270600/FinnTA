import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/modal.scss';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { UKeyboardDateTimePicker } from '@unicef/material-ui';
import { useState } from 'react';
import avatar from '../../images/avatar.png'
import { TextField } from '@material-ui/core';
import calendartick from '../../images/calendartick.svg';
import {
    ThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";


const ModalConfirmTeach = ({ isShowingConfirmTeach, hide }) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [valuep, setValueP] = React.useState();
    const theme = createMuiTheme({
        palette: {
            primary: { main: '#35BBCA', }
        }
    });
    return isShowingConfirmTeach ? ReactDOM.createPortal(
        <React.Fragment>
            <div id="myModal" class="modal">
                <div class="modal-content" style={{ borderRadius: "50px", padding: "5px 10px 15px" }}>
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span class="close">&times;</span>
                    </button>
                    <img src={calendartick} alt='calendartick' style={{ margin: "3% auto" }} />
                    <div className="modal-title">
                        Your course is booked !
                        <h6>Check and confirm the booking information carefully </h6>
                    </div>
                    <div className="modal-form">
                        <h3> Course Information </h3>

                        <div className="field">
                            <div className="input-number">
                                <label>Subject</label>
                                <TextField
                                    style={{ width: '70%' }}
                                    size="small"
                                    id="outlined-basic" variant="outlined" placeholder="Add some description" />
                            </div>
                        </div>

                        <div className="field">
                            <div className="input-number">
                                <label>Date - Time</label>
                                <UKeyboardDateTimePicker
                                    style={{ width: '70%' }}
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
                                        style={{ width: '70%' }}
                                        // inputProps={{ style: { fontFamily: 'nunito', color: 'green',  borderColor: "yellow !important"}}}
                                        variant="standard"
                                        value={valuep}
                                        placeholder="Enter price"
                                        currencySymbol="$"
                                        outputFormat="string"
                                        size='small'
                                        variant='outlined'
                                        minimumValue="0"
                                        onChange={(e, valuep) => setValueP(valuep)}
                                    />
                                </ThemeProvider>
                            </div>
                        </div>

                        <h3> Student Information </h3>
                        <div className="field">
                            <div className="input-number">
                                <label>Student</label>
                                <div className="user-info" style={{ width: "70%", marginLeft: "50px" }}>
                                    <img src={avatar} alt='avatar' />Tram Nguyen Giang
                                </div>
                            </div>
                        </div>
                        <div className="Container">
                            <input type="submit" value="I GOT IT, ACCEPT BOOKING" style={{ borderRadius: "50px" }} onClick={hide} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>, document.body
    ) : null;
}

export default ModalConfirmTeach;