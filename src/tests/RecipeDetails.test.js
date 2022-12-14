import React from 'react';
import { act } from 'react-dom/test-utils';
import RecipesProvider from '../context/RecipesProvider';
import RecipeDetails from '../components/RecipeDetails/RecipeDetails';
import { renderWithRouter } from './renders/RenderWithRouter';

describe('Testa o componente RecipeDetails', () => {
  test('Testa se o componente está sendo renderizado corretamente', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
      <RecipeDetails />
      </RecipesProvider>
    );

    act(() => {
      history.push('/meals/52977');
    });

    expect(history.location.pathname).toEqual('/meals/52977');
    expect(global.fetch).toHaveBeenCalled();

    // const recipePhoto = await screen.findByTestId('recipe-photo');
    // expect(recipePhoto).toBeInTheDocument();
  });
});
