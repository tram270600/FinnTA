import React from 'react'
import ModalViewRate from 'components/ModalPopup/ModalViewRate';
import useModal from 'components/ModalPopup/useModal';

const ButtonTAother = ({data}) => {
    const { isShowingViewRate, toggleViewRate } = useModal();
    return (
        <>
            <button className = 'btn-square btn-choose' onClick={toggleViewRate}>
                <span>VIEW RATE</span>
            </button>
            <button className='btn-square'>
                <span>MESSAGE</span>
            </button>
            <ModalViewRate
                isShowingViewRate={isShowingViewRate}
                hide={toggleViewRate}
                data = {data}
            />
        </>
    )
}
export default ButtonTAother