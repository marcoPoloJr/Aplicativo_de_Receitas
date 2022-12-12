// import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../../App.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [buttonSearch, setButtonSearch] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  const searchButton = () => {
    setButtonSearch(!buttonSearch);
  };

  const titilePage = () => {
    if (pathname === '/profile') return 'Profile';
    if (pathname === '/meals') return 'Meals';
    if (pathname === '/drinks') return 'Drinks';
    if (pathname === '/done-recipes') return 'Done Recipes';
    if (pathname === '/favorite-recipes') return 'Favorite Recipes';
  };
  return (
    <header>
      <div>
        <p data-testid="page-title">
          {titilePage()}
        </p>
        <button
          type="button"
          className="searchBtn"
          onClick={ () => {
            history.push('/profile');
          } }
        >
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>

        {
          (pathname !== '/profile' && pathname !== '/done-recipes'
          && pathname !== '/favorite-recipes')
          && (
            <button type="button" onClick={ searchButton } className="searchBtn">
              <img
                src={ searchIcon }
                data-testid="search-top-btn"
                alt="searchIcon"
              />
            </button>
          )
        }

      </div>
      {
        buttonSearch && <SearchBar />
      }
    </header>
  );
}

// Header.propTypes = {
//   location: PropTypes.shape({
//     pathname: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default Header;
