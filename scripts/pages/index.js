import { recipes } from "../../database/recipes.js";

//DOM elements
const cardSection = document.querySelector(".recipes_cards");
const searchbarInput = document.querySelector("#searchbar_input")


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
