import React from 'react'
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

const CardGrid = ({isProgress, isTA}) => {
    const imgList = [gradient1, gradient2, gradient3, gradient4, gradient5, gradient6, gradient7, gradient8]
    
    const cardList = []

    for (let i = 0; i < 10; i++) {
        cardList.push(
        <Grid item>
            <CardTAView
                source={imgList[Math.floor(Math.random() * 8)]}
                falcuty='Business Administration'
                subject='Principles of Marketing'
                content='Review chapter for midterm. This is the second part of the SMM starter pack series of articles. If you made it this far, you must be willing to learn about promoting business.'
                isProgress={isProgress}
                isTA = {isTA}
            />
        </Grid>
        )
    }
    return (
        <div className='grid-container'>
            <Grid container spacing={5} direction="row">
                {cardList}
            </Grid>
        </div>
    )
}
export default CardGrid