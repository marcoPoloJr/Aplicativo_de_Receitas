import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Header from '../components/Header/Header';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from './renders/RenderWithRouter';

describe('Testa o componente Header', () => {
  test('Testa se o componente está sendo renderizado corretamente', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Header />
      </RecipesProvider>,
    );
    const headerTitle = screen.getByTestId('page-title');
    expect(headerTitle).toBeInTheDocument();
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test('Testa se os redirecionamentos de rota estão ocorrendo corretamente', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Header />
      </RecipesProvider>,
    );

    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
    const headerTitle = screen.getByTestId('page-title');
    expect(headerTitle.innerHTML).toBe('Profile');

    act(() => {
      history.push('/done-recipes');
    });
    expect(headerTitle.innerHTML).toBe('Done Recipes');

    act(() => {
      history.push('/favorite-recipes');
    });
    expect(headerTitle.innerHTML).toBe('Favorite Recipes');
  });

  test('Test', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Header />
      </RecipesProvider>,
    );
    const searchBtn = screen.getByTestId('search-top-btn');
    // const searchInput = screen.queryByTestId('search-input');
    // expect(searchInput).not.toBeInTheDocument();
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
