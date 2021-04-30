import React from 'react';
import {Link} from 'react-router-dom'

const CardItem = (props) => {
    const list = props.listSubject

    const listSubject = list.map((subject) => 
        <li>{subject}</li>
    );
    return (
        <li style = {{backgroundColor: `${props.background}`}} className = 'cards-item'>
            <div className = 'cards-item-links' to = '/'>
                <Link style = {{color: `${props.color}`}} className = 'icon'>
                    <i className="fas fa-arrow-right" />
                </Link>
                <div style = {{color: `${props.color}`}} className = 'title'>
                    <img src = {props.avatar} alt = 'Avatar' />
                    <h2>{props.name}</h2>
                </div>
                <div style = {{color: `${props.color}`}} className = 'infor'>
                    <h3>Info</h3>
                    <p>{props.major}</p>
                    Overall: <span>{props.gpa}</span>
                    <h3>Subject List</h3>
                    <ul className = 'list-subject'>{listSubject}</ul>
                </div>
                <div className = 'icon bottom'>
                    {props.star} <i className ="far fa-star" />
                </div>
            </div>
        </li>
    )
}
export default CardItem