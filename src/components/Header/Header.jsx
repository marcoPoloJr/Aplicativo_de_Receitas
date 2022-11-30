import React from 'react';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';

function Header() {
  return (
    <div>
      <p data-testid="page-title">a</p>
      <img src={ profileIcon } alt="profileIcon" />
      <img src={ searchIcon } data-testid="search-top-btn" alt="svgSearch" />
    </div>
  );
}
export default Header;
