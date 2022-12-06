import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  localStorage.setItem('user', 'teste@test.com');
  const email = localStorage.getItem('user');

  return (
    <div>
      <h1>Profile</h1>
      <p data-testid="profile-email">{email}</p>
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => console.log('Done Recipes') }
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => console.log('Favorite Recipes') }
        >
          Favorite Recipes
        </button>
      </Link>

      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => console.log('Logout') }
        >
          Logout
        </button>
      </Link>

    </div>

  );
}

export default Profile;
