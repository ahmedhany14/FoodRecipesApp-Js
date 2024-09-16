import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import searchResult from './views/searchResultView.js';
import PaginationView from './views/PaginationView.js';

import * as model from './model';

const controlRecipes = async function (hash_id = '') {
  try {
    //hash_id = '664c8f193e7aa067e94e8783';

    hash_id = window.location.hash.slice(1);

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
    searchResult.renderSpinner();

    // 2) Load search results
    await model.LoadSearchResult(query);

    // Check if there are any search results
    if (!model.state.search.result) {
      throw new Error('No recipe found');
    }

    // 3) Render search results
    const PageNumber = 2;
    const pages = model.getsearchResultPage(PageNumber);

    searchResult.render(pages);
    PaginationView.render(model.state.search);

  } catch (err) {
    console.error(err.message);
  }
}

const controlPagination = function (page) {
  const pages = model.getsearchResultPage(page);
  searchResult.render(pages);
  PaginationView.render(model.state.search);
}

const main = function () {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);

  controlSearchResults();
};

main();