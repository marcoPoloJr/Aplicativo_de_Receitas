import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { fetchMealsId, fetchDrinksId } from '../../service/fetchRecipes';
import RecipesContext from '../../context/RecipesContext';
import './RecipeDetails.css';

function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const location = useLocation().pathname;
  const [recipe, setRecipe] = useState('');
  const [ingrediente, setIngrediente] = useState([]);
  const [pounds, setPounds] = useState([]);
  const { allDrinks, allMeals } = useContext(RecipesContext);

  useEffect(() => {
    if (location.includes('meals')) {
      const getMealsDetails = async () => {
        const detailsMeal = await fetchMealsId(id);
        setRecipe(detailsMeal);
      };

      getMealsDetails();
    }
    if (location.includes('drinks')) {
      const getDrinksDetails = async () => {
        const detailsDrink = await fetchDrinksId(id);
        setRecipe(detailsDrink);
      };

      getDrinksDetails();
    }
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

  if (location.includes('drinks')) {
    const SEIS = 6;
    return (
      <div>
        <img
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrink }
          data-testid="recipe-photo"
        />
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
        <div id="divRecomen">
          {allMeals.slice(0, SEIS).map((ele, ind) => (
            <div
              key={ ind }
              data-testid={ `${ind}-recommendation-card` }
              id="divCardRecomen"
            >
              <img className="imgRecomen" src={ ele.strMealThumb } alt={ ele.strMeal } />
              <p data-testid={ `${ind}-recommendation-title` }>{ele.strMeal}</p>
            </div>
          ))}
        </div>
        <button
          id="btnStartRecipe"
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </div>
    );
  }

  if (location.includes('meals')) {
    const SEIS = 6;
    return (
      <div>
        <img
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
          data-testid="recipe-photo"
        />
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
        <div id="divRecomen">
          {allDrinks.slice(0, SEIS).map((eleme, ind) => (
            <div
              key={ ind }
              data-testid={ `${ind}-recommendation-card` }
              id="divCardRecomen"
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
        <button
          id="btnStartRecipe"
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
