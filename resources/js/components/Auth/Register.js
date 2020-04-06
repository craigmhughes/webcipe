const axios = require('axios').default;
import React from 'react';

/**
 * Register Component
 *
 * @export
 * @param {*} {register, setRegister}
 * @returns
 */
export default function Register({register, setRegister}){

    const handleSubmit = (e) => {
        e.preventDefault();

        let creds = {
            "name": String(document.getElementsByName("name")[0].value),
            "email": String(document.getElementsByName("email")[0].value),
            "password": String(document.getElementsByName("password")[0].value),
            "password_confirmation": String(document.getElementsByName("password_confirmation")[0].value)
        }

        console.log(creds);

        axios.post('/api/auth/register', creds).then((res)=>console.log(res));
    }

    return (
        <article className={`register${register ? "" : "--hidden"}`}>
            <header className="register__head">
                <img src={require("../../../assets/images/webcipe-text-w.svg")} className="register__logo"/>
            </header>
            <form onSubmit={(e)=>handleSubmit(e)} className="register__form">
                <input type="text" placeholder="Name" name="name" className="input"></input>
                <input type="email" placeholder="E-Mail Address" name="email" className="input"></input>
                <input type="password" placeholder="Password" name="password" className="input"></input>
                <input type="password" placeholder="Password Confirmation" name="password_confirmation" className="input"></input>

                <button type="submit" className="button-primary--light">Sign Up</button>
                <button type="button" className="button-secondary--light" onClick={()=>setRegister(false)}>Go Back</button>
            </form>
        </article>
    );
}