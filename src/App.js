import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Recipes from './components/recipe/Recipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact patch="/" component={ () => {} } /> */}
        <Route exact patch="/meals" component={ Recipes } />
        <Route exact patch="/drinks" component={ Recipes } />
        <Route patch="/meals/:id-da-receita/in-progress" component={ () => {} } />
        <Route patch="/drinks/:id-da-receita/in-progress" component={ () => {} } />
        <Route patch="/profile" component={ Profile } />
        <Route patch="/done-recipes" component={ () => {} } />
        <Route patch="/favorite-recipes" component={ () => {} } />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
