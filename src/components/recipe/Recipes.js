import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import Footer from '../Footer';

function Recipe() {
  const location = useLocation().pathname;
  const {
    allMeals, allDrinks, allBtnsMeal, allBtnsDrink, filterEspecifMeal, filterEspecifDrink,
  } = useContext(RecipesContext);
  if (location === '/meals') {
    return (
      <div>
        <h2>Comidas</h2>
        <div>
          <button
            type="button"
            name="all"
            data-testid="All-category-filter"
            onClick={ () => { filterEspecifMeal('all'); } }
          >
            All
          </button>
          { allBtnsMeal.map(({ strCategory }, ind) => (
            <button
              key={ ind }
              type="button"
              name={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => { filterEspecifMeal(strCategory); } }
            >
              {strCategory}
            </button>
          ))}
        </div>
        { allMeals.map((ele, ind) => (
          <div key={ ind } data-testid={ `${ind}-recipe-card` }>
            <Link to={ `/meals/${ele.idMeal}` }>
              <img
                src={ ele.strMealThumb }
                alt={ ele.strMeal }
                data-testid={ `${ind}-card-img` }
              />
            </Link>
            <p data-testid={ `${ind}-card-name` }>{ele.strMeal}</p>
          </div>
        ))}
        <Footer />
      </div>
    );
  }
  if (location === '/drinks') {
    return (
      <div>
        <h2>Bebidas</h2>
        <div>
          <button
            type="button"
            name="all"
            data-testid="All-category-filter"
            onClick={ () => { filterEspecifDrink('all'); } }
          >
            All
          </button>
          { allBtnsDrink.map(({ strCategory }, i) => (
            <button
              key={ i }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => { filterEspecifDrink(strCategory); } }
            >
              {strCategory}
            </button>
          ))}
        </div>
        { allDrinks.map((ele, ind) => (
          <div key={ ind } data-testid={ `${ind}-recipe-card` }>
            <Link to={ `/drinks/${ele.idDrink}` }>
              <img
                src={ ele.strDrinkThumb }
                alt={ ele.strDrink }
                data-testid={ `${ind}-card-img` }
              />
            </Link>
            <p data-testid={ `${ind}-card-name` }>{ele.strDrink}</p>
          </div>
        ))}
        <Footer />
      </div>
    );
  }
}

export default Recipe;
