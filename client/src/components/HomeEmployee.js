import React from 'react'

function HomeEmployee({ user }) {
    console.log({user});
    return (
        <div className='d-flex justify-content-center align-items-center bg-light min-vh-100'>

            <h1>WELCOME, {user.firstName}</h1>

        </div>

    )
}

export default HomeEmployee
