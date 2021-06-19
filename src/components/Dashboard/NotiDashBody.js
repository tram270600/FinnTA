import React from 'react'
import 'styles/NotiDashBody.scss'
import NotiItem from 'components/Dashboard/NotiItem'
import { Grid } from '@material-ui/core'
const NotiDashBody = () => {
    const listItem = []
    for (let i = 0; i < 10; i++) {
        listItem.push(
            <NotiItem
                title='Course Booking'
                content='Ubyiie2706 has registered to your Principle of Programming Language.'
                avatar='https://www.slashgear.com/wp-content/uploads/2017/11/pikachu-anime-980x620.jpg'
            />
        )
    }
    return (
        <div className='noti-body'>
            <div className='notidash-container'>
                <Grid spacing={0} container>
                    <Grid item >
                        {listItem}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
export default NotiDashBody