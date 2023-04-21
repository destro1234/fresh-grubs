import React from 'react'
import Login from './Login.js'
import NavBar from './NavBar.js'

function Welcome () {
    return (
        <div>
            <h1>Welcome to FreshGrubs!</h1>
            <h3>Sign in with your username and password</h3>
            {/* <NavBar /> */}
            <Login />
        </div>
    )
}

export default Welcome;