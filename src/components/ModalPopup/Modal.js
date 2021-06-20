import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/modal.scss';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { useState } from 'react';
import { useTypedSelector } from 'app/store';
import talker from 'utils/talker';
import { Redirect } from 'react-router-dom';

const unitDuration = ["day", "month", "year"]
const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const Modal = ({ isShowing, hide }) => {

    const [data, setData] = useState({
        c_id: '',
        price: 0,
        duration: '',
        GPA: undefined,
        date: dayOfWeek.reduce((data, _, idx) => ({ ...data, [idx]: false }), {}),
        description: '',
        available: false,
    })
    const [unit, setUnit] = useState('day')

    const isValid = data.GPA < 70;

    const department = useTypedSelector(state => state.Department.data)
    const [depart, setDepart] = useState(Object.keys(department)[0])
    // console.log(data)
    const [redirect, setRedirect] = useState(false)
    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'duration')
            value += ` ${unit}`
        setData({
            ...data,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await talker.TA.createClass(data)
        if (typeof res === 'string') {
            alert(res)
            return
        }
        setRedirect(true)
    }
    if (redirect)
        return <Redirect to='/' />

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
                    <form className="modal-form" onSubmit={handleSubmit}>
                        <h3> Course Information </h3>
                        <div className="field">
                            <label>Department</label>
                            <select NAME="department" SIZE="1" onChange={(e) => { setDepart(e.target.value) }}>
                                {Object.keys(department).map((id) => {
                                    return <option key={id} value={id}>{department[id].name}</option>
                                })}
                            </select>
                        </div>
                        <div className="field">
                            <label>Name of Subject</label>
                            <select NAME="c_id" SIZE="1" onChange={handleChange}>
                                <option VALUE="default"> Choose your desired subject </option>
                                {
                                    Object.keys(department[depart]?.courses).map((id) => {
                                        return <option key={id} value={id}>{department[depart]?.courses[id]}</option>
                                    })}
                            </select>
                        </div>
                        <div className="field">
                            <div className="input-number">
                                <label>Price</label>
                                <CurrencyTextField
                                    style={{ width: '70%' }}
                                    // label="Amount"
                                    variant="standard"
                                    // value={value}
                                    placeholder="Enter price"
                                    currencySymbol="$"
                                    outputFormat="string"
                                    size='small'
                                    variant='outlined'
                                    name="price"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>


                        <div className="field">
                            <div className="input-number">
                                <label>Duration</label>
                                <input type="number" name="duration"
                                    onChange={handleChange}
                                />
                                <select NAME="unit" SIZE="1" onChange={(e) => { setUnit(e.target.value) }}>
                                    {unitDuration.map((unit, idx) => <option key={idx} value={unit}>{unit}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="field">
                            {dayOfWeek.map((day, i) => {
                                return <button
                                    key={i}
                                    style={{ background: data['date'][day] ? "cyan" : "white" }}
                                    onClick={() => {
                                        var temp = { ...data['date'] }
                                        temp[day] = !temp[day]
                                        setData({
                                            ...data,
                                            ['date']: temp
                                        })
                                    }}>{day}</button>
                            })}
                        </div>
                        <div className="field">
                            <input type="checkbox" onClick={() => {
                                setData({
                                    ...data,
                                    ['available']: !data['available']
                                })
                            }} /> Available
                        </div>
                        <h3> Teaching Assistant Information </h3>
                        <div className="field">
                            <div className="input-number">
                                <label>GPA</label>
                                <CurrencyTextField
                                    style={{ width: '70%' }}
                                    // label="Score"
                                    variant="standard"
                                    value={data.GPA}
                                    placeholder="Enter score"
                                    currencySymbol="/100"
                                    outputFormat="string"
                                    size='small'
                                    variant='outlined'
                                    // minimumValue="70"
                                    maximumValue="100"
                                    helperText="Minimum score to start course is 70"
                                    name="GPA"
                                    onChange={handleChange}
                                    error={isValid}
                                    helperText={isValid && "Minimum score to start course is 70"}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Description/Message</label>
                            <textarea rows={4} cols={47} label="Description" placeholder="Add some description"
                                name="description" onChange={handleChange} />
                        </div>
                        <div className="Container">
                            <input type="submit" value="CREATE COURSE" />
                        </div>
                    </form>

                </div>

            </div>
        </React.Fragment>, document.body
    ) : null;
}

export default Modal;