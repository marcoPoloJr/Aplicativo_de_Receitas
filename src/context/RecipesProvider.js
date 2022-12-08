import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import {
  fetchBtnsDrinks, fetchBtnsMeal,
  fetchDrink, fetchMeal,
} from '../service/fetchRecipes';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [allMeals, setAllMeals] = useState([]);
  const [allMealsFixed, setAllMealsFixed] = useState([]);
  const [allDrinks, setAllDrinks] = useState([]);
  const [allDrinksFixed, setAllDrinksFixed] = useState([]);
  const [allBtnsMeal, setAllBtnsMeal] = useState([]);
  const [allBtnsDrink, setAllBtnsDrink] = useState([]);
  const [searchBtn, setSearchBtn] = useState(false); //

  const [typeMeal, setTypeMeal] = useState('');
  const [typeDrink, setTypeDrink] = useState('');

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

  const setSearched = (value) => {
    setSearchBtn(value);
  };

  const filterEspecifMeal = async (typeFood) => {
    if (typeFood === 'all') {
      setAllMeals(allMealsFixed);
    } else if (typeMeal === typeFood) {
      setAllMeals(allMealsFixed);
    } else {
      setTypeMeal(typeFood);
      const meals = await fetchMeal(typeFood);
      setAllMeals(meals);
    }
  };

  const filterEspecifDrink = async (typeBeverage) => {
    if (typeBeverage === 'all') {
      setAllDrinks(allDrinksFixed);
    } else if (typeDrink === typeBeverage) {
      setAllDrinks(allDrinksFixed);
    } else {
      setTypeDrink(typeBeverage);
      const drinks = await fetchDrink(typeBeverage);
      setAllDrinks(drinks);
    }
  };

  const things = useMemo(() => ({
    allMeals,
    allDrinks,
    allBtnsMeal,
    allBtnsDrink,
    searchBtn,
    setSearched,
    filterEspecifMeal,
    filterEspecifDrink,
  }), [allMeals, allDrinks, allBtnsMeal, allBtnsDrink, searchBtn]);

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
