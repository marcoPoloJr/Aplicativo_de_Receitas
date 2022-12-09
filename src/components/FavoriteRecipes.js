import { useState, useEffect } from 'react';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [allFavoriteRecipes, setAllFavoriteRecipes] = useState([]);
  const [isBtnShare, setIsBtnShare] = useState(true);

  const checkFavoriteRecipes = () => {
    const allFavRecipe = localStorage.getItem('favoriteRecipes');
    if (allFavRecipe) {
      const allFavRecipeArray = JSON.parse(allFavRecipe);
      setAllFavoriteRecipes(allFavRecipeArray);
    }
  };

  const copyLink = (typeFood, idFood) => {
    const urlMaked = `/${typeFood}s/${idFood}`;
    const MIL = 1000;
    setIsBtnShare(false);
    navigator.clipboard.writeText(`http://localhost:3000${urlMaked}`);
    setTimeout(() => {
      setIsBtnShare(true);
    }, MIL);
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
                      {ele.type === 'meal' ? `${ele.nationality} - ${ele.category}`
                        : `${ele.alcoholicOrNot}`}
                    </p>
                    {isBtnShare
                      ? (
                        <button
                          type="button"
                          data-testid={ `${ind}-horizontal-share-btn` }
                          src={ shareIcon }
                          onClick={ () => { copyLink(ele.type, ele.id); } }
                        >
                          <img src={ shareIcon } alt="shareIcon" />
                        </button>) : <span>Link copied!</span>}
                    <button
                      type="button"
                      data-testid={ `${ind}-horizontal-favorite-btn` }
                      src={ blackHeart }
                      // onClick={ () => { copyLink(); } }
                    >
                      <img src={ blackHeart } alt="blackHeart" />
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
