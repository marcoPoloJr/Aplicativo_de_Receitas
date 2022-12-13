import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import RecipesContext from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Header from '../Header/Header';
import { fetchDrinksId } from '../../service/fetchRecipes';
import '../../App.css';

function RecipeInProgressDrinks() {
  const [drink, setDrink] = useState({});
  const [ingredientes, setIngredientes] = useState([]);
  const [idRecipe, setIdRecipe] = useState();
  const [ingredLocalSto, setIngredLocalSto] = useState([]);
  const location = useLocation().pathname;

  const checkIngreLocalStorage = () => {
    const numberId = location.match(/\d+/g).map(Number)[0];
    const inProgRecipe = localStorage.getItem('inProgressRecipes');
    if (inProgRecipe) {
      const inProgRecipeObj = JSON.parse(inProgRecipe);
      const allKeys = Object.keys(inProgRecipeObj);
      const checkDrinkKey = allKeys.some((ele) => ele === 'drinks');
      if (checkDrinkKey) {
        const allRecipesDrink = Object.keys(inProgRecipeObj.drinks);
        const checkRecipe = allRecipesDrink.some((ele) => Number(ele) === numberId);
        if (checkRecipe) {
          const arrIngre = inProgRecipeObj.drinks[numberId];
          setIngredLocalSto(arrIngre);
        }
      }
    }
  };

  const handleLocalStorageBroke = (ingredient) => {
    const inProgRecipe = localStorage.getItem('inProgressRecipes');
    const inProgRecipeObj = JSON.parse(inProgRecipe);
    const keyDrinksAndMeals = Object.keys(inProgRecipeObj);
    const keyMealsCheck = keyDrinksAndMeals.some((ele) => ele === 'meals');
    const mealsObj = keyMealsCheck ? inProgRecipeObj.meals : {};
    const keyDrinkCheck = keyDrinksAndMeals.some((ele) => ele === 'drinks');
    if (keyDrinkCheck) {
      const recipesDrink = Object.keys(inProgRecipeObj.drinks);
      const checkRecipe = recipesDrink.some((ele) => Number(ele) === idRecipe);
      if (checkRecipe) {
        const arrAllIngre = inProgRecipeObj.drinks[idRecipe];
        const checkArrayIngre = arrAllIngre.every((ele) => ele !== ingredient);
        if (checkArrayIngre) {
          const arrIngre = [...arrAllIngre, ingredient];
          inProgRecipeObj.drinks[idRecipe] = arrIngre;
          const allFood = { drinks: inProgRecipeObj.drinks, meals: mealsObj };
          localStorage.setItem('inProgressRecipes', JSON.stringify(allFood));
        } else {
          const newArrIngre = arrAllIngre.filter((ele) => ele !== ingredient);
          inProgRecipeObj.drinks[idRecipe] = newArrIngre;
          const allFood = { drinks: inProgRecipeObj.drinks, meals: mealsObj };
          localStorage.setItem('inProgressRecipes', JSON.stringify(allFood));
        }
      } else {
        const objectDrink = { ...inProgRecipeObj.drinks, [idRecipe]: [ingredient] };
        const allFood = { drinks: objectDrink, meals: mealsObj };
        localStorage.setItem('inProgressRecipes', JSON.stringify(allFood));
      }
    } else {
      const objDrink = {
        drinks: { [idRecipe]: [ingredient] },
      };
      const allFood = { objDrink, mealsObj };
      localStorage.setItem('inProgressRecipes', JSON.stringify(allFood));
    }
    checkIngreLocalStorage();
  };

  const handleLocalStorage = (ingredient) => {
    const inProgRecipe = localStorage.getItem('inProgressRecipes');
    if (inProgRecipe) {
      handleLocalStorageBroke(ingredient);
    } else {
      const objDrink = {
        drinks: { [idRecipe]: [ingredient] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(objDrink));
    }
    checkIngreLocalStorage();
  };

  const getAllIngredientes = (drinkInProgress) => {
    const allKeys = Object.keys(drinkInProgress);
    const allIngred = allKeys.filter((ele) => ele.includes('strIngredient'));
    const allIngredOk = allIngred.filter((ele) => drinkInProgress[ele] !== null);
    const allIngredOk2 = allIngredOk.filter((ele) => drinkInProgress[ele] !== '');
    setIngredientes(allIngredOk2);
  };

  const getTheDrinkInProgress = async () => {
    const numberId = location.match(/\d+/g).map(Number)[0];
    setIdRecipe(numberId);
    const drinkInProgress = await fetchDrinksId(numberId);
    setDrink(drinkInProgress);

    getAllIngredientes(drinkInProgress);
  };

  const handleCheck = ({ target }) => {
    if (target.checked) {
      target.parentElement.classList = 'ingredientCheck';
    } else {
      target.parentElement.classList = '';
    }
    handleLocalStorage(target.name);
  };

  useEffect(() => {
    getTheDrinkInProgress();
    checkIngreLocalStorage();
  }, []);

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

      <div>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">{drink.strDrink}</p>
        <p data-testid="recipe-category">{drink.strAlcoholic}</p>

        <h3>Instructions</h3>
        <p data-testid="instructions">{drink.strInstructions}</p>

        <ul>
          {
            ingredientes.map((ele, ind) => (
              <li key={ ind }>
                <label
                  htmlFor={ ind }
                  data-testid={ `${ind}-ingredient-step` }
                  className={ ingredLocalSto
                    .includes(drink[ele]) ? 'ingredientCheck' : '' }
                >
                  <input
                    id={ ind }
                    name={ drink[ele] }
                    checked={ ingredLocalSto.some((eleme) => eleme === drink[ele]) }
                    type="checkbox"
                    onChange={ handleCheck }
                  />
                  {drink[ele]}
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
    </div>
  );
}

export default RecipeInProgressDrinks;
