import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route patch="/" component={ Header } />
        <Route patch="/meals" component={ () => {} } />
        <Route patch="/drinks" component={ () => {} } />
        <Route patch="/meals/:id-da-receita" component={ () => {} } />
        <Route patch="/drinks/:id-da-receita" component={ () => {} } />
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
