import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { fetchMeal, fetchDrink } from '../service/fetchRecipes';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [allMeals, setAllMeals] = useState([]);
  const [allDrinks, setAllDrinks] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const meals = await fetchMeal();
      const drinks = await fetchDrink();
      setAllMeals(meals);
      setAllDrinks(drinks);
    };

    getRecipes();
  }, []);

  const things = useMemo(() => ({
    allMeals,
    allDrinks,
  }), [allMeals, allDrinks]);

  return (
    <RecipesContext.Provider value={ things }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;
