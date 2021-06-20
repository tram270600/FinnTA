import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ModalEditProfile from 'components/ModalPopup/ModalEditProfile';
import ModalCreatePost from 'components/ModalPopup/ModalCreatePost';
import useModal from 'components/ModalPopup/useModal';
import Modal from "components/ModalPopup/Modal";

const ButtonTA = ({data}) => {
    const { isShowingProfile, toggleProfile } = useModal();
    const { isShowing, toggle } = useModal(); //custom modal hook 
    const { isShowingCreate, toggleCreate } = useModal();
    return (
        <>
            <DropdownButton
                menuAlign='left'
                title='Create post'
                bsPrefix='btn-square btn-choose'
            >
                <Dropdown.Item href="#" onClick={toggle}>
                    Create Course
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={toggleCreate}>
                    Create Post
                </Dropdown.Item>
            </DropdownButton>
            <button className='btn-square' onClick={toggleProfile}>
                <span>Edit Profile</span>
               
            </button>
            <Modal
                isShowing={isShowing}
                hide={toggle}
            />
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
export default ButtonTA