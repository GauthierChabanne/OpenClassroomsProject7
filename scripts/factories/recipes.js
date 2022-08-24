function recipeFactory(data) {
  const {id, name, servings, ingredients, time, description, appliance, ustensils} = data

  function getRecipeCardDOM() {
    const recipeCard = document.createElement('article');
    recipeCard.setAttribute('class', 'recipe_card');

    const recipeCardImage = document.createElement('div');
    recipeCardImage.setAttribute('class', 'recipe_card__image');
    recipeCard.appendChild(recipeCardImage);

    const recipeCardMainInfos =  document.createElement('div');
    recipeCardMainInfos.setAttribute('class', 'recipe_card__main_infos');

    const recipeCardName = document.createElement('p');
    recipeCardName.setAttribute('class', 'recipe_card__main_infos__name');
    recipeCardName.textContent = name;
    recipeCardMainInfos.appendChild(recipeCardName);

    const recipeCardTime = document.createElement('p');
    recipeCardTime.setAttribute('class', 'recipe_card__main_infos__time');
    const recipeCardTimeClock = document.createElement('i');
    recipeCardTimeClock.setAttribute('class', 'fa-regular fa-clock')
    recipeCardTime.appendChild(recipeCardTimeClock);
    const recipeCardTimeNumber = document.createElement('span');
    recipeCardTimeNumber.setAttribute('class', 'recipe_card__main_infos__time__number')
    recipeCardTimeNumber.textContent = time + " min";
    recipeCardTime.appendChild(recipeCardTimeNumber);
    recipeCardMainInfos.appendChild(recipeCardTime);

    recipeCard.appendChild(recipeCardMainInfos);

    const recipeCardSubInfos = document.createElement('div');
    recipeCardSubInfos.setAttribute('class', 'recipe_card__sub_infos');

    const recipeCardIngredients = document.createElement('div');
    recipeCardIngredients.setAttribute('class', 'recipe_card__sub_infos__ingredients')
    ingredients.forEach((ingredient) => {
      const recipeCardIngredient = document.createElement('p');
      recipeCardIngredient.setAttribute('class', 'recipe_card__sub_infos__ingredients__ingredient');
      const recipeCardIngredientName = document.createElement('span');
      recipeCardIngredientName.setAttribute('class', 'recipe_card__sub_infos__ingredients__ingredient__name')
      const recipeCardIngredientValue = document.createElement('span');
      recipeCardIngredientValue.setAttribute('class', 'recipe_card__sub_infos__ingredients__ingredient__value')
      recipeCardIngredientName.textContent = ingredient.ingredient
      const dots = ingredient.quantity || ingredient.unit ? ": " : "";
      const quantity = ingredient.quantity ? ingredient.quantity : "";
      const unit = ingredient.unit ? ingredient.unit : "";
      recipeCardIngredientValue.textContent = dots + quantity + " " + unit;
      recipeCardIngredient.appendChild(recipeCardIngredientName);
      recipeCardIngredient.appendChild(recipeCardIngredientValue);
      recipeCardIngredients.appendChild(recipeCardIngredient);
    })
    recipeCardSubInfos.appendChild(recipeCardIngredients);

    const recipeCardDescription = document.createElement('p');
    recipeCardDescription.setAttribute('class', 'recipe_card__sub_infos__description');
    recipeCardDescription.textContent = description;
  recipeCardSubInfos.appendChild(recipeCardDescription);

  recipeCard.appendChild(recipeCardSubInfos);
  return (recipeCard);
  }

  return {getRecipeCardDOM};
}
