import React from 'react'
import eye from 'images/eyes.svg'
import 'styles/Card.scss'

const CardTAView = ({source, falcuty, subject, content, isProgress}) => {
    
    const style = {
        color: "#C4C4C4"
    }

    return (
        <div className = 'card-container'>
            <div className = 'img'>
                <img src ={source} alt = 'background' />
            </div>
            <div className = 'content'>
                <div className = 'falcuty'>
                    <span style = {isProgress ? null : style} className = 'title1'>{falcuty}</span>
                    <span className = 'title2'>{isProgress ? '5 days ago' : ''}</span>
                </div>
                <div className = 'text'>
                    <h3 style = {isProgress ? null : style}>{subject}</h3>
                    <p style = {isProgress ? null : style}>{content}</p>
                </div>
                <div className = 'footer'>
                    <div className = 'view'>
                        <img src = {eye} alt = 'eye' />
                        <a href = '#'>{isProgress ? 'View participants' : 'View ratings'}</a>
                    </div>
                    <div className = 'option'>
                        <a href = '#'>{isProgress ? 'Edit' : 'Reopen'}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardTAView