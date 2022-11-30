export async function fetchMeal() {
  const DOZE = 12;
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const json = await response.json();
  const allMeals = json.meals;
  const twelveMeals = allMeals.slice(0, DOZE);
  return twelveMeals;
}

export async function fetchDrink() {
  const DOZE = 12;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const json = await response.json();
  const allDrinks = json.drinks;
  const twelveDrinks = allDrinks.slice(0, DOZE);
  return twelveDrinks;
}
