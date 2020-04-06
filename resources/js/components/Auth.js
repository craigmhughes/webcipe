import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Login from './Auth/Login';
import Register from './Auth/Register';

// TODO: store token on client and start on write up for this section.
export default function Auth({ props }){

    const [register, setRegister] = useState(false);

    const setToken = (token)=>{
        localStorage.setItem("auth_token", token);
        props.history.push("/");
    };

    useEffect(() => {
        if(localStorage.user){
            props.history.push("/");
        }
    },[]);

    return (
        <main>
            <Login setRegister={setRegister} setToken={setToken}/>
            <Register register={register} setRegister={setRegister} setToken={setToken}/>
        </main>
    );
}