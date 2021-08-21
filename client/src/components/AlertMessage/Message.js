import React from 'react'
const Message = (props) => {
    return (

        <div className='alert  alert-primary mt-5 d-flex justify-content-center align-items-center' role='alert'>
            {props.message}
        </div>

    );
}



export default Message
