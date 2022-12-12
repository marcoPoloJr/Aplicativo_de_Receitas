import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';

export default function DoneRecipes() {
  const sla = [{
    id: '53060',
    type: 'meals',
    nationality: 'Croatian',
    category: 'a',
    alcoholicOrNot: '',
    name: 'Burek',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    doneDate: '11.12.2000',
    tags: ['Streetfood', 'Onthego'],
  },
  {
    id: '53061',
    type: 'drink',
    nationality: 'Croatian',
    category: 'a',
    alcoholicOrNot: 'non - alcoholic',
    name: 'Bebidinha',
    image: 'https://www.kindpng.com/picc/m/371-3713688_rory-mercury-png-png-download-rory-mercury-transparent.png',
    doneDate: '11.12.2000',
    tags: 'Streetfood, Onthego',
  }];
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [teste, setTeste] = useState([]);
  const [isBtnShare, setIsBtnShare] = useState(true);
  const location = useLocation().pathname;
  useEffect(() => {
    // const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(sla);
  }, []);
  const allRecipes = () => {
    setDoneRecipes(sla);
  };
  const mealsRecipe = () => {
    const meals = doneRecipes.filter((item) => item.type === 'meals');
    setTeste(meals);
  };
  const drinkRecipe = () => {
    const drink = doneRecipes.filter((item) => item.type === 'drink');
    setTeste(drink);
  };
  const copyLink = () => {
    const MIL = 1000;
    setIsBtnShare(false);
    navigator.clipboard.writeText(`http://localhost:3000${location}`);
    setTimeout(() => {
      setIsBtnShare(true);
    }, MIL);
  };

  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ allRecipes }
        >
          All

        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ mealsRecipe }
        >
          Meals

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ drinkRecipe }
        >
          Drinks

        </button>
      </div>
      <div>
        {
          teste.map((item, index) => (
            <div key={ item.id }>
              <img
                src={ item.image }
                alt={ item.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${item.nationality} - ${item.category}`}

              </p>
              <p data-testid={ `${index}-horizontal-top-text` }>a</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
              {isBtnShare
                ? (
                  <button
                    type="button"
                    data-testid="share-btn"
                    onClick={ () => { copyLink(); } }
                  >
                    Compartilhar
                  </button>) : <p>Link copied!</p>}
            </div>
          ))
        }
      </div>
    </div>
  );
}
