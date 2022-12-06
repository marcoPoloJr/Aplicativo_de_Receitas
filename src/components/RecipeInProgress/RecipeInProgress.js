import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const {
    allMeals,
    // , allDrinks, allBtnsMeal, allBtnsDrink, filterEspecifMeal, filterEspecifDrink,
  } = useContext(RecipesContext);
  const location = useLocation().pathname;
  console.log(location);
  console.log(allMeals);
  const test = allMeals.filter((ele) => ele.idMeal.includes('52977'));
  console.log(test);

  return (
    <div>
      <h1>ola</h1>
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
      {test.map((ele, ind) => (
        <div key={ ind }>
          <p data-testid="recipe-category">{ele.strTags}</p>
          <img
            src={ ele.strMealThumb }
            alt={ ele.strMeal }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{ele.strMeal}</p>
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

export default RecipeInProgress;
