import React from 'react';

export default function Login() {
  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          type="text"
          data-testid="email-input"
          onChange={ () => {} }
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          data-testid="password-input"
          onChange={ () => {} }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ () => {} }
      >
        Enter
      </button>
    </form>
  );
}
