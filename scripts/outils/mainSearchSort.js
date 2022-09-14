//DOM elements
const cardSection = document.querySelector(".recipes_cards");
const searchbarInput = document.querySelector("#searchbar_input");

//sort function
function eachSort(cards, filter) {
  cards.forEach((card) => {
    card.style.display = "none";
  })
  //Regarde chacune des cartes une par une
  cards.forEach((card) => {
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

//main searchbar filter
searchbarInput.addEventListener("keyup", function () {
  // Récupere toutes les cartes
  const allPresentCards = document.querySelectorAll(".recipe_card");
  //Recupere la valeur contenu dans l'input recherche
  let filter = searchbarInput.value.toLowerCase()

  //Check si la recherche a bien + de 2 caractères
  if (filter.length > 2) {
      //Si oui
      // utilise la fonction Eachsort sur les cards
    eachSort(allPresentCards, filter)
  } else {
    // Si non, réaffiche toutes les cards
    allPresentCards.forEach((card) => {
      card.style.display = "block";
    })
  }
})
