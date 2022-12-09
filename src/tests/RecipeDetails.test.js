import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from './renders/RenderWithRouter';

describe('Testa o componente RecipeDetails', () => {
  test('Testa se o componente está sendo renderizado corretamente', async () => {
    const { history } = renderWithRouter(
      <App />,
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
