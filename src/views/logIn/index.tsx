
import React, { useState, ChangeEvent, SyntheticEvent } from "react"
import Button from "../../components/common/Button"

import './style.scss'
const initState = {
    email: '',
    password: ''
}
const Login: React.FC = () => {
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
    }
    return (
        <div className='background'>
            <div className="login-container">

                <div className="left-side">
                    <img src="./images/shop.jpg" />
                    <h2>Get started</h2>
                    <p>use for your sales bussnise</p>
                </div>
                <div className='right-side'>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <h2>Get started</h2>
                        <p>please login with your Email and use for your sales bussnise</p>
                        <input type="text" placeholder='Email' name='email' />
                        <input type="password" placeholder='password' name='password' />

                        <Button text='login' onClick={() => { }} />
                    </form>
                </div>

            </div></div>
    )
}

export default Login