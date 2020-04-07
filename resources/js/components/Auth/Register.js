const axios = require('axios').default;
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

/**
 * Register Component
 *
 * @export
 * @param {*} {register, setRegister}
 * @returns
 */
export default function Register({setToken, props}){

    //  Form Errors
    const [err, setErr] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        let creds = {
            "name": String(document.getElementsByName("reg_name")[0].value),
            "email": String(document.getElementsByName("reg_email")[0].value),
            "password": String(document.getElementsByName("reg_password")[0].value),
            "password_confirmation": String(document.getElementsByName("reg_password_confirmation")[0].value)
        }

        for (let key in creds){
            if(creds[key].length < 1){
                return false;
            }
        }

        console.log(creds);

        axios.post('/api/auth/register', creds)
        // Handle Register Error
        .then((resp)=>{

            if(resp.data.success === false){
                let errors = resp.data.error;

                // Restructure error object
                errors = {
                    "name": errors.name ? errors.name[0] : null,
                    "email": errors.email ? errors.email[0] : null,
                    "password": errors.password ? errors.password[0] : null,
                    "password_confirmation": errors.password_confirmation ? errors.password_confirmation[0] : null,
                }

                //  Overwrite Error state.
                setErr(errors);

                // Loop through fields and erase values to show error message (if necessary).
                for (let err_field in errors){
                    document.getElementsByName(`reg_${String(err_field)}`)[0].value = errors[err_field] ? "" : document.getElementsByName(`reg_${String(err_field)}`)[0].value;
                }
            } else if (resp.data.token){
                setToken(resp.data.token, props);
            }
        });
    }

    return (
        <article className={`register`}>
            <header className="register__head">
                <img src={require("../../../assets/images/webcipe-text-w.svg")} className="register__logo"/>
            </header>
            <form onSubmit={(e)=>handleSubmit(e)} className="register__form">
                <input type="text" placeholder="Name" name="reg_name" className="input"></input>
                <input type="email" placeholder="E-Mail Address" name="reg_email" className="input"></input>
                <input type="password" placeholder={err.password ?? "Password"} name="reg_password" className="input"></input>
                <input type="password" placeholder="Password Confirmation" name="reg_password_confirmation" className="input"></input>

                <button type="submit" className="button-primary--light">Sign Up</button>
                <a onClick={()=>props.history.goBack()} className="button-secondary--light">Go Back</a>
            </form>
        </article>
    );
}