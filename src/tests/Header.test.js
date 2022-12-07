import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Header from '../components/Header/Header';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from './renders/RenderWithRouter';

describe('Testa o componente Header', () => {
  test('Testa se o componente está sendo renderizado', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Header />
      </RecipesProvider>,
    );
    const headerTitle = screen.getByTestId('page-title');
    expect(headerTitle).toBeInTheDocument();
  });
  test('Testa se os elementos do Header são exibidos corretamente', () => {
    renderWithRouter(
      <RecipesProvider>
        <Header />
      </RecipesProvider>,
    );
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  test('Testa se os redirecionamentos de rota estão ocorrendo corretamente', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Header />
      </RecipesProvider>,
    );
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
  });
});
