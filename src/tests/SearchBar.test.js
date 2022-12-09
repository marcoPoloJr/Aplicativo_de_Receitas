import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import SearchBar from '../components/Header/SearchBar';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from './renders/RenderWithRouter';

const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const NAME_RADIO = 'name-search-radio';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const LETTER_RADIO = 'first-letter-search-radio';
describe('Testa o componente SearchBar', () => {
  window.alert = jest.fn();

  test('Testa se o componente está sendo renderizado corretamente', async () => {
    renderWithRouter(
      <RecipesProvider>
        <SearchBar />
      </RecipesProvider>,
    );
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
    expect(ingredientRadio).toBeInTheDocument();

    const nameRadio = screen.getByTestId(NAME_RADIO);
    expect(nameRadio).toBeInTheDocument();

    const letterRadio = screen.getByTestId(LETTER_RADIO);
    expect(letterRadio).toBeInTheDocument();

    const execBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(execBtn).toBeInTheDocument();
  });

  test('Testa a renderização na rota /meals', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <SearchBar />
      </RecipesProvider>,
    );
    act(() => {
      history.push('/meals');
    });

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const execBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.click(execBtn);

    userEvent.type(searchInput, 'g');
    userEvent.click(execBtn);
    const mealRecipeCard0 = await screen.findByTestId('0-recipe-card');
    expect(mealRecipeCard0).toBeInTheDocument();

    userEvent.type(searchInput, 'gg');
    userEvent.click(execBtn);
    window.alert.mockClear();

    userEvent.type(searchInput, 'soup');
    const nameRadio = screen.getByTestId(NAME_RADIO);
    userEvent.click(nameRadio);
    userEvent.click(execBtn);

    const mealRecipeCard1 = await screen.findByTestId('1-recipe-card');
    expect(mealRecipeCard1).toBeInTheDocument();

    userEvent.type(searchInput, 'egg');
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
    userEvent.click(ingredientRadio);
    userEvent.click(execBtn);

    const mealRecipeCard2 = await screen.findByTestId('2-recipe-card');
    expect(mealRecipeCard2).toBeInTheDocument();

    userEvent.type(searchInput, 'Egg Drop Soup');
    userEvent.click(nameRadio);
    userEvent.click(execBtn);
    // await waitFor(() => {
    //   expect(history.location.pathname).toBe('meals/52955');
    // });
  });

  test('Testa a renderização na rota /drinks', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <SearchBar />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/drinks');
    });
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const execBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
    const nameRadio = screen.getByTestId(NAME_RADIO);

    userEvent.click(execBtn);

    userEvent.type(searchInput, 'a');
    userEvent.click(execBtn);
    const drinkRecipeCard3 = await screen.findByTestId('3-recipe-card');
    expect(drinkRecipeCard3).toBeInTheDocument();

    userEvent.type(searchInput, 'aa');
    userEvent.click(execBtn);
    expect(window.alert).toHaveBeenCalled();
    window.alert.mockClear();

    userEvent.type(searchInput, 'vodka');
    userEvent.click(ingredientRadio);
    userEvent.click(execBtn);
    const drinkRecipeCard4 = await screen.findByTestId('4-recipe-card');
    expect(drinkRecipeCard4).toBeInTheDocument();

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'gin');
    userEvent.click(execBtn);

    const drinkRecipeCard5 = await screen.findByTestId('5-recipe-card');
    expect(drinkRecipeCard5).toBeInTheDocument();

    const letterRadio = screen.getByTestId(LETTER_RADIO);
    userEvent.click(letterRadio);
  });
});
