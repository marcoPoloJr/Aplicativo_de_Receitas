import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { drinkBtnSearchFirstLetter, drinkBtnSearchIngredient, drinkBtnSearchName,
  fetchBtnSearchFirstLetter, fetchBtnSearchIngredient, fetchBtnSearchName,
} from '../../service/fetchRecipes';

export default function SearchBar() {
  const [search, setSearch] = useState({
    searchValue: '',
    filter: '',
  });
  const [searchBtn, setSearchBtn] = useState(false);
  const [apiRequest, setApiRequest] = useState([]);
  const { pathname } = useLocation();
  const history = useHistory();

  const saveInfoRadio = ({ target }) => {
    setSearch({ ...search, filter: target.id });
  };
  const saveSearchValue = ({ target }) => {
    setSearch({ ...search, searchValue: target.value });
  };

  const fetchForDrinks = async () => {
    switch (search.filter) {
    case 'ingrediente':
      setApiRequest(await drinkBtnSearchIngredient(search.searchValue));
      break;
    case 'name':
      setApiRequest(await drinkBtnSearchName(search.searchValue));
      break;

    default:
      if (search.searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      setApiRequest(await drinkBtnSearchFirstLetter(search.searchValue));
      break;
    }
  };

  const fetchForMeals = async () => {
    switch (search.filter) {
    case 'ingrediente':
      setApiRequest(await fetchBtnSearchIngredient(search.searchValue));
      break;
    case 'name':
      setApiRequest(await fetchBtnSearchName(search.searchValue));
      break;
    default:
      if (search.searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      setApiRequest(await fetchBtnSearchFirstLetter(search.searchValue));
      break;
    }
  };

  useEffect(() => {
    if (apiRequest.length === 1) {
      const url = apiRequest[0].idDrink || apiRequest[0].idMeal;
      history.push(`${pathname}/${url}`);
    }
  }, [apiRequest]);

  const handleClick = async () => {
    if (pathname === '/meals') {
      await fetchForMeals();
    }
    if (pathname === '/drinks') {
      await fetchForDrinks();
    }
  };
  const alertError = () => {
    setSearchBtn(false);
    return global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };
  const rencerRecipes = () => {
    if (pathname === '/meals') {
      return apiRequest.map((item, index) => (
        <div key={ item.idMeal } data-testid={ `${index}-recipe-card` }>
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
        </div>
      ));
    }
    if (pathname === '/drinks') {
      return apiRequest.map((item, index) => (
        <div key={ item.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
          />
          <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
        </div>
      ));
    }
  };
  return (
    <div>
      <form>
        <input type="text" data-testid="search-input" onChange={ saveSearchValue } />
        <label htmlFor="ingrediente">
          <input
            type="radio"
            name="searchBar"
            id="ingrediente"
            data-testid="ingredient-search-radio"
            onChange={ saveInfoRadio }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="searchBar"
            id="name"
            data-testid="name-search-radio"
            onChange={ saveInfoRadio }
          />

          Name

        </label>
        <label htmlFor="first">
          <input
            type="radio"
            name="searchBar"
            id="first"
            data-testid="first-letter-search-radio"
            onChange={ saveInfoRadio }
          />

          First letter

        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ async () => {
            await handleClick();
            setSearchBtn(true);
            if (searchBtn === true) setSearchBtn(false);
          } }
        >
          search
        </button>
      </form>
      <div>
        { (apiRequest.length === 0 && searchBtn) ? alertError() : rencerRecipes()}
      </div>
    </div>
  );
}
