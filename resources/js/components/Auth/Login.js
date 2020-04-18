const axios = require('axios').default;
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

/**
 * Login Component
 *
 * @export
 * @param {*} { setRegister }
 * @returns
 */
export default function Login({ setToken, props }){

    const [err, setErr] = useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault();

        let creds = {
            "email": String(document.getElementsByName("email")[0].value),
            "password": String(document.getElementsByName("password")[0].value)
        }

        if(creds.email.length < 1 || creds.password.length < 1){
            return false;
        }

        axios.post('/api/auth/login', creds)
        // Handle Login Error
        .catch((err)=>{
            console.log(err);
            setErr(true);

            setTimeout(()=>setErr(false), 4000);
        }).then((resp)=>{
            if(resp.data.token){
                setToken(resp.data.token, props);
            }
        });
    }

    return (
        <article className="login">
            <header className="login__head">
                <img src="/assets/icons/x.svg" className="login__x" onClick={()=>props.history.goBack()}/>
                <img src="/assets/images/webcipe-text.svg" className="login__logo"/>
            </header>
            <form className="login__form" onSubmit={(e)=>handleSubmit(e)}>
                <p className={`login__err${err ? "--show" : ""}`}><img src="/assets/icons/ghost.svg"/>Incorrect E-Mail Address or Password</p>
                <input type="email" placeholder="E-Mail Address" name="email" className="input"></input>
                <input type="password" placeholder="Password" name="password" className="input"></input>

                <button type="submit" className="button-primary">Log in</button>
                <Link to="/register" className="login__reg-link">Don't have an account? Sign Up</Link>
            </form>
        </article>
    );
}