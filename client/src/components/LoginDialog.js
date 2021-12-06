import { useState } from 'react';
import { logIn } from '../ServerConnection';

export default function LoginDialog({ onClose }) {
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const onUsernameChange = (event) => {
        setUsernameValue(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPasswordValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onDone()
        }
    }

    function onDone() {
        logIn(usernameValue, passwordValue)
        onClose()
    }

    return (
        <div className='LoginDialog'>
            <div className='LoginDialog-inner'>
                <label style={{ fontWeight: "Bold" }}>Login</label>
                <label style={{ textDecoration: "Underline", color: "red" }}>Kun for administratorer</label>
                <input className='LoginDialog-input' type='text' placeholder='Brukernavn' value={usernameValue} onChange={onUsernameChange} onKeyPress={handleKeyPress}></input>
                <input className='LoginDialog-input' type='password' placeholder='Passord' value={passwordValue} onChange={onPasswordChange} onKeyPress={handleKeyPress}></input>
                <button className='LoginDialog-button' onClick={() => onDone()}>Bekreft</button>
                <button className='LoginDialog-button' onClick={() => onClose()}>Avbryt</button>
            </div>
        </div>
    )
}