import { useCallback, useEffect, useState } from 'react';
import cap from 'images/cap.svg'
import envelope from 'images/envelope.svg'
import phone from 'images/phone.svg'
import score from 'images/score.svg'
import user from 'images/user.svg'
import bd from 'images/bd.svg'
import line from 'images/line.svg'
import star from 'images/star.svg'
import course from 'images/response.svg'
import clock from 'images/clock.svg'
import filter from 'images/filter.svg'
import CardGrid from 'components/Dashboard/CardGrid'
import ButtonTA from 'components/Dashboard/ButtonTA'
import ButtonTAother from 'components/Dashboard/ButtonTAother'
import ButtonStudent from './ButtonStudent';
import 'styles/DashProfile.css';
import 'styles/Signup.scss'
import talker from 'utils/talker';
import { useTypedSelector } from 'app/store';


const ProfileDashBody = ({ isTA, role, uid }) => {
    const [data, setData] = useState({})
    const getInfo = useCallback(async () => {
        if (!isTA) {
            const res = await talker.Account.getAccount({ ID: uid })

            console.log(res)
            if ((typeof res) === 'string') {
                alert(res)
                return
            }
            let date = new Date(res.DoB)
            res.DoB = date.toLocaleDateString()
            setData(res)
        }
        else setData(account)
    }, [uid])

    const account = useTypedSelector(state => state.Account.data)
    const department = useTypedSelector(state => state.Department.data)

    useEffect(() => {
        getInfo()
    }, [])


    return (
        <>
            <div className='dash-infor'>
                <div className='dash-contact-container'>
                    <div className='dash-contact'>
                        <div className='contact general'>
                            <h3>General Information</h3>
                            <div className='content-dash'>
                                <img src={cap} alt='Cap' />
                                <div>Department: <span>{department[data.d_id]?.name}</span></div>
                            </div>
                            <div className='content-dash'>
                                <img src={score} alt='Score' />
                                <div>Overall: <span>{data.GPA}</span></div>
                            </div>
                            <div className='content-dash'>
                                <img src={bd} alt='birthday' />
                                <div>Date of birth: <span>{data.DoB}</span></div>
                            </div>
                        </div>
                        <div className='contact social'>
                            <h3>Contact</h3>
                            <div className='content-dash'>
                                <img src={envelope} alt='Email' />
                                <div>Email: <span>{data.Email}</span></div>
                            </div>
                            <div className='content-dash'>
                                <img src={phone} alt='Phone' />
                                <div>Phone: <span>{data.Phone}</span></div>
                            </div>
                            <div className='content-dash'>
                                <img src={user} alt='User' />
                                <div>Social: <span>facebook.com/ubyii</span></div>
                            </div>
                        </div>
                    </div>
                    <div className='dash-describe'>
                        <p>{data.Bio}</p>
                    </div>
                </div>
                <div className='dash-button'>
                    <div className='button-container' >
                        {(role == "T.A") ? <ButtonTA /> : (role == "Student") ? <ButtonStudent /> : <ButtonTAother />}
                    </div>
                    {(role == "T.A") ? <>
                        <div className='rating-container'>
                            <div className='rating-gap'>
                                <div className='rating-content'>
                                    <img src={star} alt='star' />
                                    <span>{data.Rate}</span>
                                </div>
                                <h5>Rating</h5>
                            </div>
                            <img src={line} alt='line' />
                            <div className='rating-gap'>
                                <div className='rating-content'>
                                    <img src={course} alt='course' />
                                    <span>20</span>
                                </div>
                                <h5>Courses</h5>
                            </div>
                            <img src={line} alt='line' />
                            <div className='rating-gap'>
                                <div className='rating-content'>
                                    <img src={clock} alt='clock' />
                                    <span>In few minutes</span>
                                </div>
                            </div>
                        </div>
                    </>
                        :
                        null
                    }

                    <div className='follow-container'>
                        <div className='follow-child'>
                            <h3>100</h3>
                            <h4>Posts</h4>
                        </div>
                        <div className='follow-child'>
                            <h3>100K</h3>
                            <h4>Followers</h4>
                        </div>
                        <div className='follow-child'>
                            <h3>400K</h3>
                            <h4>Following</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dash-grid'>
                <div className='dash-title'>
                    <span>Progressing Course</span>
                    <div className='filter'>
                        <img src={filter} alt='filter' />
                        <span>Filter</span>
                    </div>
                </div>
                <CardGrid
                    available={true}
                    uid={account._id}
                    isTA={isTA}
                    role = {role}
                />
            </div>

        </>
    )
}
export default ProfileDashBody