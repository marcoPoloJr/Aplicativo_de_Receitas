import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Recipe from './components/recipe/Recipe';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact patch="/" component={ () => {} } /> */}
        <Route exact patch="/meals" component={ Recipe } />
        <Route exact patch="/drinks" component={ Recipe } />
        <Route exact patch="/meals/:id-da-receita" component={ () => {} } />
        <Route exact patch="/drinks/:id-da-receita" component={ () => {} } />
        <Route patch="/meals/:id-da-receita/in-progress" component={ () => {} } />
        <Route patch="/drinks/:id-da-receita/in-progress" component={ () => {} } />
        <Route patch="/profile" component={ () => {} } />
        <Route patch="/done-recipes" component={ () => {} } />
        <Route patch="/favorite-recipes" component={ () => {} } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
