import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Recipe from './components/recipe/Recipe';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route  patch="/" component={ () => {} } /> */}
        <Route exact patch="/meals" component={ () => {} } />
        <Route exact patch="/drinks" component={ () => {} } />
        <Route exact patch="/meals/:id-da-receita" component={ () => {} } />
        <Route exact patch="/drinks/:id-da-receita" component={ () => {} } />
        <Route exact patch="/meals/:id-da-receita/in-progress" component={ () => {} } />
        <Route exact patch="/drinks/:id-da-receita/in-progress" component={ () => {} } />
        <Route patch="/done-recipes" component={ () => {} } />
        <Route patch="/profile" component={ Profile } />
        <Route patch="/favorite-recipes" component={ () => {} } />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
