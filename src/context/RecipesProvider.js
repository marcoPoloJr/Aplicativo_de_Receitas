import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import {
  fetchMeal, fetchDrink, fetchBtnsMeal, fetchBtnsDrinks } from '../service/fetchRecipes';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [allMeals, setAllMeals] = useState([]);
  const [allMealsFixed, setAllMealsFixed] = useState([]);
  const [allDrinks, setAllDrinks] = useState([]);
  const [allDrinksFixed, setAllDrinksFixed] = useState([]);
  const [allBtnsMeal, setAllBtnsMeal] = useState([]);
  const [allBtnsDrink, setAllBtnsDrink] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const meals = await fetchMeal();
      const drinks = await fetchDrink();
      const bntsMeal = await fetchBtnsMeal();
      const bntsDrink = await fetchBtnsDrinks();
      setAllMeals(meals);
      setAllMealsFixed(meals);
      setAllDrinks(drinks);
      setAllDrinksFixed(drinks);
      setAllBtnsMeal(bntsMeal);
      setAllBtnsDrink(bntsDrink);
    };

    getRecipes();
  }, []);

  const filterEspecifMeal = async (typeFood) => {
    if (typeFood === 'all') {
      setAllMeals(allMealsFixed);
    } else {
      const meals = await fetchMeal(typeFood);
      setAllMeals(meals);
    }
  };

  const filterEspecifDrink = async (typeDrink) => {
    if (typeDrink === 'all') {
      setAllDrinks(allDrinksFixed);
    } else {
      const drinks = await fetchDrink(typeDrink);
      setAllDrinks(drinks);
    }
  };

  const things = useMemo(() => ({
    allMeals,
    allDrinks,
    allBtnsMeal,
    allBtnsDrink,
    filterEspecifMeal,
    filterEspecifDrink,
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
