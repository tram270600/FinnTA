import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

const ButtonTA = () => {
    return (
        <>
            <DropdownButton
                menuAlign='left'
                title='Create post'
                bsPrefix='btn-square btn-choose'
            >
                <Dropdown.Item href="#">
                    Create Course
                </Dropdown.Item>
                <Dropdown.Item href="#">
                    Create Post
                </Dropdown.Item>
            </DropdownButton>
            <button className='btn-square'>
                <span>Edit Profile</span>
            </button>
        </>
    )
}
export default ButtonTA