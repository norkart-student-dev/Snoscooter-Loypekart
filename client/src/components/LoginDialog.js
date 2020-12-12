import {useState} from 'react';

export default function LoginDialog(props){
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const onUsernameChange = (event) => {
        setUsernameValue(event.target.value);
    };

    const onPasswordChange = (event) => {
      setPasswordValue(event.target.value);
    };

    return(
        <div className='LoginiDialog'>
            <div className='LoginDialog-inner'>
                <label style={{fontWeight : "Bold"}}>Login</label>
                <label style={{textDecoration : "Underline", color : "red"}}>Kun for administratorer</label>
                <input className='LoginDialog-input' type='text' placeholder='Brukernavn' value={usernameValue} onChange={onUsernameChange}></input>
                <input className='LoginDialog-input' type='password' placeholder='Passord' value={passwordValue} onChange={onPasswordChange}></input>
                <button className='LoginDialog-button' onClick={() => props.handleLogin(usernameValue, passwordValue)}>Bekreft</button>
                <button className='LoginDialog-button' onClick={() => props.toggleLoginDialog()}>Avbryt</button>
            </div>
        </div>
    )
}