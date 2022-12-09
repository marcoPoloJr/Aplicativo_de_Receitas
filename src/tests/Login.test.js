import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RecipesProvider from '../context/RecipesProvider';
import Login from '../pages/Login';
import { renderWithRouter } from './renders/RenderWithRouter';

describe('Testa o componente Footer', () => {
  test('Testa se o componente está sendo renderizado', () => {
    renderWithRouter(
      <RecipesProvider>
        <Login />
      </RecipesProvider>,
    );
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    userEvent.type(emailInput, 'tryber@trybe.com');

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    userEvent.type(passwordInput, '1234567');

    const submitBtn = screen.getByTestId('login-submit-btn');
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeEnabled();
    userEvent.click(submitBtn);
  });
});
