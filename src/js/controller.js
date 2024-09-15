import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import RecipeView from './views/recipeView';
import * as model from './model';

const recipeContainer = document.querySelector('.recipe');


// 1) Load recipe data
/*
API link :https://forkify-api.herokuapp.com/v2
Link of Get recipe/Delete recipe: https://forkify-api.herokuapp.com/api/v2/recipes/ID

*/

const controlRecipes = async function () {
  try {
    // Get the hash from the URL
    //const hash_id = window.location.hash.slice(1);
    const hash_id = '664c8f193e7aa067e94e8783';

    // If there is no hash in the URL, return
    if (hash_id.length === 0 || hash_id === null) return;
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
    console.error(err.message);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
