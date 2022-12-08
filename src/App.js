import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Recipes from './components/recipe/Recipes';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/meals/:id/in-progress" component={ () => {} } />
        <Route path="/drinks/:id/in-progress" component={ () => {} } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ Header } />
        <Route path="/favorite-recipes" component={ Header } />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
