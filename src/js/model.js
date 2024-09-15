import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { get_data,wait } from './helper.js';

export const state = {
  recipe: {},
};


export const LoadRecipe = async function (hash_id) {
  try {
    const data = await Promise.race([get_data(`${API_URL}${hash_id}`), wait(.5)]);

    if (!data) throw new Error('Request took too long');

    // Destructure the data object to get the recipe data
    let { recipe } = data.data;
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
  } catch (err) {
    console.error(err.message);
  }
};
