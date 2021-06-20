import React from 'react'
import eye from 'images/eyes.svg'
import 'styles/Card.scss'
import { Link } from 'react-router-dom'
import useModal from 'components/ModalPopup/useModal';
import ModalConfirmBook from 'components/ModalPopup/ModalConfirmBook';

const CardTAView = ({ source, falcuty, subject, content, create_at, isProgress,
    isTA, isStudent, role, isGuest,
    name, avatar, uid }) => {

    const style = {
        color: "#C4C4C4"
    }
    const display = {
        display: "none"
    }
    const colorText = {
        color: "#FE7A15"
    }
    const { isShowingBook, toggleBook } = useModal();

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

                <div className='footer'>
                    <div className='view'>
                        {(role == "T.A") ?
                            <>
                                <img src={eye} alt='eye' />
                                <a href='#'>{isProgress ? 'View participants' : 'View ratings'}</a>
                            </>
                            :
                            <>
                                <img className='student-avatar' src={avatar} alt='avatar' />
                                <Link to={`/profile/${uid}`} style={isProgress ? null : colorText}>{name}</Link>
                            </>
                        }
                    </div>
                    <div className='option'>

                        <button className='ta' style={((role == "Student") && (!isGuest)) ? null : display}>
                            {isProgress ? 'Edit' : <button className='rate'>Rate</button>}
                        </button>

                        <button className='ta' style={((role == "T.A") && (!isGuest)) ? null : display}> {isProgress ? 'Edit' : 'Reopen'}</button>
                        <button className={isProgress ? 'other' : 'other booked'} style={((role == "T.A") && (isGuest)) ? null : display}  onClick={toggleBook}>
                                    {isProgress ? 'Book' : 'Booked'}
                        </button>
                        <ModalConfirmBook
                        isShowingBook={isShowingBook}
                        hide={toggleBook}
                        subject={subject}
                        uid={uid}
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardTAView