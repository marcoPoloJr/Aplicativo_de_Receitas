import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Profile() {
  const history = useHistory();
  const email = localStorage.getItem('user');
  const test = JSON.parse(email);
  const doneRecipes = () => history.push('/done-recipes');
  const favoriteRecipes = () => history.push('/favorite-recipes');
  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <h1>Profile</h1>
      <p data-testid="profile-email">{test.email}</p>
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => doneRecipes() }
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => favoriteRecipes() }
        >
          Favorite Recipes
        </button>
      </Link>

      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => logout() }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>

  );
}

export default Profile;
