import React ,{useState} from 'react';
import '../../styles/HeroSection.css'
import {Link} from 'react-router-dom'
import background from '../../images/background.png'

const HeroSection = () => {
    const [isHover, setHover] = useState(false)
    const hoverStyle = {
        transform: 'scale(1.1)'        
    }
    return (
        <div className = 'hero-container'>
            <div className = 'background'>
                <img src = {background} />
                <Link to = '/' className = 'btn-link'>
                    <button 
                    onMouseMove = {() => setHover(true)} 
                    onMouseLeave = {() => setHover(false)} 
                    style = {isHover ? hoverStyle : null} 
                    className = 'btn-learn'
                    >Learn more
                    </button>
                </Link>
            </div>
            
        </div>
    )
}
export default HeroSection