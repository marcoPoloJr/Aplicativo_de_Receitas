import { useState, useEffect } from 'react';

function FavoriteRecipes() {
  const [allFavoriteRecipes, setAllFavoriteRecipes] = useState([]);

  const checkFavoriteRecipes = () => {
    const allFavRecipe = localStorage.getItem('favoriteRecipes');
    if (allFavRecipe) {
      const allFavRecipeArray = JSON.parse(allFavRecipe);
      setAllFavoriteRecipes(allFavRecipeArray);
    }
  };

  useEffect(() => {
    checkFavoriteRecipes();
  }, []);

  return (
    <div>
      { allFavoriteRecipes
        ? (
          <div>
            <button
              type="button"
              name="all"
              data-testid="filter-by-all-btn"
            >
              All
            </button>
            <button
              type="button"
              name="meals"
              data-testid="filter-by-meal-btn"
              // onClick={ () => { filterEspecifMeal('all'); } }
            >
              Meals
            </button>
            <button
              type="button"
              name="meals"
              data-testid="filter-by-drink-btn"
              // onClick={ () => { filterEspecifMeal('all'); } }
            >
              Meals
            </button>
            <div>
              {
                allFavoriteRecipes.map((ele, ind) => (
                  <div key={ ind }>
                    <img
                      src={ ele.image }
                      alt={ ele.name }
                      data-testid={ `${ind}-horizontal-image` }
                    />
                    <h3 data-testid={ `${ind}-horizontal-name` }>{ele.name}</h3>
                    <p
                      data-testid={ `${ind}-horizontal-top-text` }
                    >
                      {ele.category}
                    </p>
                    <button
                      type="button"
                      data-testid={ `${ind}-horizontal-share-btn` }
                      // onClick={ () => { copyLink(); } }
                    >
                      Compartilhar
                    </button>
                    <button
                      type="button"
                      data-testid={ `${ind}-horizontal-favorite-btn` }
                      // onClick={ () => { copyLink(); } }
                    >
                      Favoritar
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        ) : <p>Não há receitas favoritas =/</p>}
    </div>
  );
}

export default FavoriteRecipes;