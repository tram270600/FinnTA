import React from 'react';
import CardItem from './CardItem'
import './styles/Cards.css'
import Fade from 'react-reveal/Fade';

const Card = () => {
    return (
        <Fade left>
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
                            name = 'Doraemon'
                            major = 'Computer Science and Engineering'
                            gpa = '80'
                            star = '5'
                            background = '#0191B4'
                            color = '#fff'
                            listSubject = {['Principle of Database Management','Digital Logic Design','Calculus']}
                        />
                        <CardItem 
                            avatar = 'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2019/08/17/nobita.jpg'
                            name = 'Nobita'
                            major = 'Business Administration'
                            gpa = '76.5'
                            star = '4.5'
                            background = '#6C5CE7'
                            color = '#fff'
                            listSubject = {['E-Commerce','Micro Economic','Macro Economic','Financial Accounting']}
                        />
                    </ul>
                    <ul className = 'cards-items'>
                        <CardItem 
                            avatar = 'https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png'
                            name = 'Doraemon'
                            major = 'Computer Science and Engineering'
                            gpa = '80'
                            star = '5'
                            background = '#A29BFE'
                            color = 'black'
                            listSubject = {['Principle of Database Management','Digital Logic Design','Calculus']}
                        />
                        <CardItem 
                            avatar = 'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2019/08/17/nobita.jpg'
                            name = 'Nobita'
                            major = 'Business Administration'
                            gpa = '76.5'
                            star = '4.5'
                            background = '#1A7291'
                            color = '#fff'
                            listSubject = {['E-Commerce','Micro Economic','Macro Economic','Financial Accounting']}
                        />
                        <CardItem 
                            avatar = 'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2019/08/17/nobita.jpg'
                            name = 'Nobita'
                            major = 'Business Administration'
                            gpa = '76.5'
                            star = '4.5'
                            background = '#5DE2E8'
                            color = 'black'
                            listSubject = {['E-Commerce','Micro Economic','Macro Economic','Financial Accounting']}
                        />
                    </ul>
                </div>
            </div>
        </div>
        </Fade>
    )
}
export default Card