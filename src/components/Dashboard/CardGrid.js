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

const CardGrid = ({ isProgress, isTA, isStudent, uid, keyword }) => {
    const imgList = [gradient1, gradient2, gradient3, gradient4, gradient5, gradient6, gradient7, gradient8]
    const department = useTypedSelector(state => state.Department.data)
    console.log(keyword)
    const [card, setCard] = useState(<></>)
    const getCourse = useCallback(async () => {
        if (uid !== undefined) {
            let res = await talker.TA.getClassroom(uid, 0)
            console.log(res)
        } else {
            if (keyword !== undefined) {
                setCard(<></>)
                let key = '(' + keyword.replace(" ", ")|(") + ')'
                var depend = ({})
                var list = Object.keys(department).map((d_id) => {
                    return Object.keys(department[d_id].courses).filter((cid) => {
                        if (department[d_id].courses[cid].search(key) === -1)
                            return false
                        return true
                    }).map((cid) => {
                        depend[cid] = d_id
                        return cid
                    })
                }).flat()
                console.log(list)
                console.log(depend)
                let res = await talker.TA.getClassroom(({ page: 0, keyword: list }))
                console.log("res", res)
                if (res.data === null) {
                    return
                }
                let cards = res.data.map((c) => {
                    var date = new Date(c.updated_at)
                    var now = new Date()
                    return <Grid item>
                        <CardTAView
                            source={imgList[Math.floor(Math.random() * 8)]}
                            falcuty={department[depend[c.cid]]?.Name}
                            subject={department[depend[c.cid]]?.courses[c.cid]}
                            content={c.description}
                            isProgress={c.available}
                            create_at={now.getDate() - date.getDate() + " days ago"}
                            isTA={isTA}
                            isStudent={isStudent}
                        />
                    </Grid>
                })
                setCard(cards)
            }
        }
    }, [keyword])
    useEffect(() => {
        getCourse()
    }, [getCourse])
    const cardList = []

    // for (let i = 0; i < 10; i++) {
    //     cardList.push(
    //         <Grid item>
    //             <CardTAView
    //                 source={imgList[Math.floor(Math.random() * 8)]}
    //                 falcuty='Business Administration'
    //                 subject='Principles of Marketing'
    //                 content='Review chapter for midterm. This is the second part of the SMM starter pack series of articles. If you made it this far, you must be willing to learn about promoting business.'
    //                 isProgress={isProgress}
    //                 isTA={isTA}
    //                 isStudent={isStudent}
    //             />
    //         </Grid>
    //     )
    // }
    return (
        <div className='grid-container'>
            <Grid container spacing={5} direction="row">
                {card}
            </Grid>
        </div>
    )
}
export default CardGrid