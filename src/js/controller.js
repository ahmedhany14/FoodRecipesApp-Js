import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';

import * as model from './model';

const recipeContainer = document.querySelector('.recipe');


// 1) Load recipe data
/*
API link :https://forkify-api.herokuapp.com/v2
Link of Get recipe/Delete recipe: https://forkify-api.herokuapp.com/api/v2/recipes/ID

*/

const controlRecipes = async function (hash_id = '') {
  try {
    // Get the hash from the URL
    //const hash_id = window.location.hash.slice(1);
    //hash_id = '664c8f193e7aa067e94e8783';
    // If there is no hash in the URL, return
    if (hash_id.length === 0 || typeof hash_id !== "string") return;
    // Render spinner
    RecipeView.renderSpinner();

    // 1) Fetching data from API
    await model.LoadRecipe(hash_id);
    // 2) Rendering the recipe

    if (!model.state.recipe) {
      throw new Error('No recipe found');
    }
    RecipeView.render(model.state.recipe);
  } catch (err) {
    // Catch the error and log it
    //alert(err.message);
    RecipeView.renderError();
    //console.error(err.message);
  }
};

const controlSearchResults = async function (query = '') {
  try {

    // Get the query from the search view
    query = SearchView.getQuery();

    console.log('query', query);


    if (query.length === 0 || typeof query !== "string") return;

    // 2) Load search results
    await model.LoadSearchResult(query);
    console.log(model.state.search.result);

    // Check if there are any search results
    if (!model.state.search.result) {
      throw new Error('No recipe found');
    }

    // 3) Render search results
    controlRecipes(model.state.search.result[20].id);
  } catch (err) {
    console.error(err.message);
  }
}

const main = function () {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
  //controlRecipes();
  controlSearchResults();
};

main();