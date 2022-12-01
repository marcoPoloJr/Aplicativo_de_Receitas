import { render, screen } from '@testing-library/react';
import Recipe from '../components/recipe/Recipe';
import RecipesProvider from '../context/RecipesProvider';
// import App from '../App';
import { renderWithRouter } from './renders/RenderWithRouter';

describe('Testes do Componente Recipe', () => {
  test('se o botão Beef está na tela', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipe />
      </RecipesProvider>,
    );
    history.push('/meals');
    const comidas = await screen.findByText('Comidas');
    expect(comidas).toBeInTheDocument();
    
    function timeout(delay: number) {
      return new Promise( res => setTimeout(res, delay) );
    } await timeout(1000);
    
    const btn = await screen.findByTestId('Beef-category-filter');
    // const vasco = screen.getByText('vasco');
    expect(btn).toBeInTheDocument();
  });

  test('se a imagem da Corba está na tela', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipe />
      </RecipesProvider>,
    );
    history.push('/meals');
    const comidas = await screen.findByText('Comidas');
    expect(comidas).toBeInTheDocument();
    
    function timeout(delay: number) {
      return new Promise( res => setTimeout(res, delay) );
    } await timeout(1000);
    
    const imagemCorba = await screen.findByTestId('0-card-img');
    // const vasco = screen.getByText('vasco');
    expect(imagemCorba).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });

  test('se o botão Ordinary Drinks está na tela', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipe />
      </RecipesProvider>,
    );
    history.push('/drinks');
    const bebidas = await screen.findByText('Bebidas');
    expect(bebidas).toBeInTheDocument();
    
    function timeout(delay: number) {
      return new Promise( res => setTimeout(res, delay) );
    } await timeout(1000);
    
    const btn = await screen.findByTestId('Ordinary Drink-category-filter');
    // const vasco = screen.getByText('vasco');
    expect(btn).toBeInTheDocument();
  });
});
