import React from 'react';
import { useHistory } from 'react-router-dom';
// import '/src/App.css';
import '../../App.css';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  function handleClick({ target }) {
    const route = target.id;
    history.push(`/${route}`);
  }

  return (
    <footer data-testid="footer" className="footer">
      <input
        id="drinks"
        type="image"
        alt="drinkIcon"
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        onClick={ handleClick }
      />
      <input
        id="meals"
        type="image"
        alt="mealIcon"
        src={ mealIcon }
        data-testid="meals-bottom-btn"
        onClick={ handleClick }
      />
    </footer>
  );
}

export default Footer;
