import React, {useState} from 'react';

// Components
import Login from './Auth/Login';
import Register from './Auth/Register';

// TODO: store token on client and start on write up for this section.
export default function Auth(){

    const [register, setRegister] = useState(false);

    return (
        <main>
            <Login setRegister={setRegister}/>
            <Register register={register} setRegister={setRegister}/>
        </main>
    );
}