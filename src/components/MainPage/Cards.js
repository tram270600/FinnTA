import React from 'react';
import CardItem from './CardItem'
import '../../styles/Cards.scss'
import Fade from 'react-reveal/Fade';

const Card = () => {
    return (
        <Fade duration={2300} left>
          <div className = 'cards'>
            <div className = 'text-container'>
                <h1>Teaching Assistant Around You</h1>
            </div>
            <div className = 'text-container'>
                <h3>Finding Tutor that suits with your requirement who are able to help you to boost up your marks</h3>
            </div>
            
            <div className = 'cards-container'>
                <div className = 'cards-wrapper'>
                    <div className = 'cards-items'>
                        <CardItem 
                            avatar = 'https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png'
                            name = 'Doraemon'
                            major = 'Computer Science and Engineering'
                            gpa = '80'
                            star = '5'
                            background = 'linear-gradient(180deg, #0191B4 0%, #35BBCA 100%)'
                            color = '#231F20'
                            listSubject = {['Principle of Database Management','Digital Logic Design','Calculus']}
                        />
                        <CardItem 
                            avatar = 'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2019/08/17/nobita.jpg'
                            name = 'Nobita'
                            major = 'Business Administration'
                            gpa = '76.5'
                            star = '4.5'
                            background = 'linear-gradient(180deg, #FE7A15 0%, #FFAF72 100%)'
                            color = '#231F20'
                            listSubject = {['E-Commerce','Micro Economic','Macro Economic','Financial Accounting']}
                        />
                    </div>
                    <div className = 'cards-items'>
                        <CardItem 
                            avatar = 'https://thuviendohoa.vn/upload/images/items/hinh-anh-nhan-vat-xuka-shizuka-doraemon-png-630.jpg'
                            name = 'Xuka'
                            major = 'Biotechnology'
                            gpa = '85'
                            star = '3.5'
                            background = 'linear-gradient(180deg, #A64DFF 0%, #C68BFF 100%)'
                            color = '#231F20'
                            listSubject = {['Calculus 2','Chem Lab']}
                        />
                        <CardItem 
                            avatar = 'https://photo-baomoi.zadn.vn/w700_r1/2019_08_28_304_31996919/a32bd9c43b84d2da8b95.jpg'
                            name = 'Chaien'
                            major = 'Electronic of Engineering'
                            gpa = '78.8'
                            star = '4'
                            background = 'linear-gradient(180deg, #FE7A15 0%, #FFAF72 100%)'
                            color = '#231F20'
                            listSubject = {['Embedded','Physics 2','Digital Logic Design','Calculus']}
                        />
                        <CardItem 
                            avatar = 'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/173675054_1559121364419800_5783364412267366985_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=iYlzD0IeYT4AX8hCA2y&_nc_ht=scontent-hkg4-1.xx&oh=72b4b5442405e38859a0b3c1f8c1e06f&oe=60E0E4ED'
                            name = 'Mario'
                            major = 'Business Administration'
                            gpa = '76.5'
                            star = '4.5'
                            background = 'linear-gradient(180deg, #709CFF 0%, #64CDFF 100%)'
                            color = '#231F20'
                            listSubject = {['E-Commerce','Micro Economic','Macro Economic','Financial Accounting']}
                        />
                    </div>
                </div>
            </div>
        </div>
        </Fade>
    )
}
export default Card