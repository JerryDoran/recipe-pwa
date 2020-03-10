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

// Search Recipe List
const filterInput = document.getElementById('filterTitle');

filterInput.addEventListener('keyup', filterNames);

function filterNames() {
  let filterValue = document.getElementById('filterTitle').value.toUpperCase();
  let recipes = document.querySelector('.recipes');
  let card = recipes.querySelectorAll('.card-panel');

  for (let i = 0; i < card.length; i++) {
    let a = card[i].querySelector('.recipe-title');

    // If matched
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      card[i].style.display = '';
    } else {
      card[i].style.display = 'none';
    }
  }
}

// Sort Recipe List
sortButton = document.querySelector('.sort-title');
sortButton.addEventListener('click', sortRecipes);

function sortRecipes() {
  let recipes = document.querySelector('.recipes');
  let cards = recipes.querySelectorAll('.card-panel');
  let recipeList = [];

  for (let i = 0; i < cards.length; i++) {
    recipeList.push(cards[i]);
  }

  recipeList.sort(function(a, b) {
    console.log(a);
    let aa = a.querySelector('.recipe-title').innerHTML.toLowerCase();
    let bb = b.querySelector('.recipe-title').innerHTML.toLowerCase();
    console.log(aa);
    console.log(bb);

    return aa > bb ? -1 : aa < bb ? 1 : 0;
  });

  console.log(recipeList);

  recipes.innerHTML = recipeList;
}

const onCloseEnd = () => {
  sideFormEdit.innerHTML = '';
};
M.Sidenav.init(sideFormEdit, { onCloseEnd });
