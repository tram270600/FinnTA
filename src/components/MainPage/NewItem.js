import React, {useState} from 'react'
import './styles/News.css'

const NewItem = (props) => {
    const [isCardHover, setCardHover] = useState(false)
    return (
        <div
        style = {isCardHover ? props.style : null}
        className = 'new-container' 
        onMouseMove = {(event) => setCardHover(true)}
        onMouseLeave = {(event) => setCardHover(false)}
        >
            <div  className = 'titles'>
                <img src = {props.avatar} alt = 'Avatar' />
                <h2>{props.name}</h2>
                <div className = 'icons'>
                    {props.star} <i className ="far fa-star" />
                </div>
            </div>
            <p className = 'text'>{props.comment}</p>
        </div>
    )
}
export default NewItem