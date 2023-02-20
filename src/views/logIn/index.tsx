
import React, { useState, ChangeEvent, SyntheticEvent } from "react"
import Button from "../../components/common/Button"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase/firebase"
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import './style.scss'
const initState = {
    email: '',
    password: ''
}
const Login: React.FC = () => {
    const [input, setInput] = useState(initState)
    const [error, setError] = useState<Error | null>(null)
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try
        {
            await signInWithEmailAndPassword(auth, input.email, input.password)
            setInput(initState)

        } catch (e)
        {
            if (e instanceof Error)
            {
                setError(e);
                console.log(e.message)
            }
        }



    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(null)
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
                        <input type="text" placeholder='Email' onChange={(e) => handleChange(e)} name='email' />
                        <input type="password" placeholder='password' onChange={(e) => handleChange(e)} name='password' />

                        <Button text='login' onClick={() => { }} />
                    </form>
                </div>
                {error && <p>{error?.message}</p>}
            </div></div>
    )
}

export default Login