function RecipeInProgress() {
  const {
    allMeals,
    // , allDrinks, allBtnsMeal, allBtnsDrink, filterEspecifMeal, filterEspecifDrink,
  } = useContext(RecipesContext);
  const location = useLocation().pathname;
  const numberPathname = location.match(/\d+/g).map(Number)[0];
  console.log(allMeals);
  const recipe = allMeals.filter((ele) => ele.idMeal.includes(numberPathname));
  // const ingredients = recipe.map((ele) => Object.keys(ele).filter((el) => el.includes('strIngredient')));
  // const test = recipe.map((ele)=>Object.entries(ele).map((el)=>el))
  console.log(recipe);
  // console.log(ingredients);
  // console.log(test);

  return (
    <div>
      <h1>ola</h1>

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
      {recipe.map((ele, ind) => (
        <div key={ ind }>
          <p data-testid="recipe-category">{ele.strTags}</p>
          <img
            src={ ele.strMealThumb }
            alt={ ele.strMeal }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{ele.strMeal}</p>

          <h3>instructions</h3>
          <p data-testid="instructions">{ele.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => console.log('BtnFinalizarReceita') }
          >
            Finalizar Receita
          </button>

        </div>))}

    </div>
  );
}

export default RecipeInProgress;
