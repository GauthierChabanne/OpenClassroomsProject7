import { eachSort } from "../outils/mainSearchSort.js"

//DOM elements

//Main Searchbar
const searchbarInput = document.querySelector("#searchbar_input");

//ingredients
const ingredientsSortButton = document.querySelector("#ingredients_sort_button");
const tagbarIngredientInput = ingredientsSortButton.querySelector("#ingredients_input");
const tagbarIngredientContentPart = ingredientsSortButton.querySelector(".sort_bar__sort_button__content_part");
const tagbarIngredientContentPartList = tagbarIngredientContentPart.querySelector("ul")
const ingredientSearchArrow = document.querySelector("#ingredients_input_arrow");

//Appareils
const appareilsSortButton = document.querySelector("#appareils_sort_button");
const tagbarAppareilInput = appareilsSortButton.querySelector("#appareils_input");
const tagbarAppareilContentPart = appareilsSortButton.querySelector(".sort_bar__sort_button__content_part");
const tagbarAppareilContentPartList = tagbarAppareilContentPart.querySelector("ul")
const appareilSearchArrow = document.querySelector("#appareils_input_arrow");

//Ustensiles
const ustensilesSortButton = document.querySelector("#ustensiles_sort_button");
const tagbarUstensileInput = ustensilesSortButton.querySelector("#ustensiles_input");
const tagbarUstensileContentPart = ustensilesSortButton.querySelector(".sort_bar__sort_button__content_part");
const tagbarUstensileContentPartList = tagbarUstensileContentPart.querySelector("ul")
const ustensileSearchArrow = document.querySelector("#ustensiles_input_arrow");

//tags
const tagsPart = document.querySelector(".tags")

//Fonction de recherche grace aux tags
function checkTags(cards, ingredientFilterList, appareilFilterList, ustensileFilterList) {
  const firstFilterCards = []
  const secondFilterCards = []
  const thirdFilterCards = []

  //fais disparaitre toutes les cartes
  cards.forEach(card => card.style.display = "none");

  //recupère le texte des tags ingrédients
  const ingredientFilterListArray = []
  ingredientFilterList.forEach(filter => ingredientFilterListArray.push(filter.innerText.toLowerCase()))

  //Analyse chacune des cartes présentes
  cards.forEach((card) => {
    //Recupere les ingredients de la carte
    const cardIngredients = card.querySelectorAll(".recipe_card__sub_infos__ingredients__ingredient__name");
    const cardIngredientsArray = [];
    //Regarde chacun des appareils pour les stocker dans un arrêt
    cardIngredients.forEach((cardIngredient) => {
      cardIngredientsArray.push(cardIngredient.innerText.toLowerCase());
    });
    //regarde si les ingrédients contiennent tous ceux  présents dans les tags
    if (ingredientFilterListArray.every(filter => cardIngredientsArray.includes(filter))) {
      //Si oui, fais apparaitre les cartes correspondantes
      card.style.display = "block"
      //Met ces cartes dans un premier arret de recherches
      firstFilterCards.push(card)
    }
  })

  //Continue la recherche à partir des cartes du premier arret de recherche
  firstFilterCards.forEach(card => card.style.display = "none");

  //Recupere le texte des tags appareils
  const appareilFilterListArray = []
  appareilFilterList.forEach(filter => appareilFilterListArray.push(filter.innerText.toLowerCase()))
  //Analyse chacune des cartes présentes
  firstFilterCards.forEach((card) => {
    //Recupere les appareils de la carte
    const cardAppareilsArray = [card.dataset.appareil.toLowerCase()];
    //Verifie que les appareils des tags sont contenues dans chacune des cartes
    if (appareilFilterListArray.every(filter => cardAppareilsArray.includes(filter))) {
      //Si oui, affiche les cartes correspondantes
      card.style.display = "block"
      //Met ces cartes dans un second arrêt de recherche
      secondFilterCards.push(card)
    }
  })

  //Continue la recherche avec le second arret de recherche
  secondFilterCards.forEach(card => card.style.display = "none");
  const ustensileFilterListArray = []
  //Recupere les ustensiles des tags
  ustensileFilterList.forEach(filter => ustensileFilterListArray.push(filter.innerText.toLowerCase()))
  //Analyse chacune des cartes présentes
  secondFilterCards.forEach((card) => {
    //Recupere les ustensiles de la carte
    const cardUstensiles = card.dataset.ustensils;
    const cardUstensilesArray = cardUstensiles.split(",")
    const newCardUstensilesArray = []
    //Regarde chacun des ustensiles pour les stocker dans un arrêt
    cardUstensilesArray.forEach((cardUstensile) => {
      newCardUstensilesArray.push(cardUstensile.toLowerCase());
    });
    //Verifie si les ustensiles des tags sont contenus dans les cartes
    if (ustensileFilterListArray.every(filter => newCardUstensilesArray.includes(filter))) {
      //Si oui, affiche les cartes
      card.style.display = "block"
      //sotcke ces cartes dans un troisième arret de recherche
      thirdFilterCards.push(card)
    }
  })
  //retourne le 3e arrêt de recherche
  return thirdFilterCards
}

//fonction de recherche globale
function bigCheck(cards, filterMainInput, ingredientFilterList, appareilFilterList, ustensileFilterList) {

  //Si il n'y a rien dans les filtre ni dans la barre de recherche, affiche toutes les cartes
  if (filterMainInput.length <= 2 && ingredientFilterList.length === 0 && appareilFilterList.length === 0 && ustensileFilterList.length === 0) {
    cards.forEach(card => card.style.display = "block")
  } else {
    //Si il n'y a rien dans les filtres, filtre à partir de la barre de recherche sur l'entièrete des cartes
    if (ingredientFilterList.length === 0 && appareilFilterList.length === 0 && ustensileFilterList.length === 0) {
      eachSort(cards, filterMainInput);
    } else {
      //Si il y a des tags, filtre en fonction des tags
      checkTags(cards, ingredientFilterList, appareilFilterList, ustensileFilterList)
      const thirdFilterCards = checkTags(cards, ingredientFilterList, appareilFilterList, ustensileFilterList)
      //Quand on rentre une valeur dans la barre de recherche, filtre en fonction de ce qui est écrit à partir de ce qui est déjà filtré par les tags
      eachSort(thirdFilterCards, filterMainInput);
    }
  }
}

//tagbars search

//Ingredients tagbar

//Quand on clique sur la tagbar
tagbarIngredientInput.addEventListener("click", function () {
  //vide la liste (pour éciter les répétitions)
  tagbarIngredientContentPartList.innerHTML = ""
  //change le placeholder
  tagbarIngredientInput.placeholder = "Rechercher un ingrédient";
  //change la width
  tagbarIngredientInput.style.width = "13rem"
  //cherche toutes les cartes qui ne sont pas cachés.
  const allPresentCards = document.querySelectorAll('.recipe_card:not([style*="display: none"])');
  const ingredientsList = []
  allPresentCards.forEach((card) => {
    //Recupere les ingrédients de la carte
    const cardIngredients = card.querySelectorAll(".recipe_card__sub_infos__ingredients__ingredient__name");
    //Regarde chacun des ingrédients pour les stocker dans un arrêt
    cardIngredients.forEach((cardIngredient) => {
      ingredientsList.push(cardIngredient.innerText.toLowerCase());
    });
  })
  //supprime les doublons de l'array
  let uniqueIngredientList = [...new Set(ingredientsList)]

  // supprime l'élement de la liste si il est deja dans un des tags
  const ingredientTagList = document.querySelectorAll('#ingredient_tag:not([style*="display: none"])')

  ingredientTagList.forEach((ingredient) => {
    uniqueIngredientList = uniqueIngredientList.filter(world => world !== ingredient.innerText.toLowerCase())
  })

  //met chacun des ingredients dans la liste sous l'input, sous forme de li
  uniqueIngredientList.forEach((ingredient) => {
    const ingredientLi = document.createElement("li");
    ingredientLi.textContent = ingredient;
    tagbarIngredientContentPartList.appendChild(ingredientLi);
    //fait apparaitre la liste
    tagbarIngredientContentPartList.style.display = "grid"
  })

  //change la fleche
  const arrow = ingredientSearchArrow.querySelector("i");
  arrow.setAttribute("class", "fa-solid fa-angle-up");

  //quand on clique sur la fleche, rénitialise l'input
  ingredientSearchArrow.addEventListener("click", function(e) {
    e.preventDefault()
    tagbarIngredientContentPartList.innerHTML = "";
    tagbarIngredientContentPartList.style.display = "none";
    tagbarIngredientInput.placeholder = "Ingrédients";
    tagbarIngredientInput.value = "";
    tagbarIngredientInput.style.width = "7rem"
    arrow.setAttribute("class", "fa-solid fa-angle-down");
  })

  //Rend chacune partie de la liste de l'input clickable, créant ainsi des tags et lançant la recherche
  //recupere toute la liste
  const allIngredientsLi = tagbarIngredientContentPartList.querySelectorAll("li");

  allIngredientsLi.forEach((ingredientLi) => {
    // Si l'on clique sur l'un d'eux
    ingredientLi.addEventListener("click", function () {
      ingredientLi.style.display = "none";
      //recupere toutes les cartes apparentes
      const allPresentCards = document.querySelectorAll(".recipe_card:not([style*='display: none'])");
      //recupere le nom de l'ingrédient
      const filter = ingredientLi.innerText.toLowerCase();

      //Crée le tag avec le nom de l'input
      const ingredientTag = document.createElement("div");
      ingredientTag.setAttribute("class", "tags__tag");
      ingredientTag.setAttribute("id", "ingredient_tag");
      const ingredientTagName = document.createElement("p");
      ingredientTagName.textContent = filter
      const ingredientTagCross = document.createElement("i");
      ingredientTagCross.setAttribute("class", "fa-regular fa-circle-xmark tags__tag__cross");
      ingredientTag.appendChild(ingredientTagName)
      ingredientTag.appendChild(ingredientTagCross)
      tagsPart.appendChild(ingredientTag);

      //fais disparaitre toutes les cartes présentes
      allPresentCards.forEach((card) => {
        card.style.display = "none";
      })

      //Analyse chacune des cartes présentes
      allPresentCards.forEach((card) => {
        //Recupere les appareils de la carte
        const cardIngredients = card.querySelectorAll(".recipe_card__sub_infos__ingredients__ingredient__name");
        const cardIngredientsArray = [];
        //Regarde chacun des appareils pour les stocker dans un arrêt
        cardIngredients.forEach((cardIngredient) => {
          cardIngredientsArray.push(cardIngredient.innerText);
        });
        // Transforme l'arrêt des appareils en string
        const cardIngredientsList = cardIngredientsArray.join(",");
        // regarde si le nom du tag match avec l'un des ingrédients
        if (cardIngredientsList.toLowerCase().indexOf(filter) > -1) {
          //si oui, fais apparaitre la carte
          card.style.display = "block";
        }
      })
      //Vide la liste et supprime la value de l'input
      tagbarIngredientContentPartList.innerHTML = ""
      tagbarIngredientContentPartList.style.display = "none"
      tagbarIngredientInput.placeholder = "Ingrédients";
      tagbarIngredientInput.value = "";
      tagbarIngredientInput.style.width = "7rem"
      arrow.setAttribute("class", "fa-solid fa-angle-down");

      //Fais disparaitre le tag en clickant sur la croix et retri

      //Si on clique sur la croix
      ingredientTagCross.addEventListener("click", function () {
        ingredientLi.style.display = "block"
        // fais disparaitre le tag
        ingredientTag.style.display = "none";
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
    })
  })

  //filtre les ingrédients présents selon l'input dans la barre de recherche
  //quand on rentre une lettre dans la barre
  tagbarIngredientInput.addEventListener("keyup", function () {
    //récupere toute la liste
    const allPresentIngredientsLi = tagbarIngredientContentPartList.querySelectorAll("li");
    //recupere ce que l'on a rentré dans la barre de recherche
    const filter = tagbarIngredientInput.value.toLowerCase();
    //fais disparaitre toutes les cartes présentes
    allPresentIngredientsLi.forEach((ingredientLi) => {
      ingredientLi.style.display = "none";
    })
    //vérifie que ce qui est rentré correspond bien à l'ingrédient de chacune des cartes
    allPresentIngredientsLi.forEach((ingredientLi) => {
      const ingredient = ingredientLi.innerText

      if (ingredient.toLowerCase().indexOf(filter) > -1) {
        ingredientLi.style.display = "block";
      }
    })
  })
})

//Appareils tagbar

//Quand on clique sur la tagbar
tagbarAppareilInput.addEventListener("click", function () {
  //vide la liste (pour éciter les répétitions)
  tagbarAppareilContentPartList.innerHTML = ""
  //change le placeholder
  tagbarAppareilInput.placeholder = "Rechercher un appareil";
  //change la width
  tagbarAppareilInput.style.width = "13rem"
  //cherche toutes les cartes qui ne sont pas cachés.
  const allPresentCards = document.querySelectorAll('.recipe_card:not([style*="display: none"])');
  const appareilsList = []
  allPresentCards.forEach((card) => {
    //Recupere les appareils de la carte
    appareilsList.push(card.dataset.appareil.toLowerCase())
  })
  //supprime les doublons de l'array
  let uniqueAppareilList = [...new Set(appareilsList)]

  //Supprime l'élement de la liste si il est dans un des tags
  const appareilTagList = document.querySelectorAll('#appareil_tag:not([style*="display: none"])')

  appareilTagList.forEach((appareil) => {
    uniqueAppareilList = uniqueAppareilList.filter(world => world !== appareil.innerText.toLowerCase())
  })

  //met chacun des appareils dans la liste sous l'input, sous forme de li
  uniqueAppareilList.forEach((appareil) => {
    const appareilLi = document.createElement("li");
    appareilLi.textContent = appareil;
    tagbarAppareilContentPartList.appendChild(appareilLi);
    //fait apparaitre la liste
    tagbarAppareilContentPartList.style.display = "grid"
  })

  //change la fleche
  const arrow = appareilSearchArrow.querySelector("i");
  arrow.setAttribute("class", "fa-solid fa-angle-up");

  //quand on clique sur la fleche, rénitialise l'input
  appareilSearchArrow.addEventListener("click", function (e) {
    e.preventDefault()
    tagbarAppareilContentPartList.innerHTML = "";
    tagbarAppareilContentPartList.style.display = "none";
    tagbarAppareilInput.value = "";
    arrow.setAttribute("class", "fa-solid fa-angle-down");
    tagbarAppareilInput.placeholder = "Appareils";
    //change la width
    tagbarAppareilInput.style.width = "7rem"
  })

  //Rend chacune partie de la liste de l'input clickable, créant ainsi des tags et lançant la recherche

  //recupere toute la liste
  const allAppareilsLi = tagbarAppareilContentPartList.querySelectorAll("li");

  allAppareilsLi.forEach((appareilLi) => {
    // Si l'on clique sur l'un d'eux
    appareilLi.addEventListener("click", function () {
      //recupere toutes les cartes apparentes
      const allPresentCards = document.querySelectorAll(".recipe_card:not([style*='display: none'])");
      //recupere le nom de l'appareil
      const filter = appareilLi.innerText.toLowerCase();

      //Crée le tag avec le nom de l'input
      const appareilTag = document.createElement("div");
      appareilTag.setAttribute("class", "tags__tag");
      appareilTag.setAttribute("id", "appareil_tag");
      const appareilTagName = document.createElement("p");
      appareilTagName.textContent = filter
      const appareilTagCross = document.createElement("i");
      appareilTagCross.setAttribute("class", "fa-regular fa-circle-xmark tags__tag__cross");
      appareilTag.appendChild(appareilTagName)
      appareilTag.appendChild(appareilTagCross)
      tagsPart.appendChild(appareilTag);

      //fais disparaitre toutes les cartes présentes
      allPresentCards.forEach((card) => {
        card.style.display = "none";
      })

      //Analyse chacune des cartes présentes
      allPresentCards.forEach((card) => {
        //Recupere les appareils de la carte
        const cardAppareil = card.dataset.appareil;
        // regarde si le nom du tag match avec l'un des appareils
        if (cardAppareil.toLowerCase().indexOf(filter) > -1) {
          //si oui, fais apparaitre la carte
          card.style.display = "block";
        }
      })
      //Vide la liste et supprime la value de l'input
      tagbarAppareilContentPartList.innerHTML = ""
      tagbarAppareilContentPartList.style.display = "none"
      tagbarAppareilInput.value = ""
      arrow.setAttribute("class", "fa-solid fa-angle-down");
      tagbarAppareilInput.placeholder = "Appareils";
      //change la width
      tagbarAppareilInput.style.width = "7rem"

      //Fais disparaitre le tag en clickant sur la croix et retri

      //Si on clique sur la croix
      appareilTagCross.addEventListener("click", function () {
        // fais disparaitre le tag
        appareilTag.style.display = "none";
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
    })
  })

  //filtre les appareils présents selon l'input dans la barre de recherche
  //quand on rentre une lettre dans la barre
  tagbarAppareilInput.addEventListener("keyup", function () {
    //récupere toute la liste
    const allPresentAppareilsLi = tagbarAppareilContentPartList.querySelectorAll("li");
    //recupere ce que l'on a rentré dans la barre de recherche
    const filter = tagbarAppareilInput.value.toLowerCase();
    //fais disparaitre toutes les cartes présentes
    allPresentAppareilsLi.forEach((appareilLi) => {
      appareilLi.style.display = "none";
    })
    //vérifie que ce qui est rentré correspond bien à l'ingrédient de chacune des cartes
    allPresentAppareilsLi.forEach((appareilLi) => {
      const appareil = appareilLi.innerText

      if (appareil.toLowerCase().indexOf(filter) > -1) {
        appareilLi.style.display = "block";
      }
    })
  })
})

//Ustensiles tagbar

//Quand on clique sur la tagbar
tagbarUstensileInput.addEventListener("click", function () {
  //vide la liste (pour éciter les répétitions)
  tagbarUstensileContentPartList.innerHTML = ""
  //change le placeholder
  tagbarUstensileInput.placeholder = "Rechercher un ustensile";
  //change la width
  tagbarUstensileInput.style.width = "13rem"
  //cherche toutes les cartes qui ne sont pas cachés.
  const allPresentCards = document.querySelectorAll('.recipe_card:not([style*="display: none"])');
  const ustensilesList = []
  allPresentCards.forEach((card) => {
    //Recupere les ustensiles de la carte
    const cardUstensiles = card.dataset.ustensils.split(",")
    cardUstensiles.forEach((ustensile) => {
      ustensilesList.push(ustensile.toLowerCase())
    })
  })
  //supprime les doublons de l'array
  let uniqueUstensilesList = [...new Set(ustensilesList)]

  // supprime l'élement de la liste si il est deja dans un des tags
  const ustensileTagList = document.querySelectorAll('#ustensile_tag:not([style*="display: none"])')

  ustensileTagList.forEach((ustensile) => {
    uniqueUstensilesList = uniqueUstensilesList.filter(world => world !== ustensile.innerText.toLowerCase())
  })


  //met chacun des unstensiles dans la liste sous l'input, sous forme de li
  uniqueUstensilesList.forEach((ustensile) => {
    const ustensileLi = document.createElement("li");
    ustensileLi.textContent = ustensile;
    tagbarUstensileContentPartList.appendChild(ustensileLi);
    //fait apparaitre la liste
    tagbarUstensileContentPartList.style.display = "grid"
  })

  //change la fleche
  const arrow = ustensileSearchArrow.querySelector("i");
  arrow.setAttribute("class", "fa-solid fa-angle-up");

  //quand on clique sur la fleche, rénitialise l'input
  ustensileSearchArrow.addEventListener("click", function (e) {
    e.preventDefault()
    tagbarUstensileContentPartList.innerHTML = "";
    tagbarUstensileContentPartList.style.display = "none";
    tagbarUstensileInput.value = "";
    arrow.setAttribute("class", "fa-solid fa-angle-down");
    tagbarUstensileInput.placeholder = "Ustensiles";
    //change la width
    tagbarUstensileInput.style.width = "7rem"
  })

  //Rend chacune partie de la liste de l'input clickable, créant ainsi des tags et lançant la recherche

  //recupere toute la liste
  const allUstensilesLi = tagbarUstensileContentPartList.querySelectorAll("li");

  allUstensilesLi.forEach((ustensileLi) => {
    // Si l'on clique sur l'un d'eux
    ustensileLi.addEventListener("click", function () {
      //recupere toutes les cartes apparentes
      const allPresentCards = document.querySelectorAll(".recipe_card:not([style*='display: none'])");
      //recupere le nom de l'ustensile
      const filter = ustensileLi.innerText.toLowerCase();

      //Crée le tag avec le nom de l'input
      const ustensileTag = document.createElement("div");
      ustensileTag.setAttribute("class", "tags__tag");
      ustensileTag.setAttribute("id", "ustensile_tag");
      const ustensileTagName = document.createElement("p");
      ustensileTagName.textContent = filter
      const ustensileTagCross = document.createElement("i");
      ustensileTagCross.setAttribute("class", "fa-regular fa-circle-xmark tags__tag__cross");
      ustensileTag.appendChild(ustensileTagName)
      ustensileTag.appendChild(ustensileTagCross)
      tagsPart.appendChild(ustensileTag);

      //fais disparaitre toutes les cartes présentes
      allPresentCards.forEach((card) => {
        card.style.display = "none";
      })

      //Analyse chacune des cartes présentes
      allPresentCards.forEach((card) => {
        //Recupere les appareils de la carte
        const cardUstensiles = card.dataset.ustensils;
        // regarde si le nom du tag match avec l'un des ustensiles
        if (cardUstensiles.toLowerCase().indexOf(filter) > -1) {
          //si oui, fais apparaitre la carte
          card.style.display = "block";
        }
      })
      //Vide la liste et supprime la value de l'input
      tagbarUstensileContentPartList.innerHTML = ""
      tagbarUstensileContentPartList.style.display = "none"
      tagbarUstensileInput.value = ""
      arrow.setAttribute("class", "fa-solid fa-angle-down");
      tagbarUstensileInput.placeholder = "Ustensiles";
      //change la width
      tagbarUstensileInput.style.width = "7rem"

      //Fais disparaitre le tag en clickant sur la croix et retri

      //Si on clique sur la croix
      ustensileTagCross.addEventListener("click", function () {
        // fais disparaitre le tag
        ustensileTag.style.display = "none";
        // Récupere toutes les cartes
        const allCards = document.querySelectorAll(".recipe_card")

        //Recupere le contenu de l'input principal
        const filterMainInput = searchbarInput.value.toLowerCase()

        //Recupere le contenu des différents tags
        const ingredientTagList = document.querySelectorAll('#ingredient_tag:not([style*="display: none"])')
        const appareilTagList = document.querySelectorAll('#appareil_tag:not([style*="display: none"])')
        const ustensileTagList = document.querySelectorAll('#ustensile_tag:not([style*="display: none"])')
        const allPresentCards = document.querySelectorAll('.recipe_card:not([style*="display: none"])')

        //Utilise les fonctions importés pour trier les cards selon les différents filtres
        bigCheck(allCards, filterMainInput, ingredientTagList, appareilTagList, ustensileTagList)
      })
    })
  })

  //filtre les ustensiles présents selon l'input dans la barre de recherche
  //quand on rentre une lettre dans la barre
  tagbarUstensileInput.addEventListener("keyup", function () {
    //récupere toute la liste
    const allPresentUstensilesLi = tagbarUstensileContentPartList.querySelectorAll("li");
    //recupere ce que l'on a rentré dans la barre de recherche
    const filter = tagbarUstensileInput.value.toLowerCase();
    //fais disparaitre toutes les cartes présentes
    allPresentUstensilesLi.forEach((ustensileLi) => {
      ustensileLi.style.display = "none";
    })
    //vérifie que ce qui est rentré correspond bien à l'ingrédient de chacune des cartes
    allPresentUstensilesLi.forEach((ustensileLi) => {
      const ustensile = ustensileLi.innerText

      if (ustensile.toLowerCase().indexOf(filter) > -1) {
        ustensileLi.style.display = "block";
      }
    })
  })
})

export { bigCheck }
