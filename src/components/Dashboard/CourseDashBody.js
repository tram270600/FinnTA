import 'styles/DashCourse.scss'
import filter from 'images/filter.svg'
import CardGrid from './CardGrid';
import talker from 'utils/talker';
import { useCallback, useState, useEffect } from 'react';
import { useTypedSelector } from 'app/store';

const CourseDashBody = ({ uid, isGuest, viewer_role }) => {
    const [data, setData] = useState({})
    const getInfo = useCallback(async () => {
        if (isGuest) {
            const res = await talker.Account.getAccount({ ID: uid })
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
    const department = useTypedSelector(state => state.Department.data)
    const account = useTypedSelector(state => state.Account.data)
    useEffect(() => {
        getInfo()
    }, [getInfo])
    return (
        <div className='dashcourse-container'>
            <div className='dash-grid'>
                <div className='dash-title'>
                    <span>Progressing Course</span>
                    <div className='filter'>
                        <img src={filter} alt='filter' />
                        <span>Filter</span>
                    </div>
                </div>
                <CardGrid
                    uid={data._id}
                    available={true}
                    role={data.Role}
                    isGuest={isGuest}
                />
            </div>
            <div className='dash-grid'>
                <div className='dash-title'>
                    <span>History Course</span>
                </div>
                <CardGrid
                    uid={data._id}
                    available={false}
                    role={data.Role}
                    isGuest={isGuest}
                />
            </div>
        </div>
    )
}
export default CourseDashBody