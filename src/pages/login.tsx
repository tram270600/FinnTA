import { SyntheticEvent, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { loginThunk } from 'reducer/thunks/AccountThunk';
import { useAppDispatch } from 'app/store';
import { connect } from 'app/ws';

import 'styles/login.scss'
import showPw from 'images/showPw.svg';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPw] = useState('');
    const [stay, setStay] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch()
    const handleForm = async (e: SyntheticEvent) => {
        e.preventDefault()
        const res = await dispatch(loginThunk({ Email: Email, Password: Password, Stay: stay }))
        if (loginThunk.fulfilled.match(res)) {
            console.log("Loggeed account:", res.payload)
            dispatch(connect(res.payload._id))
            setRedirect(true)
        } else {
            alert(res.payload?.msg)
        }
    }

    if (redirect) return <Redirect to="/" />

    return (
        <div className="backGround">
            <div className="loginForm">
                <div className="header">
                    <h1>Connect with other<br />Make you better</h1>
                    <p style={{ cursor: 'default', color: '#35bbca', textAlign: 'start' }}><b>Sign in</b> to your FinnTA Account !</p>
                </div>
                <form className="inputForm" onSubmit={handleForm} method="POST">
                    <div className="field">
                        <input
                            type="email"
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
                    <div className="checkbox">
                        <input type="checkbox" value="stay" onClick={() => setStay(!stay)} /> <p style={{ display: "contents" }}>Stay logged in</p>
                    </div>
                    <div className="Container">
                        <input type="submit" aria-label="Sign in" />
                    </div>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    );
}
export default Login;