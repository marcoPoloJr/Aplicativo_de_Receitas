import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renders/RenderWithRouter';
import Profile from '../components/Profile/Profile';
import RecipesProvider from '../context/RecipesProvider';

describe('Testa a página Profile', () => {
  test('se a aplicação é redirecionada para a página de Receitas Feitas ao clicar no botão Done Recipes', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    expect(doneRecipesBtn).toBeInTheDocument();

    userEvent.click(doneRecipesBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  test('se a aplicação é redirecionada para a página de Receitas Feitas ao clicar no botão Favorite Recipes', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');

    console.log(favoriteRecipesBtn);
    expect(favoriteRecipesBtn).toBeInTheDocument();

    userEvent.click(favoriteRecipesBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  test('se a aplicação é redirecionada para a página de Login ao clicar no botão Logout', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
