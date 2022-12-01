import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

function Recipe() {
  const location = useLocation().pathname;
  const { allMeals, allDrinks, allBtnsMeal, allBtnsDrink } = useContext(RecipesContext);
  if (location === '/meals') {
    return (
      <div>
        <h2>Comidas</h2>
        { allBtnsMeal.map(({ strCategory }, ind) => (
          <button
            key={ ind }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        ))}
        { allMeals.map((ele, ind) => (
          <div key={ ind } data-testid={ `${ind}-recipe-card` }>
            <img
              src={ ele.strMealThumb }
              alt={ ele.strMeal }
              data-testid={ `${ind}-card-img` }
            />
            <p data-testid={ `${ind}-card-name` }>{ele.strMeal}</p>
          </div>
        ))}
      </div>
    );
  }
  if (location === '/drinks') {
    return (
      <div>
        <h2>Bebidas</h2>
        { allBtnsDrink.map(({ strCategory }, i) => (
          <button
            key={ i }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        ))}
        { allDrinks.map((ele, ind) => (
          <div key={ ind } data-testid={ `${ind}-recipe-card` }>
            <img
              src={ ele.strDrinkThumb }
              alt={ ele.strDrink }
              data-testid={ `${ind}-card-img` }
            />
            <p data-testid={ `${ind}-card-name` }>{ele.strDrink}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Recipe;
