import React from 'react';

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <p data-testid="profile-email">email@email.com</p>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => console.log('Done Recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => console.log('Favorite Recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => console.log('Logout') }
      >
        Logout
      </button>
    </div>

  );
}

export default Profile;
