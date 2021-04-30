import React ,{useState} from 'react';
import './styles/HeroSection.css'
import {Link} from 'react-router-dom'

const HeroSection = () => {
    const [isHover, setHover] = useState(false)
    const hoverStyle = {
        transform: 'scale(1.1)'        
    }
    return (
        <div className = 'hero-container'>
            <Link 
            to = '/' 
            className = 'btn-link'>
                <button 
                onMouseMove = {() => setHover(true)} 
                onMouseLeave = {() => setHover(false)} 
                style = {isHover ? hoverStyle : null} 
                className = 'btn-learn'
                >Learn more</button>
            </Link>
        </div>
    )
}
export default HeroSection