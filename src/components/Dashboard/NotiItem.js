import React from 'react'
import 'styles/NotiItem.scss'

const NotiItem = ({title, content, avatar}) => {
    return (
        <div className = 'item-container'>
            <div className = 'item-content'>
                <span>{title}</span>
                <p>{content}</p>
            </div>
            <div className = 'avatar'>
                <img src = {avatar}/>
            /</div>
        </div>
    )
}
export default NotiItem