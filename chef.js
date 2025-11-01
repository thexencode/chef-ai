async function findRecipes() {
  const input = document.getElementById('ingredientInput').value.trim();
  const cuisine = document.getElementById('nationality').value;
  const apiKey = '0b7e4003506b40bd8de3d5b0775644a5';
  const results = document.getElementById('recipeResults');

  if (!input) {
    alert('Please enter at least one ingredient!');
    return;
  }

  results.innerHTML = `<p class="text-white">Loading recipes...</p>`;

  const url = cuisine
    ? `https://api.spoonacular.com/recipes/complexSearch?query=${input}&cuisine=${cuisine}&number=6&apiKey=${apiKey}`
    : `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${input}&number=6&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    results.innerHTML = '';

    const recipes = data.results || data;

    if (!recipes || recipes.length === 0) {
      results.innerHTML = `<p class="text-white">No recipes found. Try different ingredients.</p>`;
      return;
    }

    recipes.forEach(recipe => {
      results.innerHTML += `
        <div class="card text-white m-2" style="width: 18rem;">
          <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
          <div class="card-body bg-dark">
            <h5 class="card-title">${recipe.title}</h5>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error(error);
    results.innerHTML = `<p class="text-white">Error fetching recipes. Please check your API key or try again later.</p>`;
  }
}
