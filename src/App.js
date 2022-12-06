import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Recipes from './components/recipe/Recipes';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={ () => {} } /> */}
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/meals/:id-da-receita/in-progress" component={ () => {} } />
        <Route path="/drinks/:id-da-receita/in-progress" component={ () => {} } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ () => {} } />
        <Route path="/favorite-recipes" component={ () => {} } />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
