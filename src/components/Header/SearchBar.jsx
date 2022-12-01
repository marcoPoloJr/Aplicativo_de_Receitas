import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input type="text" data-testid="search-input" />
      <label htmlFor="ingrediente">
        <input
          type="radio"
          name="searchBar"
          id="ingrediente"
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="nome">
        <input
          type="radio"
          name="searchBar"
          id="nome"
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="first">
        <input
          type="radio"
          name="searchBar"
          id="first"
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button type="button" data-testid="exec-search-btn">search</button>
    </div>
  );
}
