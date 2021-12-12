import { useState } from 'react';
import useAuthorization from '../Hooks/useAuthorization';

export default function LoginDialog({ onClose }) {
    const { login } = useAuthorization();
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
        login.mutate({ username: usernameValue, password: passwordValue }, { onSuccess: () => onClose() })
    }

    return (
        <div className='LoginDialog'>
            <div className='LoginDialog-inner'>
                <label style={{ fontWeight: "Bold" }}>Logg inn</label>
                <label style={{ textDecoration: "Underline", color: "red" }}>Kun for administratorer</label>
                <input className='LoginDialog-input' type='text' placeholder='Brukernavn' value={usernameValue} onChange={onUsernameChange} onKeyPress={handleKeyPress}></input>
                <input className='LoginDialog-input' type='password' placeholder='Passord' value={passwordValue} onChange={onPasswordChange} onKeyPress={handleKeyPress}></input>
                <button className='LoginDialog-button' onClick={() => onDone()}>Bekreft</button>
                <button className='LoginDialog-button' onClick={() => onClose()}>Avbryt</button>
            </div>
        </div>
    )
}