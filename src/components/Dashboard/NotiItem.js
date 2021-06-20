import React from 'react'
import 'styles/NotiItem.scss'
import useModalCourse from 'components/ModalPopup/useModalCourse';
import ModalConfirmTeach from 'components/ModalPopup/ModalConfirmTeach';

const NotiItem = ({title, content, avatar}) => {
    const { isShowingConfirmTeach, toggleConfirmTeach } = useModalCourse();
    return (
        <div className = 'item-container' onClick={toggleConfirmTeach}>
            <div className = 'item-content'>
                <span>{title}</span>
                <p>{content}</p>
            </div>
            <div className = 'avatar'>
                <img src = {avatar}/>
            </div>
            <ModalConfirmTeach
                isShowingConfirmTeach={isShowingConfirmTeach}
                hide={toggleConfirmTeach}
            />
        </div>
    )
}
export default NotiItem