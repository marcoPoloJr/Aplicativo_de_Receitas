import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { fetchMealsId } from '../../service/fetchRecipes';
import RecipesContext from '../../context/RecipesContext';
import '../RecipeDetails/RecipeDetails.css';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function MealDetails({ id }) {
  const location = useLocation().pathname;
  const [recipe, setRecipe] = useState('');
  const [ingrediente, setIngrediente] = useState([]);
  const [pounds, setPounds] = useState([]);
  const [isProgress, setIsProgress] = useState(false);
  const [isBtnShare, setIsBtnShare] = useState(true);
  const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false);
  const { allDrinks } = useContext(RecipesContext);

  const checkProgressRecipe = () => {
    const allProgressRecipe = localStorage.getItem('inProgressRecipes');
    if (allProgressRecipe) {
      const allProgressRecipeObj = JSON.parse(allProgressRecipe);
      const chavesGeral = Object.keys(allProgressRecipeObj);
      if (chavesGeral.includes('meals')) {
        const chavesMeals = Object.keys(allProgressRecipeObj.meals);
        if (chavesMeals.includes(id)) setIsProgress(true);
      }
    }
  };

  const copyLink = () => {
    const MIL = 1000;
    setIsBtnShare(false);
    navigator.clipboard.writeText(`http://localhost:3000${location}`);
    setTimeout(() => {
      setIsBtnShare(true);
    }, MIL);
  };

  const checkFavoriteRecipeOrNot = () => {
    const allFavoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (allFavoriteRecipes) {
      const allFavoriteRecipesArray = JSON.parse(allFavoriteRecipes);
      const favoriteOk = allFavoriteRecipesArray.some((ele) => ele.id === id);
      if (favoriteOk) {
        setIsFavoriteRecipe(true);
      } else {
        setIsFavoriteRecipe(false);
      }
    }
  };

  const saveRecipe = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe;
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
      const checkRecipeIsFavorite = allFavoriteRecipesArray.every((ele) => ele.id !== id);
      if (checkRecipeIsFavorite) {
        const arrayObj = [...allFavoriteRecipesArray, obj];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayObj));
      } else {
        const newFavoriteArray = allFavoriteRecipesArray.filter((ele) => ele.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteArray));
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    }
    checkFavoriteRecipeOrNot();
  };

  useEffect(() => {
    const getMealsDetails = async () => {
      const detailsMeal = await fetchMealsId(id);
      setRecipe(detailsMeal);
    };

    getMealsDetails();
    checkProgressRecipe();
    checkFavoriteRecipeOrNot();
  }, []);

  useEffect(() => {
    const { strIngredient1, strIngredient2, strIngredient3, strIngredient4,
      strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9,
      strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14,
      strIngredient15, strIngredient16, strIngredient17, strIngredient18, strIngredient19,
      strIngredient20 } = recipe;

    const allIngredient = [strIngredient1, strIngredient2, strIngredient3, strIngredient4,
      strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9,
      strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14,
      strIngredient15, strIngredient16, strIngredient17, strIngredient18, strIngredient19,
      strIngredient20];
    setIngrediente(allIngredient);

    const { strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6,
      strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12,
      strMeasure13, strMeasure14, strMeasure15, strMeasure16, strMeasure17, strMeasure18,
      strMeasure19, strMeasure20 } = recipe;

    const allPounds = [strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5,
      strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11,
      strMeasure12, strMeasure13, strMeasure14, strMeasure15, strMeasure16, strMeasure17,
      strMeasure18, strMeasure19, strMeasure20];
    setPounds(allPounds);
  }, [recipe]);

  const SEIS = 6;
  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      {isBtnShare
        ? (
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => { copyLink(); } }
          >
            Compartilhar
          </button>) : <p>Link copied!</p>}
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => { saveRecipe(); } }
        src={ isFavoriteRecipe ? blackHeartIcon : whiteHeartIcon }
        aria-label={ isFavoriteRecipe ? 'remove favorite' : 'favorite it' } // coment 1
      >
        <img
          src={ isFavoriteRecipe ? blackHeartIcon : whiteHeartIcon }
          alt={ isFavoriteRecipe ? 'blackHeartIcon' : 'whiteHeartIcon' }
        />
      </button>
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
      <h3>Ingredientes:</h3>
      <ul>
        {ingrediente.map((eleme, ind) => (
          eleme
            ? (
              <li
                key={ ind }
                data-testid={ `${ind}-ingredient-name-and-measure` }
              >
                {`Item: ${eleme} - Quant:${pounds[ind]}`}
              </li>
            )
            : null))}
      </ul>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <iframe
        width="747"
        height="420"
        src={ recipe ? recipe.strYoutube.replace('/watch?v=', '/embed/') : null }
        title={ recipe.strMeal }
        frameBorder="0"
        allow="accelerometer;
            autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        data-testid="video"
      />
      <h3>Recomended</h3>
      <div className="divRecomen">
        {allDrinks.slice(0, SEIS).map((eleme, ind) => (
          <div
            key={ ind }
            data-testid={ `${ind}-recommendation-card` }
            className="divCardRecomen"
          >
            <img
              className="imgRecomen"
              src={ eleme.strDrinkThumb }
              alt={ eleme.strDrink }
            />
            <p data-testid={ `${ind}-recommendation-title` }>{eleme.strDrink}</p>
          </div>
        ))}
      </div>
      <Link to={ `/meals/${id}/in-progress` }>
        <button
          className="btnStartRecipe"
          type="button"
          data-testid="start-recipe-btn"
        >
          { isProgress ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      </Link>
    </div>
  );
}

MealDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MealDetails;

// Coments:
// 1- https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/control-has-associated-label.md
