import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Header from '../Header/Header';
import { fetchMealsId } from '../../service/fetchRecipes';
import '../../App.css';

function RecipeInProgressMeals() {
  const [meal, setMeal] = useState({});
  const [ingredientes, setIngredientes] = useState([]);
  const [idRecipe, setIdRecipe] = useState();
  const [ingredLocalSto, setIngredLocalSto] = useState([]);
  const [isBtnShare, setIsBtnShare] = useState(true);
  const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false);
  const location = useLocation().pathname;

  const checkFavoriteRecipeOrNot = () => {
    const numberId = location.match(/\d+/g).map(Number)[0];
    const allFavoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (allFavoriteRecipes) {
      const allFavoriteRecipesArray = JSON.parse(allFavoriteRecipes);
      const favoriteOk = allFavoriteRecipesArray
        .some((ele) => Number(ele.id) === numberId);
      if (favoriteOk) {
        setIsFavoriteRecipe(true);
        console.log('favorite');
      } else {
        console.log('NOfavorite');
        setIsFavoriteRecipe(false);
      }
    }
  };
  const saveRecipe = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = meal;
    const obj = {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    const allFavoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (allFavoriteRecipes) {
      const allFavoriteRecipesArray = JSON.parse(allFavoriteRecipes);
      const checkRecipeIsFavorite = allFavoriteRecipesArray
        .every((ele) => Number(ele.id) !== idRecipe);
      if (checkRecipeIsFavorite) {
        const arrayObj = [...allFavoriteRecipesArray, obj];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayObj));
      } else {
        const newFavoriteArray = allFavoriteRecipesArray
          .filter((ele) => Number(ele.id) !== idRecipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteArray));
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    }
    checkFavoriteRecipeOrNot();
  };
  const copyLink = () => {
    const MIL = 1000;
    setIsBtnShare(false);
    navigator.clipboard.writeText(`http://localhost:3000/meals/${idRecipe}`);
    setTimeout(() => {
      setIsBtnShare(true);
    }, MIL);
  };
  const checkIngreLocalStorage = () => {
    const numberId = location.match(/\d+/g).map(Number)[0];
    const inProgRecipe = localStorage.getItem('inProgressRecipes');
    if (inProgRecipe) {
      const inProgRecipeObj = JSON.parse(inProgRecipe);
      const allKeys = Object.keys(inProgRecipeObj);
      const checMealKey = allKeys.some((ele) => ele === 'meals');
      if (checMealKey) {
        const allRecipesMeal = Object.keys(inProgRecipeObj.meals);
        const checkRecipe = allRecipesMeal.some((ele) => Number(ele) === numberId);
        if (checkRecipe) {
          const arrIngre = inProgRecipeObj.meals[numberId];
          setIngredLocalSto(arrIngre);
        }
      }
    }
  };
  const handleLocalStorageBroke = (ingredient) => {
    const inProgRecipe = localStorage.getItem('inProgressRecipes');
    const inProgRecipeObj = JSON.parse(inProgRecipe);
    const keyDrinksAndMeals = Object.keys(inProgRecipeObj);
    const keyDrinksCheck = keyDrinksAndMeals.some((ele) => ele === 'drinks');
    const drinksObj = keyDrinksCheck ? inProgRecipeObj.drinks : {};
    const keyMealCheck = keyDrinksAndMeals.some((ele) => ele === 'meals');
    if (keyMealCheck) {
      const recipesMeal = Object.keys(inProgRecipeObj.meals);
      const checkRecipe = recipesMeal.some((ele) => Number(ele) === idRecipe);
      if (checkRecipe) {
        const arrAllIngre = inProgRecipeObj.meals[idRecipe];
        const checkArrayIngre = arrAllIngre.every((ele) => ele !== ingredient);
        if (checkArrayIngre) {
          const arrIngre = [...arrAllIngre, ingredient];
          inProgRecipeObj.meals[idRecipe] = arrIngre;
          const allFood = { drinks: drinksObj, meals: inProgRecipeObj.meals };
          localStorage.setItem('inProgressRecipes', JSON.stringify(allFood));
        } else {
          const newArrIngre = arrAllIngre.filter((ele) => ele !== ingredient);
          inProgRecipeObj.meals[idRecipe] = newArrIngre;
          const allFood = { drinks: drinksObj, meals: inProgRecipeObj.drinks };
          localStorage.setItem('inProgressRecipes', JSON.stringify(allFood));
        }
      } else {
        const objectMeal = { ...inProgRecipeObj.meals, [idRecipe]: [ingredient] };
        const allFood = { drinks: drinksObj, meals: objectMeal };
        localStorage.setItem('inProgressRecipes', JSON.stringify(allFood));
      }
    } else {
      const objMeal = {
        meals: { [idRecipe]: [ingredient] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(objMeal));
    }
  };
  const handleLocalStorage = (ingredient) => {
    const inProgRecipe = localStorage.getItem('inProgressRecipes');
    if (inProgRecipe) {
      handleLocalStorageBroke(ingredient);
    } else {
      const objMeal = {
        meals: { [idRecipe]: [ingredient] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(objMeal));
    }
    checkIngreLocalStorage();
  };
  const getAllIngredientes = (mealInProgress) => {
    const allKeys = Object.keys(mealInProgress);
    const allIngred = allKeys.filter((ele) => ele.includes('strIngredient'));
    const allIngredOk = allIngred.filter((ele) => mealInProgress[ele] !== '');
    const allIngredOk2 = allIngredOk.filter((ele) => mealInProgress[ele] !== null);
    setIngredientes(allIngredOk2);
  };
  const getTheMealInProgress = async () => {
    const numberId = location.match(/\d+/g).map(Number)[0];
    setIdRecipe(numberId);
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
    handleLocalStorage(target.name);
  };
  useEffect(() => {
    getTheMealInProgress();
    checkIngreLocalStorage();
    checkFavoriteRecipeOrNot();
  }, []);
  return (
    <div>
      <Header />
      <h3>Meals</h3>
      {isBtnShare
        ? (
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => { copyLink(); } }
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>) : <p>Link copied!</p>}
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => { saveRecipe(); } }
        src={ isFavoriteRecipe ? blackHeartIcon : whiteHeartIcon }
        aria-label={ isFavoriteRecipe ? 'remove favorite' : 'favorite it' }
      >
        <img
          src={ isFavoriteRecipe ? blackHeartIcon : whiteHeartIcon }
          alt={ isFavoriteRecipe ? 'blackHeartIcon' : 'whiteHeartIcon' }
        />
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
                <label
                  htmlFor={ ind }
                  data-testid={ `${ind}-ingredient-step` }
                  className={ ingredLocalSto
                    .includes(meal[ele]) ? 'ingredientCheck' : '' }
                >
                  <input
                    id={ ind }
                    name={ meal[ele] }
                    checked={ ingredLocalSto.some((eleme) => eleme === meal[ele]) }
                    type="checkbox"
                    onChange={ handleCheck }
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
          disabled={true}
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}
export default RecipeInProgressMeals;
