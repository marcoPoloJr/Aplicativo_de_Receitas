import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import RecipesContext from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Header from '../Header/Header';
import { fetchMealsId } from '../../service/fetchRecipes';
import '../../App.css';

function RecipeInProgressMeals() {
  const [meal, setMeal] = useState({});
  const [ingredientes, setIngredientes] = useState([]);
  const [quant, setQuant] = useState([]);
  // const {
  //   allMeals,
  //   // , allDrinks, allBtnsMeal, allBtnsDrink, filterEspecifMeal, filterEspecifDrink,
  // } = useContext(RecipesContext);
  const location = useLocation().pathname;
  // const numberPathname = location.match(/\d+/g).map(Number)[0];
  // console.log(numberPathname);
  // const recipe = allMeals.filter((ele) => ele.idMeal.includes(numberPathname));
  // console.log(allMeals);
  // const magicSliceMin = 9;
  // const magicSliceMax = 29;
  // const ingredientsValues = recipe.map((ele) => Object.values(ele)
  //   .slice(magicSliceMin, magicSliceMax));
  // const ingredients = [];
  // ingredientsValues.forEach((element) => {
  //   element.forEach((el) => {
  //     if (el !== '' && el !== null) {
  //       return ingredients.push(el);
  //     }
  //   });
  // });
  const getAllIngredientes = (mealInProgress) => {
    const allKeys = Object.keys(mealInProgress);
    const allIngred = allKeys.filter((ele) => ele.includes('strIngredient'));
    const allIngredOk = allIngred.filter((ele) => mealInProgress[ele] !== '');
    const allIngredOk2 = allIngredOk.filter((ele) => mealInProgress[ele] !== null);
    const allQuant = allKeys.filter((ele) => ele.includes('strMeasure'));
    const allQuantOk = allQuant.filter((ele) => mealInProgress[ele] !== '');
    setIngredientes(allIngredOk2);
    setQuant(allQuantOk);
  };

  const getTheMealInProgress = async () => {
    const numberId = location.match(/\d+/g).map(Number)[0];
    const mealInProgress = await fetchMealsId(numberId);
    setMeal(mealInProgress);

    getAllIngredientes(mealInProgress);
  };

  const handleCheck = ({ target }) => {
    if (target.checked) {
      target.parentElement.classList = 'ingredientCheck';
    } else {
      target.parentElement.classList = '';
    }
  };

  useEffect(() => {
    getTheMealInProgress();
  }, [ingredientes]);

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

      <div>
        <img
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">{meal.strMeal}</p>
        <p data-testid="recipe-category">{meal.strTags}</p>

        <h3>Instructions</h3>
        <p data-testid="instructions">{meal.strInstructions}</p>

        <ul>
          {
            ingredientes.map((ele, ind) => (
              <li key={ ind }>
                <label htmlFor={ ind } data-testid={ `${ind}-ingredient-step` }>
                  <input
                    id={ ind }
                    name={ meal[ele] }
                    type="checkbox"
                    onClick={ handleCheck }
                  />
                  {meal[ele]}
                </label>
              </li>
            ))
          }
        </ul>

        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => console.log('BtnFinalizarReceita') }
        >
          Finalizar Receita
        </button>
      </div>

      {/* {recipe.map((ele, ind) => (
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
                  htmlFor={ index }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    id={ index }
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

        </div>))} */}

    </div>
  );
}

export default RecipeInProgressMeals;
