import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { get_data, wait } from './helper.js';

export const state = {
  recipe: {},

  search: {
    query: '',
    result: [],
    resultPerPage: RES_PER_PAGE,
    page: 0,
  },
  Bookmarks: new Set(),
};


export const LoadRecipe = async function (hash_id) {
  try {
    const data = await Promise.race([get_data(`${API_URL}${hash_id}`), wait(1.5)]);

    if (!data) throw new Error('Request took too long');

    // Destructure the data object to get the recipe data
    let { recipe } = await data.data;
    state.recipe = {
      title: recipe.title,
      id: recipe.id,
      publisher: recipe.publisher,
      img_url: recipe.image_url,
      source_url: recipe.source_url,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    state.recipe.bookmark = state.Bookmarks.has(hash_id) ? true : false;
    state.search.page = 1;
  } catch (err) {
    //console.error(err.message);
    throw err;
  }
};


export const LoadSearchResult = async function (query) {
  try {
    const url = `${API_URL}?search=${query}`;
    const data = await Promise.race([get_data(url), wait(.5)]);
    if (!data) throw new Error('Request took too long');

    state.search.result = data.data.recipes.map(resipe => {
      return {
        id: resipe.id,
        title: resipe.title,
        publisher: resipe.publisher,
        img_url: resipe.image_url
      };
    });
  }
  catch (err) {
    throw err;
  }
};


export const getsearchResultPage = function (page = 1) {
  // page 1: 0-9, page 2: 10-19, page 3: 20-29
  state.search.page = page;
  const left = (page - 1) * state.search.resultPerPage;
  const right = Math.min(page * state.search.resultPerPage, state.search.result.length);

  const result = state.search.result.slice(left, right);
  return result;
}

export const updateServings = function (updateServings) {
  console.log(updateServings);

  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * updateServings / state.recipe.servings;
  });
  state.recipe.servings = updateServings;
}

export const Bookmark = function (recipe) {
  const recipe_id = recipe.id;

  if (state.Bookmarks.has(recipe_id)) {
    state.Bookmarks.delete(recipe_id);
    state.recipe.bookmark = false;
  } else {
    state.Bookmarks.add(recipe_id);
    state.recipe.bookmark = true;
  }

  console.log(state.Bookmarks);
}
