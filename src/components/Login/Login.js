import './Login.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from './../../slices/usersSlice.js';
import { Register } from './../Register/Register.js';

export function Login({setSuccessLogin, setUserId, lang}) {
  const users = useSelector(selectUsers);

  const [showRegisterPage, setShowRegisterPage] = useState(false);
  const [loginAlert, setLoginAlert] = useState('');

  const loginClick = (event) => {
    event.preventDefault();

    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');

    for (let i=0; i < Object.keys(users).length; i++) {
      if (users[Object.keys(users)[i]].username === usernameInput.value && users[Object.keys(users)[i]].password === passwordInput.value) {
        setUserId(users[Object.keys(users)[i]].userId);
        setSuccessLogin(true);
        return;
      } else {
        setUserId('');
        lang ? setLoginAlert('Wrong username or password !') : setLoginAlert('Nesprávne meno alebo heslo !');
        setSuccessLogin(false);
      }
    };
  };

  const showRegisterClick = () => {
    setShowRegisterPage(true);
    setLoginAlert('')
  };

  return (
    !showRegisterPage ? 
    <div className="Login">
      <div className='login-container'>
        <h1 className='contact-list-header'>{lang ? 'Contact list' : 'Zozman kontaktov'}</h1>
        <h2 className='login-alert'>{loginAlert}</h2>
        <form 
          className='login-form-container'
          onSubmit={loginClick}
        >
          <input 
            id='username-input'
            type="text" 
            placeholder={lang ? 'Username' : 'Používateľ'}
          />
          <input 
            id='password-input'
            type="password" 
            placeholder={lang ? 'Password' : 'Heslo'}
          />
          <button type='submit'>
            {lang ? 'Log in' : 'Prihlás sa'}
          </button>
        </form>
        <button 
          className='register-page-button'
          onClick={showRegisterClick}
        >
          {lang ? 'Register' : 'Zaregistruj sa'}
        </button>
      </div>
    </div> :
    <Register 
      setShowRegisterPage={setShowRegisterPage}
      lang={lang}
    />
  );
}