import React from 'react'
import ModalEditProfile from 'components/ModalPopup/ModalEditProfile';
import ModalCreatePost from 'components/ModalPopup/ModalCreatePost';
import useModal from 'components/ModalPopup/useModal';

const ButtonStudent = ({data}) => {
    const { isShowingProfile, toggleProfile } = useModal();
    const { isShowingCreate, toggleCreate } = useModal();
    
    return (
        <>
            <button className = 'btn-square btn-choose' onClick={toggleCreate}>
                <span>CREATE POST</span>
            </button>
            <button className='btn-square' onClick={toggleProfile}>
                <span>EDIT PROFILE</span>
                
            </button>
            <ModalEditProfile 
                isShowingProfile={isShowingProfile}
                hide={toggleProfile}
                data = {data}
            />
            <ModalCreatePost
                isShowingCreate={isShowingCreate}
                hide={toggleCreate}
            />
        </>
    )
}
export default ButtonStudent