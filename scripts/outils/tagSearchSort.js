//DOM elements

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

//tagbars search

//Ingredients tagbar

//Quand on clique sur la tagbar
tagbarIngredientInput.addEventListener("click", function () {
  //vide la liste (pour éciter les répétitions)
  tagbarIngredientContentPartList.innerHTML = ""
  //change le placeholder
  tagbarIngredientInput.placeholder = "Rechercher un ingrédient";
  //change la width
  tagbarIngredientInput.style.width = "auto"
  //cherche toutes les cartes qui ne sont pas cachés.
  const allPresentCards = document.querySelectorAll('.recipe_card:not([style*="display: none"])');
  const ingredientsList = []
  allPresentCards.forEach((card) => {
    //Recupere les appareils de la carte
    const cardIngredients = card.querySelectorAll(".recipe_card__sub_infos__ingredients__ingredient__name");
    //Regarde chacun des appareils pour les stocker dans un arrêt
    cardIngredients.forEach((cardIngredient) => {
      ingredientsList.push(cardIngredient.innerText);
    });
  })
  //supprime les doublons de l'array
  let uniqueIngredientList = [...new Set(ingredientsList)]

  //met chacun des appareils dans la liste sous l'input, sous forme de li
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
  ingredientSearchArrow.addEventListener("click", function (e) {
    e.preventDefault()
    tagbarIngredientContentPartList.innerHTML = "";
    tagbarIngredientContentPartList.style.display = "none";
    tagbarIngredientInput.value = "";
    arrow.setAttribute("class", "fa-solid fa-angle-down");
  })

  //Rend chacune partie de la liste de l'input clickable, créant ainsi des tags et lançant la recherche

  //recupere toute la liste
  const allIngredientsLi = tagbarIngredientContentPartList.querySelectorAll("li");

  allIngredientsLi.forEach((ingredientLi) => {
    // Si l'on clique sur l'un d'eux
    ingredientLi.addEventListener("click", function () {
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
      tagbarIngredientInput.value = ""
      arrow.setAttribute("class", "fa-solid fa-angle-down");

      //Fais disparaitre le tag en clickant sur la croix et retri

      //Si on clique sur la croix
      ingredientTagCross.addEventListener("click", function () {
        // fais disparaitre le tag
        ingredientTag.style.display = "none";
        //fais réapparaitre toutes les cartes qui avait disparu à cause de ce tag
        allPresentCards.forEach((card) => {
          card.style.display = "block";
        })
      })
    })
  })

  //filtre les appareils présents selon l'input dans la barre de recherche
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
  tagbarAppareilInput.style.width = "auto"
  //cherche toutes les cartes qui ne sont pas cachés.
  const allPresentCards = document.querySelectorAll('.recipe_card:not([style*="display: none"])');
  const appareilsList = []
  allPresentCards.forEach((card) => {
    //Recupere les appareils de la carte
    appareilsList.push(card.dataset.appareil)
  })
  //supprime les doublons de l'array
  let uniqueAppareilList = [...new Set(appareilsList)]

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
  })

  //Rend chacune partie de la liste de l'input clickable, créant ainsi des tags et lançant la recherche

  //recupere toute la liste
  const allAppareilsLi = tagbarAppareilContentPartList.querySelectorAll("li");

  allAppareilsLi.forEach((appareilLi) => {
    // Si l'on clique sur l'un d'eux
    appareilLi.addEventListener("click", function () {
      //recupere toutes les cartes apparentes
      const allPresentCards = document.querySelectorAll(".recipe_card:not([style*='display: none'])");
      //recupere le nom de l'ingrédient
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
        // regarde si le nom du tag match avec l'un des ingrédients
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

      //Fais disparaitre le tag en clickant sur la croix et retri

      //Si on clique sur la croix
      appareilTagCross.addEventListener("click", function () {
        // fais disparaitre le tag
        appareilTag.style.display = "none";
        //fais réapparaitre toutes les cartes qui avait disparu à cause de ce tag
        allPresentCards.forEach((card) => {
          card.style.display = "block";
        })
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
  tagbarUstensileInput.style.width = "auto"
  //cherche toutes les cartes qui ne sont pas cachés.
  const allPresentCards = document.querySelectorAll('.recipe_card:not([style*="display: none"])');
  const ustensilesList = []
  allPresentCards.forEach((card) => {
    //Recupere les ustensiles de la carte
    const cardUstensiles = card.dataset.ustensils.split(",")
    console.log(cardUstensiles)
    cardUstensiles.forEach((ustensile) => {
      ustensilesList.push(ustensile)
    })
  })
  //supprime les doublons de l'array
  let uniqueUstensilesList = [...new Set(ustensilesList)]

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
  })

  //Rend chacune partie de la liste de l'input clickable, créant ainsi des tags et lançant la recherche

  //recupere toute la liste
  const allUstensilesLi = tagbarUstensileContentPartList.querySelectorAll("li");

  allUstensilesLi.forEach((ustensileLi) => {
    // Si l'on clique sur l'un d'eux
    ustensileLi.addEventListener("click", function () {
      //recupere toutes les cartes apparentes
      const allPresentCards = document.querySelectorAll(".recipe_card:not([style*='display: none'])");
      //recupere le nom de l'ingrédient
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
        // regarde si le nom du tag match avec l'un des ingrédients
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

      //Fais disparaitre le tag en clickant sur la croix et retri

      //Si on clique sur la croix
      ustensileTagCross.addEventListener("click", function () {
        // fais disparaitre le tag
        ustensileTag.style.display = "none";
        //fais réapparaitre toutes les cartes qui avait disparu à cause de ce tag
        allPresentCards.forEach((card) => {
          card.style.display = "block";
        })
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
