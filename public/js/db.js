// Offline data
db.enablePersistence().catch((err) => {
  if (err.code == 'failed-precondition') {
    // probably multiple tabs opened at once
    console.log('persistence failed');
  } else if (err.code == 'unimplemented') {
    // lack of browser support
    console.log('persistence is not available');
  }
});

// Real-time listener - listen to this collection and when there is a change
// I want firestore to send me a snapshot of the changes in the collection at
// that point in time.
db.collection('recipes')
  .orderBy('title', 'asc')
  .onSnapshot((snapshot) => {
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach((change) => {
      // console.log(change, change.doc.data(), change.doc.id);
      if (change.type === 'added') {
        // add document data to web page
        renderRecipe(change.doc.data(), change.doc.id);
      }

      if (change.type === 'removed') {
        // remove document data from web page
        removeRecipe(change.doc.id);
      }
    });
  });

// Add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  // event.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
    instructions: form.instructions.value,
    createdby: form.creator.value,
    date: form.date.value,
    favorite: false,
  };

  db.collection('recipes')
    .add(recipe)
    .catch((err) => console.log(err));

  form.title.value = '';
  form.ingredients.value = '';
  form.instructions.value = '';
  form.creator.value = '';
  form.date.value = '';
});

// Delete a recipe, like or edit recipe
const recipeContainer = document.querySelector('.recipes');

recipeContainer.addEventListener('click', (event) => {
  // Delete a recipe
  if (event.target.innerHTML === 'delete') {
    const id = event.target.getAttribute('data-id');
    if (confirm('Are you sure you want to delete recipe?')) {
      db.collection('recipes').doc(id).delete();
    } else {
      return;
    }
    // Create a recipe
  } else if (event.target.innerHTML === 'create') {
    const id = event.target.getAttribute('data-id');
    db.collection('recipes')
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        renderEditForm(data, id);
        const editRecipeForm = document.querySelector('.edit-recipe');
        editRecipeForm.addEventListener('submit', (event) => {
          // event.preventDefault();

          const recipe = {
            title: editRecipeForm.title.value,
            ingredients: editRecipeForm.ingredients.value,
            instructions: editRecipeForm.instructions.value,
            createdby: editRecipeForm.creator.value,
            date: editRecipeForm.date.value,
          };

          db.collection('recipes')
            .doc(id)
            .update(recipe)
            .catch((err) => console.log(err));

          editRecipeForm.title.value = '';
          editRecipeForm.ingredients.value = '';
          editRecipeForm.instructions.value = '';
          editRecipeForm.creator.value = '';
          editRecipeForm.date.value = '';
        });
      });

    // db.collection('recipes').onSnapshot(snapshot => {
    //   snapshot.docChanges().forEach(change => {
    //     if (change.doc.id === id) {
    //       const data = change.doc.data();
    //       renderEditForm(data, id);
    //       const editRecipeForm = document.querySelector('.edit-recipe');
    //       editRecipeForm.addEventListener('submit', event => {
    //         event.preventDefault();

    //         const recipe = {
    //           title: editRecipeForm.title.value,
    //           ingredients: editRecipeForm.ingredients.value,
    //           instructions: editRecipeForm.instructions.value,
    //           createdby: editRecipeForm.creator.value,
    //           date: editRecipeForm.date.value
    //         };
    //         console.log(recipe);

    //         db.collection('recipes')
    //           .doc(id)
    //           .update(recipe)
    //           .catch(err => console.log(err));

    //         editRecipeForm.title.value = '';
    //         editRecipeForm.ingredients.value = '';
    //         editRecipeForm.instructions.value = '';
    //         editRecipeForm.creator.value = '';
    //         editRecipeForm.date.value = '';
    //       });
    //     }
    //   });
    // });

    // Add to favorites list
  } else if (event.target.id === 'heart') {
    const id = event.target.getAttribute('data-id');
    event.target.classList.toggle('active');
    let favoriteChoice;
    if (event.target.classList.contains('active')) {
      favoriteChoice = true;
    } else {
      favoriteChoice = false;
    }

    const recipe = {
      favorite: favoriteChoice,
    };
    db.collection('recipes')
      .doc(id)
      .update(recipe)
      .catch((err) => console.log(err));
  }
});
