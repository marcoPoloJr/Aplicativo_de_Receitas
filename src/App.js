import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Recipes from './components/recipe/Recipes';
import RecipeInProgressMeals from './components/RecipeInProgress/RecipeInProgressMeals ';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import RecipeInProgressDrinks from './components/RecipeInProgress/RecipeInProgressDrinks';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact patch="/" component={ () => {} } /> */}

        <Route
          patch="/drinks/:id/in-progress"
          component={ RecipeInProgressDrinks }
        />
        <Route
          patch="/meals/:id/in-progress"
          component={ RecipeInProgressMeals }
        />
        <Route exact patch="/meals" component={ Recipes } />
        <Route exact patch="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route patch="/profile" component={ Profile } />
        <Route patch="/done-recipes" component={ () => {} } />
        <Route patch="/favorite-recipes" component={ () => {} } />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
