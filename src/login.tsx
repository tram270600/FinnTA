import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from 'react-router-dom';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPw] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleForm = async(e:SyntheticEvent)=>{
        e.preventDefault();
        await fetch('http://localhost:27017/user/login',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                Email,
                Password
            })
        });
        // setRedirect(true);
    }

    if(redirect) return <Redirect to="/"/>

    return ( 
    <> 
    <div className="header">
        <h1>Connect with other<br/>Make you better</h1>
        <a href="/">Sign in to your FinCon Account !</a>
    </div> 
    <form onSubmit = {handleForm} method = "POST"> 
        <div className="field">
            <input
                type="text"
                name="ipEmail"
                id="ipEmail"
                placeholder="avc@avc.com"
                onChange={(e) => {
                setEmail(e.target.value)
            }}/>
            <label>Email</label>
        </div> 
        <div className = "field">
            <input
            type="password"
            name="ipPass"
            id="ipPass"
            placeholder="ThisIsMyPassword"
            onChange={(e) => {setPw(e.target.value)}}/> 
            <label> Password </label>
        </div> 
        <input type="submit" value="Sign in"/> 
    </form>
    <p>Don't have an account? <a href="/">Sign up</a></p>
    </>
    );
}
export default Login;