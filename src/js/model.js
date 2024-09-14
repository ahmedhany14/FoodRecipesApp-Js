import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export const LoadRecipe = async function (hash_id) {
  try {
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
