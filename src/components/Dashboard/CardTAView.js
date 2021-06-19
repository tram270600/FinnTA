import React from 'react'
import eye from 'images/eyes.svg'
import avatar from 'images/avatar.png'
import 'styles/Card.scss'

const CardTAView = ({ source, falcuty, subject, content, create_at, isProgress, isTA, isStudent }) => {

    const style = {
        color: "#C4C4C4"
    }
    const display = {
        display: "none"
    }
    const colorText = {
        color: "#FE7A15"
    }

    return (
        <div className='card-container'>
            <div className='img'>
                <img src={source} alt='background' />
            </div>
            <div className='content'>
                <div className='falcuty'>
                    <span style={isProgress ? null : style} className='title1'>{falcuty}</span>
                    <span className='title2'>{create_at ?? ''}</span>
                </div>
                <div className='text'>
                    <h3 style={isProgress ? null : style}>{subject}</h3>
                    <p style={isProgress ? null : style}>{content}</p>
                </div>
                {isTA ?
                    <>
                        <div className='footer'>
                            <div className='view'>
                                <img src={eye} alt='eye' />
                                <a href='#'>{isProgress ? 'View participants' : 'View ratings'}</a>
                            </div>
                            <div className='option'>
                                <button className='ta' style={isTA ? null : display}> {isProgress ? 'Edit' : 'Reopen'}</button>
                                <button className={isProgress ? 'other' : 'other booked'} style={isTA ? display : null}>{isProgress ? 'Book' : 'Booked'}</button>
                            </div>
                        </div>
                    </>
                    : isStudent ?
                        <>
                            <div className='footer'>
                                <div className='view'>
                                    <img className='student-avatar' src={avatar} alt='avatar' />
                                    <a href='#' style={isProgress ? null : colorText}>Mario Nguyen</a>
                                </div>
                                <div className='option'>
                                    <button className='ta' style={isStudent ? null : display}>
                                        {isProgress ? 'Edit' : <button className='rate'>Rate</button>}
                                    </button>
                                </div>
                            </div>
                        </>
                        : null
                }
            </div>
        </div>
    )
}
export default CardTAView