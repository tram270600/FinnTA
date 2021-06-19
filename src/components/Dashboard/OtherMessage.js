import React from 'react'
import 'styles/Message.css'
const OtherMessage = ({content}) => {
    return (
        <div className = 'other-mss'>
            <p>{content}</p>
        </div>
    )
}
export default OtherMessage