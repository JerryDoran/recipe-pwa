const recipes = document.querySelector('.recipes');

// Initialize side nav
const sideNav = document.querySelector('.side-menu');
M.Sidenav.init(sideNav, {});

// Initialize side form Add
const sideFormAdd = document.querySelector('.side-form-add');
M.Sidenav.init(sideFormAdd, {});

// Initialize side form Edit
const sideFormEdit = document.querySelector('.side-form-edit');
M.Sidenav.init(sideFormEdit, {});

// Remove recipe from DOM
const removeRecipe = id => {
  const recipe = document.querySelector(`.recipe[data-id=${id}]`);
  recipe.remove();
};

// Render recipe data
const renderRecipe = (data, id) => {
  const html = `
  <div class="card-panel recipe white row" data-id="${id}">
    <img src="/img/dish.jpeg" alt="recipe thumb" />
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
    <div class="recipe-edit sidenav-trigger" data-target="side-form-edit">
      <i class="material-icons" data-id="${id}">subject</i>
    </div>
    <div class="recipe-delete">
      <i class="material-icons" data-id="${id}">delete_outline</i>
    </div>
  </div> 
  `;

  recipes.innerHTML += html;
};

// const updateEditForm = id => {
//   console.log('hey');
// };

// const editForm = document.querySelector('.recipe-edit');
// editForm.addEventListener('click', event => {
//   const id = event.target.getAttribute('data-id');
//   console.log(id);
//   updateEditForm(id);
// });
