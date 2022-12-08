import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Footer from '../components/Footer/Footer';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Footer', () => {
  test('Testa se o componente está sendo renderizado', () => {
    render(<Footer />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  test('Testa se os elementos do footer são exibidos corretamente', () => {
    render(<Footer />);
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    const mealBtn = screen.getByTestId('meals-bottom-btn');
    expect(drinkBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
  });
  test('Testa se os redirecionamentos de rota estão ocorrendo corretamente', () => {
    const { history } = renderWithRouter(<Footer />);
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkBtn);
    expect(history.location.pathname).toBe('/drinks');
  });
});
