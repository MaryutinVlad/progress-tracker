import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Auth({
  title,
  formName,
  onEvent,
  redirectTo,
  onLocalModeClick
}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function toggleLocalMode() {
    onLocalModeClick(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onEvent({ email, password });
  }

  return (
    <div className='auth'>
      <form className='form' name={formName} action='#' onSubmit={handleSubmit} noValidate>
        <h2 className='auth__header'>
          {title}
        </h2>
        <input className="auth__input-field" type="url" name="email" id="email-input"
        placeholder="email" value={email || ''} onChange={handleEmailChange} required/>
        <span className='form__error'>{email.length < 3 && email.length !== 0 ? 'Invalid email' : ''}</span>
        <input className="auth__input-field" type="password" name="password" id="password-input"
        placeholder="password" value={password || ''} onChange={handlePasswordChange} required/>
        <span className='form__error'>{password.length < 6 && password.length !== 0 ? 'Invalid password' : ''}</span>
        <div className='auth__button-container'>
          <button className="auth__submit-button" type="submit">
            {title}
          </button>
          <button className='auth__submit-button' type='button' onClick={toggleLocalMode}>
            Local mode
          </button>
        </div>
      </form>
      <NavLink className="auth__link" to={redirectTo}>
        {redirectTo === '/signin' ? 
          "Already signed up? Sign in" : "Don't have an account? Sign up"
        }
      </NavLink>
    </div>
  )
}

export default Auth;