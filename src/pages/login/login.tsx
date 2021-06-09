import { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import 'styles/login.scss'

import showPw from 'images/showPw.svg';
import { useSelector } from 'react-redux';

// import { connect } from 'app/WebSocket';
import { unwrapResult } from '@reduxjs/toolkit';
import { loginThunk } from 'reducer/thunks/AccountThunk';
import { RootState, useAppDispatch } from 'app/store';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPw] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const dispact = useAppDispatch()
    // const acc = useSelector((state: RootState) => state.account)
    const handleForm = async (e: SyntheticEvent) => {
        e.preventDefault()
        const res = await dispact(loginThunk({ Email: Email, Password: Password }))
        const account = unwrapResult(res)
        console.log(account)
        // connect()
        setRedirect(true)
    }

    if (redirect) return <Redirect to="/" />

    return (
        <div className="backGround">
            <div className="loginForm">
                <div className="header">
                    <h1>Connect with other<br />Make you better</h1>
                    <a href="/"><b>Sign in</b> to your FinnTA Account !</a>
                </div>
                <form className="inputForm" onSubmit={handleForm} method="POST">
                    <div className="field">
                        <input
                            type="text"
                            name="ipEmail"
                            id="ipEmail"
                            placeholder="avc@avc.com"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} required />
                        <label>Username/Email</label>
                    </div>
                    <div className="field">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="ipPass"
                            id="ipPass"
                            placeholder="ThisIsMyPassword"
                            onChange={(e) => { setPw(e.target.value) }} required />
                        <label> Password </label>
                        <img src={showPw} width={24} onClick={() => setShowPassword(!showPassword)}
                            style={{ filter: showPassword ? 'none' : 'grayscale(100%)' }}></img>
                    </div>
                    <div className="Container">
                        <input type="submit" value="Sign in" />
                    </div>
                </form>
                <p>Don't have an account? <a href="/">Sign up</a></p>
            </div>
        </div>
    );
}
export default Login;