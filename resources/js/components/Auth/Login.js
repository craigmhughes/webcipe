const axios = require('axios').default;
import React from 'react';

export default function Login({ setRegister }){

    const handleSubmit = (e) => {
        e.preventDefault();

        let creds = {
            "email": String(document.getElementsByName("email")[0].value),
            "password": String(document.getElementsByName("password")[0].value)
        }

        axios.post('/api/auth/login', creds).then((res)=>console.log(res));
    }

    return (
        <article className="login">
            <header className="login__head">
                <img src={require("../../../assets/images/webcipe-text.svg")} className="login__logo"/>
            </header>
            <form className="login__form" onSubmit={(e)=>handleSubmit(e)}>
                <input type="email" placeholder="E-Mail Address" name="email" className="input"></input>
                <input type="password" placeholder="Password" name="password" className="input"></input>

                <button type="submit" className="button-primary">Log in</button>
                <a onClick={()=>setRegister(true)} className="login__reg-link">Don't have an account? Sign Up</a>
            </form>
        </article>
    );
}