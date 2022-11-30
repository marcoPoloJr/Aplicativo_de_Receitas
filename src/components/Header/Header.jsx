import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import '../../App.css';
import SearchBar from './SearchBar';

function Header(props) {
  const [buttonSearch, setButtonSearch] = useState(false);
  const { location: { pathname } } = props;

  const searchButton = () => {
    setButtonSearch(!buttonSearch);
  };
  return (
    <header>
      <div>
        <p data-testid="page-title">
          {pathname === '/profile' ? 'Profile' : 'pathname' }
        </p>
        <a href="/profile">
          <img src={ profileIcon } alt="profileIcon" />
        </a>

        <button type="button" onClick={ searchButton } className="searchBtn">
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="searchIcon"
          />
        </button>

      </div>
      <SearchBar />
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
