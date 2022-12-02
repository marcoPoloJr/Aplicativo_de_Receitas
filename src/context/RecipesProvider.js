import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import {
  fetchMeal, fetchDrink, fetchBtnsMeal, fetchBtnsDrinks } from '../service/fetchRecipes';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [allMeals, setAllMeals] = useState([]);
  const [allDrinks, setAllDrinks] = useState([]);
  const [allBtnsMeal, setAllBtnsMeal] = useState([]);
  const [allBtnsDrink, setAllBtnsDrink] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const meals = await fetchMeal();
      const drinks = await fetchDrink();
      const bntsMeal = await fetchBtnsMeal();
      const bntsDrink = await fetchBtnsDrinks();
      setAllMeals(meals);
      setAllDrinks(drinks);
      setAllBtnsMeal(bntsMeal);
      setAllBtnsDrink(bntsDrink);
    };

    getRecipes();
  }, []);

  const things = useMemo(() => ({
    allMeals,
    allDrinks,
    allBtnsMeal,
    allBtnsDrink,
  }), [allMeals, allDrinks, allBtnsMeal, allBtnsDrink]);

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
