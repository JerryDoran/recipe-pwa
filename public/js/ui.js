const recipes = document.querySelector('.recipes');

// Initialize side nav
const sideNav = document.querySelector('.side-menu');
M.Sidenav.init(sideNav, {});

// Initialize side form Add
const sideFormAdd = document.querySelector('.side-form-add');
M.Sidenav.init(sideFormAdd, {});

// Initialize side form Edit
const sideFormEdit = document.querySelector('.side-form-edit');

// Remove recipe from DOM
const removeRecipe = id => {
  const recipe = document.querySelector(`.recipe[data-id=${id}]`);
  recipe.remove();
};

// Render recipe data
const renderRecipe = (data, id) => {
  const html = `
  <div class="card-panel recipe white row" data-id="${id}">
    <img src="/public/img/dish.jpeg" alt="recipe thumb" />
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
      <div class="recipe-date">
        <p class="created-on">Date:</p>
        <p class="created">${data.date}</p>
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

const renderEditForm = (data, id) => {
  const html = `
  <form class="edit-recipe container section">
    <h6 class="grey-text text-darken-1">Edit Recipe</h6>
    <div class="divider"></div>
    <label class="label">Name</label>
    <div class="input-field">    
      <input type="text" id="title" class="validate" value="${data.title}" />            
    </div>
    <label class="label">Ingredients</label>
    <div class="input-field">
      <input type="text" id="ingredients" class="validate" value="${data.ingredients}" />      
    </div>
    <label class="label">Instructions</label>
    <div class="input-field">
      <input type="text" id="instructions" class="validate" value="${data.instructions}" />      
    </div>
    <label class="label">Created by</label>
    <div class="input-field">
      <input type="text" id="creator" class="validate" value="${data.createdby}" />      
    </div>
    <label class="label">Date</label>
    <div class="input-field">
      <input type="text" id="date" class="validate" value="${data.date}" />      
    </div>
    <div class="input-field">
      <input type="hidden" id="id" data-id="${id}" />
    </div>
    <div class="input-field center">
      <button type="submit" class="btn-small">Save</button>
    </div>
</form>
  
  `;
  sideFormEdit.innerHTML += html;
};

const onCloseEnd = () => {
  sideFormEdit.innerHTML = '';
};
M.Sidenav.init(sideFormEdit, { onCloseEnd });
