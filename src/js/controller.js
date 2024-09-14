import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

console.log('Here we goo');

// 1) Load recipe data
/*
API link :https://forkify-api.herokuapp.com/v2
Link of Get recipe/Delete recipe: https://forkify-api.herokuapp.com/api/v2/recipes/ID

*/

const Spinner = function (parentElement) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;

  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', markup);
};

const LoadRecipe = async function () {
  try {
    // Get the hash from the URL
    const hash_id = window.location.hash.slice(1);
    //const hash_id = '664c8f193e7aa067e94e8783';

    // If there is no hash in the URL, return
    if (hash_id.length === 0 || hash_id === null) return;
    // Render spinner
    Spinner(recipeContainer);

    // 1) Fetching data from API
    const response = await fetch(
      //      'https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8783'
      `https://forkify-api.herokuapp.com/api/v2/recipes/${hash_id}`
    );

    // Check if the response is ok, if not throw an error
    if (response.status !== 200) {
      throw new Error(
        `Couldn't fetch the recipe data, API status: ${response.status}`
      );
    }

    // Convert the response to JSON to get the recipe data
    const data = await response.json();
    if (data.status !== 'success') {
      throw new Error(`No data found, ${data.message}`);
    }

    // Destructure the data object to get the recipe data
    let { recipe } = data.data;
    recipe = {
      title: recipe.title,
      id: recipe.id,
      publisher: recipe.publisher,
      img_url: recipe.image_url,
      source_url: recipe.source_url,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // 2) Rendering the recipe

    const markup = `
        <figure class="recipe__fig">
          <img src=${recipe.img_url} alt=${recipe.title} class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cooking_time
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients
              .map(ing => {
                console.log(ing);
                return `    
              <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
              `;
              })
              .join('')}  
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href= ${recipe.source_url}
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
`;

    // Clear the recipe container and insert the recipe markup
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    // Catch the error and log it
    //alert(err.message);
    console.error(err.message);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, LoadRecipe)
);
