import { useState } from 'react';
import './App.css';
import { Login } from './../components/Login/Login.js';
import { Logged } from './../components/Logged/Logged.js';

function App() {
  const [successLogin, setSuccessLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [lang, setLang] = useState(true);
  
  const enLangClick = () => {
    setLang(true);
  };

  const skLangClick = () => {
    setLang(false);
  };

  return (
    <div className="App">
      <div className='lang-container'>
        <button onClick={enLangClick} >EN</button>
        <button onClick={skLangClick} >SK</button>
      </div>
      {
        !successLogin ? 
        <Login 
          setSuccessLogin={setSuccessLogin}
          setUserId={setUserId}
          lang={lang}
        />
         : 
        <Logged 
          setSuccessLogin={setSuccessLogin}
          userId={userId}
          lang={lang}
        />
      }
    </div>
  );
}

export default App;
