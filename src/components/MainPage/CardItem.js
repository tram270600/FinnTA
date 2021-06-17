import React from 'react';
import { Link } from 'react-router-dom'

const CardItem = (props) => {
    const list = props.listSubject

    const listSubject = list.map((subject) =>
        <li>{subject}</li>
    );
    return (
        <div className='cards-item'>
            <div className='cards-item-links' to='/'>
                <div class='cards-gradient' style={{ background: `${props.background}`, marginTop: "0px" }}>
                    <Link to={`/profile/${props.uid}`} className='icon' style={{ color: 'white' }}>
                        <i className="fas fa-arrow-right" />
                    </Link>
                    <div className="avatar">
                        <img src={props.avatar} alt='Avatar' />
                    </div>

                </div>
                <div className="content">
                    <div style={{ color: `${props.color}` }} className='title'>
                        {/* <img src = {props.avatar} alt = 'Avatar' /> */}
                        <h2>{props.name}</h2>
                    </div>
                    <div style={{ color: `${props.color}` }} className='infor'>
                        <h3>INFO</h3>
                        <p>{props.major}</p>
                        Overall: <span>{props.gpa}</span>
                        <h3>SUBJECT LIST</h3>
                        <div className='list-subject'>{listSubject}</div>
                    </div>

                </div>
                <div className='icon bottom'>
                    {props.star} <i className="fas fa-star" style={{ color: "#FFC87B" }} />
                </div>
            </div>
        </div>
    )
}
export default CardItem