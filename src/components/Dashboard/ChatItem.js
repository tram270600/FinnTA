import React, { useState } from 'react'
import 'styles/ChatItem.scss'
const ChatItem = ({src, name, time, mss}) => {
    
    const [isChoose, setChoose] = useState(false)
    
    const backgroundStyle = {
        background: "linear-gradient(142.25deg, #35BBCA 20.3%, #0191B4 74.69%)",
    }
    const fontStyle = {
        color: "white"
    }

    return (
        <div 
            style = {isChoose ? backgroundStyle : null} className = 'chatitem-container' 
            onClick = {(event) => setChoose(!isChoose)}>

            <div className = 'chatitem-head'>
                <div className = 'infor'>
                    <img src = {src} alt = 'avt' />
                    <span style = {isChoose ? fontStyle : null}>{name}</span>
                </div>
                <div className = 'time'>
                    <span style = {isChoose ? fontStyle : null}>{time}</span>
                </div>
            </div>
            <div className = 'chatitem-body'>
                <p style = {isChoose ? fontStyle : null}>{mss}</p>
            </div>
        </div>
    )
}
export default ChatItem