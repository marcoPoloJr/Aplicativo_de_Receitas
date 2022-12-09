import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [validEmail, setValidEmail] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const [validPassword, setValidPassword] = useState(false);

  const validateEmail = (email) => String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

  const handleEmailChange = ({ target }) => {
    setUserEmail(target.value);
    const validate = validateEmail(target.value);
    return validate ? setValidEmail(true) : setValidEmail(false);
  };

  const handlePasswordChange = ({ target }) => {
    const limit = 6;
    const validate = target.value.length > limit;
    console.log(target.value.length);
    console.log(validate);
    return validate ? setValidPassword(true) : setValidPassword(false);
  };

  const history = useHistory();

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
    const email = localStorage.getItem('user');
    console.log(email);
    history.push('/meals');
  };

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          type="email"
          data-testid="email-input"
          onChange={ handleEmailChange }
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          data-testid="password-input"
          onChange={ handlePasswordChange }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
        disabled={ !validEmail || !validPassword }
      >
        Enter
      </button>
    </form>
  );
}
