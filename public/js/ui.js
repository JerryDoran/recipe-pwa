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
  console.log(recipe);
  recipe.remove();
};

// Render recipe data
const renderRecipe = (data, id) => {
  if (data.favorite === true) {
    const html = `
  <div class="card-panel recipe white row" data-id="${id}">
    <img src="img/dish.jpeg" alt="recipe thumb" />
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
      <i class="material-icons" data-id="${id}">create</i>
    </div>  
    
    <div class="recipe-delete">
      <i class="material-icons" data-id="${id}">delete</i>
    </div>
    <div class="heart">
      <i class="fa fa-heart like active" id="heart" data-id="${id}"></i>
    </div>    
    
  </div> 
  `;
    recipes.innerHTML += html;
  } else {
    const html = `
  <div class="card-panel recipe white row" data-id="${id}">
    <img src="img/dish.jpeg" alt="recipe thumb" />
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
      <i class="material-icons" data-id="${id}">create</i>
    </div>  
    
    <div class="recipe-delete">
      <i class="material-icons" data-id="${id}">delete</i>
    </div>
    <div class="heart">
      <i class="fa fa-heart like" id="heart" data-id="${id}"></i>
    </div>    
    
  </div> 
  `;
    recipes.innerHTML += html;
  }
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

// const like = () => {
//   const card = document.querySelector('.card-panel');
//   const hearts = card.querySelectorAll('.heart');

//   for (heart of hearts) {
//     console.log(heart);
//     heart.addEventListener('click', () => {
//       if (heart.classList.contains('active')) {
//         heart.classList.remove('active');
//       } else {
//         heart.classList.add('active');
//       }
//     });
//   }
// };

// Search Recipe List
const filterInput = document.getElementById('filterTitle');

filterInput.addEventListener('keyup', filterNames);

function filterNames() {
  let filterValue = document.getElementById('filterTitle').value.toUpperCase();
  let recipes = document.querySelector('.recipes');
  let cards = recipes.querySelectorAll('.card-panel');

  for (let i = 0; i < cards.length; i++) {
    let a = cards[i].querySelector('.recipe-title');

    // If matched
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      cards[i].style.display = '';
    } else {
      cards[i].style.display = 'none';
    }
  }
}

// Sort Recipe Lists
sortButton = document.querySelector('.sort-title');
let desc = false;
sortButton.addEventListener('click', () => {
  let cards = Array.from(recipes.querySelectorAll('.card-panel'));
  let recipeList = sortRecipes(cards, desc);
  displaySortedRecipesList(recipeList);
  desc = !desc;
});

const displaySortedRecipesList = recipeList => {
  recipes.innerHTML = '';
  console.log(recipeList);
  recipeList.forEach(recipe => {
    const html = `
    <div class="card-panel recipe white row" data-id="${recipe.dataset.id}">
      <img src="img/dish.jpeg" alt="recipe thumb" />
      <div class="recipe-details">
        <div class="recipe-title">${recipe.childNodes[3].childNodes[1].innerText}</div>
        <div class="recipe-ingredients">
          ${recipe.childNodes[3].childNodes[3].innerText}
        </div>
        <div class="recipe-instructions">
          ${recipe.childNodes[3].childNodes[5].innerText}
        </div>
        <div class="recipe-creator">
          
          <p class="creator">${recipe.childNodes[3].childNodes[7].innerText}</p>
        </div>
        <div class="recipe-date">
          
          <p class="created">${recipe.childNodes[3].childNodes[9].innerText}</p>
        </div>
      </div>
      <div class="recipe-edit sidenav-trigger" data-target="side-form-edit">
        <i class="material-icons" data-id="${recipe.dataset.id}">create</i>
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${recipe.dataset.id}">delete</i>
      </div>
      <div class="heart">
      <i class="fa fa-heart like" id="heart" data-id="${recipe.dataset.id}"></i>
    </div>    
    </div> 
    `;
    recipes.innerHTML += html;
  });
};

function sortRecipes(arr, desc) {
  arr.sort(function(a, b) {
    let aa = a.querySelector('.recipe-title').innerHTML.toLowerCase();
    let bb = b.querySelector('.recipe-title').innerHTML.toLowerCase();
    if (aa < bb) return -1;
    if (aa > bb) return 1;
    return 0;
  });

  if (desc) arr.reverse();

  return arr;
}

const onCloseEnd = () => {
  sideFormEdit.innerHTML = '';
};
M.Sidenav.init(sideFormEdit, { onCloseEnd });
