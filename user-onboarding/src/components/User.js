import React from 'react'

export default function User(props) {
    
    const { details, key } = props

    if (!details) {
        return <h3>Working on fetching your teammate's details...</h3>
    }
    
    return (
        <div className='user-container'>
            {/* <h2>{details.username}</h2> */}
            <h3>Name: {details.firstName} {details.lastName}</h3>
            {/* <p>Email: {details.email}</p> */}
        </div>
    )
}