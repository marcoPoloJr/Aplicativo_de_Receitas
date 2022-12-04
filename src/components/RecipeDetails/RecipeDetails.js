import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMealsId, fetchDrinksId } from '../../service/fetchRecipes';

function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const location = useLocation().pathname;
  const [recipe, setRecipe] = useState('');

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
  if (location.includes('drinks')) {
    return (
      <h2>{recipe.strDrink}</h2>
    );
  }

  if (location.includes('meals')) {
    return (
      <h2>{recipe.strMeal}</h2>
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
