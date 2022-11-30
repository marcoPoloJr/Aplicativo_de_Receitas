import React from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';

function Header(props) {
  const { location: { pathname } } = props;
  return (
    <header>
      <div>
        <p data-testid="page-title">
          {pathname === '/profile' ? 'Profile' : pathname }
        </p>
        <a href="/profile">
          <img src={ profileIcon } alt="profileIcon" />
        </a>
        <img src={ searchIcon } data-testid="search-top-btn" alt="searchIcon" />
      </div>
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
