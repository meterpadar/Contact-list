import './Register.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectUsers } from './../../slices/usersSlice.js';
import { v4 as uuidv4 } from 'uuid';

export function Register({setShowRegisterPage, lang}) {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerAlert, setRegisterAlert] = useState('');

  const handleUsername = (event) =>{
    setUsername(event.target.value);
  };

  const handleEmail = (event) =>{
    setEmail(event.target.value);
  };
  const handlePassword = (event) =>{
    setPassword(event.target.value);
  };

  const registerClick = (event) => {
    event.preventDefault();

    let userId = `u_${uuidv4()}`;

    const registerUsernameInput = document.getElementById('register-username-input');
    const registerEmailInput = document.getElementById('register-email-input');
    const registerPasswordInput = document.getElementById('register-password-input');
    const registerRepeatPasswordInput = document.getElementById('register-repeat-password-input');

    if (registerUsernameInput.value === '' || registerEmailInput.value === '' || registerPasswordInput.value === '' || registerRepeatPasswordInput.value === '')
      {
        lang ? setRegisterAlert('Some input is empty !') : setRegisterAlert('Niektoré pole je prázdne !');
        return;
    };

    if (!registerEmailInput.value.includes('@'))
      {
        lang ? setRegisterAlert('Email has wrong format !') : setRegisterAlert('Email má zlý formát !');
        return;
    };

    for (let i=0; i < Object.keys(users).length; i++) {
      if (Object.values(users)[i].username === registerUsernameInput.value) {
        lang ? setRegisterAlert('Username already exists !') : setRegisterAlert('Používateľské meno už existuje !');
        return;
      } else if (Object.values(users)[i].email === registerEmailInput.value) {
        lang ? setRegisterAlert('Email already exists !') : setRegisterAlert('Email už existuje !');
        return;
      }
    };

    if (registerPasswordInput.value.length < 8)
      {
        lang ? setRegisterAlert('Minimal password length is 8 characters !') : setRegisterAlert('Heslo musí obsahovať minimálne 8 znakov !');
        return;
    };

    if (registerPasswordInput.value !== registerRepeatPasswordInput.value) {
        lang ? setRegisterAlert('Password is not the same !') : setRegisterAlert('Heslo nie je rovnaké !');
        return;
    };

    dispatch(registerUser({
      userId: userId,
      username: username,
      email: email,
      password: password
    }));

    setRegisterAlert('');
    setShowRegisterPage(false);
  }

  const backToLoginClick = () => {
    setShowRegisterPage(false);
  };

  return (
    <div className="Register">
      <div className='register-container'>
        <h1 className='register-form-header'>{lang ? 'Register form' : 'Registračný formulár'}</h1>
        <h2 className='register-alert'>{registerAlert}</h2>
        <form 
          className='register-form-container'
          onSubmit={registerClick}
        >
          <input
            id='register-username-input'
            type="text" 
            placeholder={lang ? 'Username' : 'Používateľské meno'}
            onChange={handleUsername}
          />
          <input 
            id='register-email-input'
            type="text" 
            placeholder='Email'
            onChange={handleEmail}
          />
          <input 
            id='register-password-input'
            type="password" 
            placeholder={lang ? 'Password' : 'Heslo'}
            onChange={handlePassword}
          />
          <input 
            
            id='register-repeat-password-input'
            type="password" 
            placeholder={lang ? 'Repeat password' : 'Zopakuj heslo'}
          />
          <button type='submit'>
            {lang ? 'Register' : 'Zaregistrovať sa'}
          </button>
        </form>
        <button 
          className='back-login-page-button'
          onClick={backToLoginClick}
        >
          {lang ? 'Back to Login' : 'Späť na prihlásenie'}
        </button>
      </div>
    </div>
  );
}