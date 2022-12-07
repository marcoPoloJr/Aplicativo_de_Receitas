import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { fetchDrinksId } from '../../service/fetchRecipes';
import RecipesContext from '../../context/RecipesContext';
import '../RecipeDetails/RecipeDetails.css';

function DrinkDetails({ id }) {
  const [recipe, setRecipe] = useState('');
  const [ingrediente, setIngrediente] = useState([]);
  const [pounds, setPounds] = useState([]);
  const [isProgress, setIsProgress] = useState(false);
  const { allMeals } = useContext(RecipesContext);

  const checkProgressRecipe = () => {
    const allProgressRecipe = localStorage.getItem('inProgressRecipes');
    if (allProgressRecipe) {
      const allProgressRecipeObj = JSON.parse(allProgressRecipe);
      const chavesGeral = Object.keys(allProgressRecipeObj);
      if (chavesGeral.includes('meals')) {
        const chavesMeals = Object.keys(allProgressRecipeObj.meals);
        if (chavesMeals.includes(id)) setIsProgress(true);
      }
      if (chavesGeral.includes('drinks')) {
        const chavesDrinks = Object.keys(allProgressRecipeObj.drinks);
        if (chavesDrinks.includes(id)) setIsProgress(true);
      }
    }
  };

  useEffect(() => {
    const getDrinksDetails = async () => {
      const detailsDrink = await fetchDrinksId(id);
      setRecipe(detailsDrink);
    };

    getDrinksDetails();

    checkProgressRecipe();
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
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
        width="350px"
        height="350px"
      />
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
      <h3 data-testid="recipe-category">{recipe.strAlcoholic}</h3>
      <h3>Ingredientes:</h3>
      <ul>
        {ingrediente.map((ele, ind) => (
          ele
            ? (
              <li
                key={ ind }
                data-testid={ `${ind}-ingredient-name-and-measure` }
              >
                {`Item: ${ele} - Quant:${pounds[ind]}`}
              </li>
            )
            : null))}
      </ul>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <h3>Recomended</h3>
      <div className="divRecomen">
        {allMeals.slice(0, SEIS).map((ele, ind) => (
          <div
            key={ ind }
            data-testid={ `${ind}-recommendation-card` }
            className="divCardRecomen"
          >
            <img className="imgRecomen" src={ ele.strMealThumb } alt={ ele.strMeal } />
            <p data-testid={ `${ind}-recommendation-title` }>{ele.strMeal}</p>
          </div>
        ))}
      </div>
      <Link to={ `/drinks/${id}/in-progress` }>
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

DrinkDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DrinkDetails;