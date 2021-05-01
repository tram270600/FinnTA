import React from 'react'
import './styles/News.css'

const NewItem = (props) => {
    return (
        <div className = 'new-container'>
            <div className = 'titles'>
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