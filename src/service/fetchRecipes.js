export async function fetchMeal(comida) {
  if (comida) {
    const DOZE = 12;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${comida}`);
    const json = await response.json();
    const allMeals = json.meals;
    const twelveMeals = allMeals.slice(0, DOZE);
    return twelveMeals;
  }
  const DOZE = 12;
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const json = await response.json();
  const allMeals = json.meals;
  const twelveMeals = allMeals.slice(0, DOZE);
  return twelveMeals;
}

export async function fetchDrink(bebida) {
  if (bebida) {
    const DOZE = 12;
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${bebida}`);
    const json = await response.json();
    const allDrinks = json.drinks;
    const twelveDrinks = allDrinks.slice(0, DOZE);
    return twelveDrinks;
  }
  const DOZE = 12;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const json = await response.json();
  const allDrinks = json.drinks;
  const twelveDrinks = allDrinks.slice(0, DOZE);
  return twelveDrinks;
}

export async function fetchBtnsMeal() {
  const CINCO = 5;
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const json = await response.json();
  const allBtnsMeal = json.meals;
  const fiveBtnsMeals = allBtnsMeal.slice(0, CINCO);
  return fiveBtnsMeals;
}

export async function fetchBtnsDrinks() {
  const CINCO = 5;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const json = await response.json();
  const allBtnsDrinks = json.drinks;
  const fiveBtnsDrinks = allBtnsDrinks.slice(0, CINCO);
  return fiveBtnsDrinks;
}

export async function fetchMealsId(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const json = await response.json();
  return json.meals[0];
}

export async function fetchDrinksId(id) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const json = await response.json();
  return json.drinks[0];
}
