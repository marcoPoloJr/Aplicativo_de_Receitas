import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../components/recipe/Recipes';
import RecipesProvider from '../context/RecipesProvider';
// import App from '../App';
import { renderWithRouter } from './renders/RenderWithRouter';

describe('Testes do Componente Recipe', () => {
  // beforeEach(() => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(meals),
  //   });
  // });
  // afterEach(() => {
  //   global.fetch.mockClear();
  // });
  test('se o botão Beef está na tela', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );
    history.push('/meals');
    const comidas = await screen.findByText('Comidas');
    expect(comidas).toBeInTheDocument();

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
      // return 1;
    });

    const btn = await screen.findByTestId('Beef-category-filter');

    // const vasco = screen.getByText('vasco');
    expect(btn).toBeInTheDocument();
  });

  test('se a imagem da Corba está na tela', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );
    history.push('/meals');
    const comidas = await screen.findByText('Comidas');
    expect(comidas).toBeInTheDocument();

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
      // return 1;
    });

    const imagemCorba = await screen.findByTestId('0-card-img');
    // const vasco = screen.getByText('vasco');
    expect(imagemCorba).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });

  test('se o botão Ordinary Drinks está na tela', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );
    history.push('/drinks');
    const bebidas = await screen.findByText('Bebidas');
    expect(bebidas).toBeInTheDocument();

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
      // return 1;
    });

    const btn = await screen.findByTestId('Ordinary Drink-category-filter');
    // const vasco = screen.getByText('vasco');
    expect(btn).toBeInTheDocument();
  });

  test('testa o botão All de meals', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );
    history.push('/meals');
    const btnAll = await screen.findByTestId('All-category-filter');
    expect(btnAll).toBeInTheDocument();

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
      // return 1;
    });

    const corbaComida = await screen.findByText('Corba');
    expect(corbaComida).toBeInTheDocument();

    const btnBeef = await screen.findByTestId('Beef-category-filter');
    expect(btnBeef).toBeInTheDocument();

    userEvent.click(btnBeef);

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
      // return 1;
    });

    const beefMostarda = await screen.findByText(/mustard/i);
    expect(beefMostarda).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();

    userEvent.click(btnAll);

    const burekComida = await screen.findByText('Burek');
    expect(burekComida).toBeInTheDocument();
  });

  test('testa o botão All de drinks', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );
    history.push('/drinks');
    const btnAll = await screen.findByTestId('All-category-filter');
    expect(btnAll).toBeInTheDocument();

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
      // return 1;
    });

    const ggComida = await screen.findByText('GG');
    expect(ggComida).toBeInTheDocument();

    const btnOrdinary = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(btnOrdinary).toBeInTheDocument();

    userEvent.click(btnOrdinary);

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
      // return 1;
    });

    const longIsland = await screen.findByText(/island/i);
    expect(longIsland).toBeInTheDocument();
    screen.logTestingPlaygroundURL();

    userEvent.click(btnAll);

    const a1bebiba = await screen.findByText('A1');
    expect(a1bebiba).toBeInTheDocument();
  });
});
