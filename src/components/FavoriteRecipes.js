import { useEffect, useState } from 'react';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Header from './Header/Header';

function FavoriteRecipes() {
  const [allFavoriteRecipes, setAllFavoriteRecipes] = useState([]);
  const [isBtnShare, setIsBtnShare] = useState(true);
  const [theTypeFood, setTheTypeFood] = useState('');

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

  const removeFavorites = (id) => {
    const allFavRecipes = localStorage.getItem('favoriteRecipes');
    if (allFavRecipes) {
      const allFavoriteRecipesArray = JSON.parse(allFavRecipes);
      const checkRecipeIsFavorite = allFavoriteRecipesArray.some((ele) => ele.id === id);
      if (checkRecipeIsFavorite) {
        const newFavoriteArray = allFavoriteRecipesArray.filter((ele) => ele.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteArray));
      }
    }
    checkFavoriteRecipes();
  };

  useEffect(() => {
    checkFavoriteRecipes();
  }, []);

  return (
    <div>
      <Header />
      { allFavoriteRecipes
        ? (
          <div>
            <button
              type="button"
              name="all"
              data-testid="filter-by-all-btn"
              onClick={ () => { setTheTypeFood(''); } }
            >
              All
            </button>
            <button
              type="button"
              name="meals"
              data-testid="filter-by-meal-btn"
              onClick={ () => { setTheTypeFood('meal'); } }
            >
              Meals
            </button>
            <button
              type="button"
              name="meals"
              data-testid="filter-by-drink-btn"
              onClick={ () => { setTheTypeFood('drink'); } }
            >
              Drinks
            </button>
            <div>
              {
                allFavoriteRecipes
                  .filter(({ type }) => type.includes(theTypeFood))
                  .map((ele, ind) => (
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
                        onClick={ () => { removeFavorites(ele.id); } }
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
