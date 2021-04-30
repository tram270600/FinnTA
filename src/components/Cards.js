import React from 'react';
import CardItem from './CardItem'
import './styles/Cards.css'

const Card = () => {
    return (
        <div className = 'cards'>
            <div className = 'text-container'>
                <h1>Teaching Assistant Around You</h1>
            </div>
            <div className = 'text-container'>
                <h3>Finding Tutor that suits with your requirement who are able to help you to boost up your marks</h3>
            </div>
            
            <div className = 'cards-container'>
                <div className = 'cards-wrapper'>
                    <ul className = 'cards-items'>
                        <CardItem 
                            avatar = 'https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png'
                            name = 'Mario Nguyen'
                            major = 'Computer Science and Engineering'
                            gpa = '80'
                            star = '5'
                            listSubject = {['Principle of Database Management','Digital Logic Design','Calculus']}
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Card