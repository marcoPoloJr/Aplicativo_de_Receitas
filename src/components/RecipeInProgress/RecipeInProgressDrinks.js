import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Header from '../Header/Header';
// import App from '../../App.css';

function RecipeInProgressDrinks() {
  const {
    allDrinks,
    //allMeals, allBtnsMeal, allBtnsDrink, filterEspecifMeal, filterEspecifDrink,
  } = useContext(RecipesContext);
  console.log(allDrinks);
  const location = useLocation().pathname;
  const numberPathname = location.match(/\d+/g).map(Number)[0];
  const recipe = allDrinks.filter((ele) => ele.idDrink.includes(numberPathname));
  const magicSliceMin = 17;
  const magicSliceMax = 32;
  const ingredientsValues = recipe.map((ele) => Object.values(ele)
    .slice(magicSliceMin, magicSliceMax));
    console.log(ingredientsValues);
  const ingredients = [];
  ingredientsValues.forEach((element) => {
    element.forEach((el) => {
      if (el !== '' && el !== null) {
        return ingredients.push(el);
      }
    });
  });

  return (
      <div>
      <Header />
        <h3>Drinks</h3>

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => console.log('BtnCompartilar') }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => console.log('BtnFavoritar') }
      >
        <img src={ whiteHeartIcon } alt="WhiteHeartIcon" />
      </button>

      {recipe.map((ele, ind) => (
        <div key={ ind }>
          <p data-testid="recipe-category">{ele.strCategory}</p>
          <img
            src={ ele.strDrinkThumb}
            alt={ ele.strDrink }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{ele.strDrink }</p>
          <h3>ingredient</h3>
          <ul>
            {ingredients.map((el, index) => (
              <li key={ index }>
                <label
                // className='ingredientCheck'
                  htmlFor="ingredient-step"
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    id="ingredient-step"
                    type="checkbox"
                  />
                  {el}

                </label>
              </li>
            ))}
          </ul>

          <h3>Instructions</h3>
          <p data-testid="instructions">{ele.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => console.log('BtnFinalizarReceita') }
          >
            Finalizar Receita
          </button>

        </div>))}

    </div>
  );
}

export default RecipeInProgressDrinks;
