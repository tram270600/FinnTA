import React, { useState } from 'react';
import '../../styles/HeroSection.css'
import { Link } from 'react-router-dom'
import background from '../../images/background.svg'

const HeroSection = () => {
    const [isHover, setHover] = useState(false)
    const hoverStyle = {
        transform: 'scale(1.1)'
    }
    return (
        <div id = 'hero-container' className='hero-container'>
            <div className='text'>
                <h2>Better learn your friend than your teacher</h2>
                <h4>The most beautiful thing about learning is that no one take away from you</h4>
                <Link to='/signup' className='btn-link'>
                    <button
                        onMouseMove={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        style={isHover ? hoverStyle : null}
                        className='btn-learn'
                    >Learn more
                        </button>
                </Link>
            </div>
            <div className='img'>
                <img src={background} />
            </div>
        </div>

    )
}
export default HeroSection