import { bigCheck } from "../outils/tagSearchSort.js"

//DOM elements
const cardSection = document.querySelector(".recipes_cards");
const searchbarInput = document.querySelector("#searchbar_input");

//sort function
function eachSort(cards, filter) {
  //Regarde si il y a bien plus de deux caractères dans l'input principal
  if (filter.length > 2) {
    //Regarde chacune des cartes une par une
    cards.forEach((card) => {
      card.style.display = "none"
      //Recupere le titre de la carte
      const cardTitle = card.querySelector(".recipe_card__main_infos__name");
      const cardTitleValue = cardTitle.innerText;

      //Recupere les ingrédients de la carte
      const cardIngredients = card.querySelectorAll(".recipe_card__sub_infos__ingredients__ingredient__name");
      const cardIngredientsArray = [];
      //Regarde chacun des ingrédients pour les stocker dans un arrêt
      cardIngredients.forEach((cardIngredient) => {
        cardIngredientsArray.push(cardIngredient.innerText);
      });
      // Transforme l'arrêt des ingrédients en string
      const cardIngredientsList = cardIngredientsArray.join(",");

      //Recupere la description de la carte
      const cardDescription = card.querySelector(".recipe_card__sub_infos__description");
      const cardDescriptionValue = cardDescription.innerText;

      // Mélange les 3 dans un seul string
      const allCardContent = cardTitleValue + cardIngredientsList + cardDescriptionValue;

      //verifie qu'il y a bien le mot filtre dans ce string
      if (allCardContent.toLowerCase().indexOf(filter) > -1) {
        //si oui, affiche la card
        card.style.display = "block";
      }
    });
  }
}

//main searchbar filter
// A chaqye fois qu'un caractère est rentré dans l'input principal
searchbarInput.addEventListener("keyup" , function () {
  // Récupere toutes les cartes
  const allCards = document.querySelectorAll(".recipe_card")

  //Recupere le contenu de l'input principal
  const filterMainInput = searchbarInput.value.toLowerCase()

  //Recupere le contenu des différents tags
  const ingredientTagList = document.querySelectorAll('#ingredient_tag:not([style*="display: none"])')
  const appareilTagList = document.querySelectorAll('#appareil_tag:not([style*="display: none"])')
  const ustensileTagList = document.querySelectorAll('#ustensile_tag:not([style*="display: none"])')
  const allPresentCards = document.querySelectorAll('.recipe_card:not([style*="display: none"])')

  //effectue une recherche globale
  bigCheck(allCards, filterMainInput, ingredientTagList, appareilTagList, ustensileTagList)
})

export {eachSort}


function forSort(cards, filter) {
  if (filter.length > 2) {

    for (let i = 0; i < cards.length; i++) {
      const cardTitleValue = cards[i].name;
      const cardIngredients = cards[i].ingredients;
      const cardIngredientsArray = [];

      for (let z = 0; z < cardIngredients.length; z++) {
        cardIngredientsArray.push(cardIngredients[z].ingredient);
      }

      const cardIngredientsList = cardIngredientsArray.join(",");

      const cardDescriptionValue = cards[i].description;

      const allCardContent = cardTitleValue + cardIngredientsList + cardDescriptionValue;

      if (allCardContent.toLowerCase().indexOf(filter) > -1) {
        console.log(cardTitleValue);
      }
    }
  }
}
