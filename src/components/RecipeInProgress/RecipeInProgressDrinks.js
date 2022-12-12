import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import RecipesContext from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Header from '../Header/Header';
import { fetchDrinksId } from '../../service/fetchRecipes';
// import App from '../../App.css';

function RecipeInProgressDrinks() {
  const [drink, setDrink] = useState({});
  // const {
  //   allDrinks,
  //   // alldrinks, allBtnsdrink, allBtnsDrink, filterEspecifdrink, filterEspecifDrink,
  // } = useContext(RecipesContext);
  // console.log(allDrinks);
  const location = useLocation().pathname;
  // const numberPathname = location.match(/\d+/g).map(Number)[0];
  // const recipe = allDrinks.filter((ele) => ele.idDrink.includes(numberPathname));
  // const magicSliceMin = 17;
  // const magicSliceMax = 32;
  // const ingredientsValues = recipe.map((ele) => Object.values(ele)
  //   .slice(magicSliceMin, magicSliceMax));
  // console.log(ingredientsValues);
  // const ingredients = [];
  // ingredientsValues.forEach((element) => {
  //   element.forEach((el) => {
  //     if (el !== '' && el !== null) {
  //       return ingredients.push(el);
  //     }
  //   });
  // });

  const getTheDrinkInProgress = async () => {
    const numberId = location.match(/\d+/g).map(Number)[0];
    const drinkInProgress = await fetchDrinksId(numberId);
    setDrink(drinkInProgress);
  };

  // const handleCheck = ({ target }) => {
  //   if (target.checked) {
  //     target.parentElement.classList = 'ingredientCheck';
  //   } else {
  //     target.parentElement.classList = '';
  //   }
  // };

  useEffect(() => {
    getTheDrinkInProgress();
  }, []);

  return (
    <div>
      <Header />
      <h3>Drinks</h3>

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => console.log('BtnCompartilar') }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => console.log('BtnFavoritar') }
      >
        <img src={ whiteHeartIcon } alt="WhiteHeartIcon" />
      </button>

      <div>
        <img
          src={ drink.strdrinkThumb }
          alt={ drink.strdrink }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">{drink.strdrink}</p>
        <p data-testid="recipe-category">{drink.strTags}</p>

        <h3>Instructions</h3>
        <p data-testid="instructions">{drink.strInstructions}</p>

        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => console.log('BtnFinalizarReceita') }
        >
          Finalizar Receita
        </button>
      </div>

      {/* {recipe.map((ele, ind) => (
        <div key={ ind }>
          <p data-testid="recipe-category">{ele.strCategory}</p>
          <img
            src={ ele.strDrinkThumb }
            alt={ ele.strDrink }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{ele.strDrink }</p>
          <h3>ingredient</h3>
          <ul>
            {ingredients.map((el, index) => (
              <li key={ index }>
                <label
                  htmlFor={ index }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    id={ index }
                    type="checkbox"
                    onClick={ handleCheck }
                  />
                  {el}

                </label>
              </li>
            ))}
          </ul>

          <h3>Instructions</h3>
          <p data-testid="instructions">{ele.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => console.log('BtnFinalizarReceita') }
          >
            Finalizar Receita
          </button>

        </div>))} */}

    </div>
  );
}

export default RecipeInProgressDrinks;
