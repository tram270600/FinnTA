import React from 'react';
import {Link} from 'react-router-dom'

const CardItem = (props) => {
    const list = props.listSubject

    const listSubject = list.map((subject) => 
        <li>{subject}</li>
    );
    return (
        <li className = 'cards-item'>
            <Link className = 'cards-item-links' to = '/'>
                <div className = 'icon'>
                    <i className="fas fa-arrow-right" />
                </div>
                <div className = 'title'>
                    <img src = {props.avatar} alt = 'Avatar' />
                    <h2>{props.name}</h2>
                </div>
                <div className = 'infor'>
                    <h3>Info</h3>
                    <p>{props.major}</p>
                    <h3>Overall: {props.gpa}</h3>
                    <h3>Subject List</h3>
                    <ul className = 'list-subject'>{listSubject}</ul>
                </div>
                <div className = 'icon'>
                    {props.star} <i className ="far fa-star" />
                </div>
            </Link>
        </li>
    )
}
export default CardItem