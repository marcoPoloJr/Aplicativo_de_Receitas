import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RecipeDetails.css';
import Meals from '../meals/Meals';
import Drinks from '../drinks/Drinks';

function RecipeDetails(props) {
  const location = useLocation().pathname;
  const { match: { params: { id } } } = props;

  if (location.includes('meals')) {
    return <Meals id={ id } />;
  }
  if (location.includes('drinks')) {
    return <Drinks id={ id } />;
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
