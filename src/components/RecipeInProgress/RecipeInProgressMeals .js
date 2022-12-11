import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Header from '../Header/Header';
import '../../App.css';

function RecipeInProgressMeals() {
  const {
    allMeals,
    // , allDrinks, allBtnsMeal, allBtnsDrink, filterEspecifMeal, filterEspecifDrink,
  } = useContext(RecipesContext);
  const [ingredientCheck, getIngredientCheck]= useState([])
  const location = useLocation().pathname;
  const numberPathname = location.match(/\d+/g).map(Number)[0];
  const recipe = allMeals.filter((ele) => ele.idMeal.includes(numberPathname));
  const magicSliceMin = 9;
  const magicSliceMax = 29;
  const ingredientsValues = recipe.map((ele) => Object.values(ele)
    .slice(magicSliceMin, magicSliceMax));
  const ingredients = [];
  ingredientsValues.forEach((element) => {
    element.forEach((el) => {
      if (el !== '' && el !== null) {
        return ingredients.push(el);
      }
    });
  });
  const handleCheck = ({ target }) => {
    console.log(target.parentElement)
    if (target.checked) {
      target.parentElement.classList = 'ingredientCheck';
      
    } else {
      target.parentElement.classList = '';
    }
  };
  return (
    <div>
      <Header />
      <h3>Meals</h3>

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
          <p data-testid="recipe-category">{ele.strTags}</p>
          <img
            src={ ele.strMealThumb }
            alt={ ele.strMeal }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{ele.strMeal}</p>
          <h3>Ingredient</h3>
          <ul>
            {ingredients.map((el, index) => (
              <li key={ index }>
                <label
                  htmlFor="ingredient-step"
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    id="ingredient-step"
                    type="checkbox"
                    onClick={ handleCheck }
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

export default RecipeInProgressMeals;
