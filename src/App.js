import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Recipes from './components/recipe/Recipes';
import RecipeInProgress from './components/RecipeInProgress/RecipeInProgress';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact patch="/" component={ () => {} } /> */}
        
        <Route
          exact
          patch="/meals/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route exact patch="/meals" component={ Recipes } />
        <Route exact patch="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route
          patch="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route patch="/profile" component={ Profile } />
        <Route patch="/done-recipes" component={ () => {} } />
        <Route patch="/favorite-recipes" component={ () => {} } />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
