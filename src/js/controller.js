const recipeContainer = document.querySelector('.recipe');

console.log('Here we goo');

// 1) Load recipe data
/*
API link :https://forkify-api.herokuapp.com/v2
Link of Get recipe/Delete recipe: https://forkify-api.herokuapp.com/api/v2/recipes/ID

*/
const LoadRecipe = async function () {
  try {
    // Fetching data from API
    const response = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
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
  } catch (err) {
    // Catch the error and log it
    alert(err.message);
    //console.error(err.message);
  }
};

LoadRecipe();
