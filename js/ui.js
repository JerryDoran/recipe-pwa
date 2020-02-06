const recipes = document.querySelector('.recipes');

// Initialize side nav
const sideNav = document.querySelector('.side-menu');
M.Sidenav.init(sideNav, {});

// Initialize side form
const sideForm = document.querySelector('.side-form');
M.Sidenav.init(sideForm, {});

// Render recipe data
const renderRecipe = (data, id) => {
  const html = `
  <div class="card-panel recipe white row" data-id="${id}">
    <img src="/img/dish.png" alt="recipe thumb" />
    <div class="recipe-details">
      <div class="recipe-title">${data.title}</div>
      <div class="recipe-ingredients">
        ${data.ingredients}
      </div>
      <div class="recipe-instructions">
        ${data.instructions}
      </div>
      <div class="recipe-creator">
        <p class="created-by">Created by:</p>
        <p class="creator">${data.createdby}</p>
      </div>
    </div>
    <div class="recipe-delete">
      <i class="material-icons" data-id="${id}">delete_outline</i>
    </div>
  </div> 
  `;

  recipes.innerHTML += html;
};

// Remove recipe from DOM
const removeRecipe = id => {
  const recipe = document.querySelector(`.recipe[data-id=${id}]`);
  recipe.remove();
};
