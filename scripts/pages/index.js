import { recipes } from "../../database/recipes.js";

function displayData(recipes) {
  const recipesCardsSection = document.querySelector(".recipes_cards");
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesCardsSection.appendChild(recipeCardDOM);
  });
};

function init() {
  displayData(recipes);
}

init();
