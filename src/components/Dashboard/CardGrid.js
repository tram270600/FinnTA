import React, { useCallback, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core';
import CardTAView from 'components/Dashboard/CardTAView'
import gradient1 from 'images/gradient1.svg'
import gradient2 from 'images/gradient2.svg'
import gradient3 from 'images/gradient3.svg'
import gradient4 from 'images/gradient4.svg'
import gradient5 from 'images/gradient5.svg'
import gradient6 from 'images/gradient6.svg'
import gradient7 from 'images/gradient7.svg'
import gradient8 from 'images/gradient8.svg'
import 'styles/CardGrid.scss'
import talker from 'utils/talker';
import { useTypedSelector } from 'app/store';
import avatar from 'images/avatar.svg'

const CardGrid = ({ isTA, isStudent, uid, keyword, available, role, isGuest }) => {
    const imgList = [gradient1, gradient2, gradient3, gradient4, gradient5, gradient6, gradient7, gradient8]
    const department = useTypedSelector(state => state.Department.data)
    const [card, setCard] = useState(<></>)
    const getCourse = useCallback(async () => {
        var data = ({})
        var res
        if (isStudent) {
            res = await talker.Schedule.getStudentCourse({ uid: uid, page: 0, available: available })
        } else {
            if (uid !== undefined) {
                data = ({ page: 0, uid: uid, available: available })
            } else {
                if (keyword !== undefined) {
                    setCard(<></>)
                    let key = '(' + keyword.replace(" ", ")|(") + ')'
                    var list = Object.keys(department).map((d_id) => {
                        return Object.keys(department[d_id].courses).filter((cid) => {
                            if (department[d_id].courses[cid].search(key) === -1)
                                return false
                            return true
                        }).map((cid) => cid)
                    }).flat()
                    console.log(list)
                    data = ({ page: 0, keyword: list, available: true })
                }
            }
            res = await talker.TA.getClassroom(data)
        }
        console.log("res", res)
        if (res === null) {
            return
        }
        let cards = res["Class"]?.map((c) => {
            var date = new Date(c.updated_at)
            if (res["Schedule"])
                date = new Date(res["Schedule"].startDate)
            var now = new Date()

            let falcuty = Object.keys(department).filter((d_id) => {
                if (department[d_id].courses[c.cid] === undefined)
                    return false
                return true
            }).map((d_id) => d_id)[0]
            let ava = res["T.A"][c.uid].Avatar
            if (!ava)
                ava = avatar

            return <Grid item>
                <CardTAView
                    source={imgList[Math.floor(Math.random() * 8)]}
                    falcuty={department[falcuty]?.name}
                    subject={department[falcuty]?.courses[c.cid]}
                    content={c.description}
                    isProgress={available}
                    create_at={now.getDate() - date.getDate() + " days ago"}
                    isTA={isTA}
                    isStudent={isStudent}
                    name={res["T.A"][c.uid].Name}
                    avatar={ava}
                    uid={c.uid}
                    role = {role}
                    isGuest = {isGuest}
                />
            </Grid>
        })
        setCard(cards)
    }, [uid, keyword])
    useEffect(() => {
        getCourse()
    }, [getCourse])
    return (
        <div className='grid-container'>
            <Grid container spacing={5} direction="row">
                {card}
            </Grid>
        </div>
    )
}
export default CardGrid