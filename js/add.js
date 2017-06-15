//create object literal which will hold user input
var recipe = {};


// where 'recipeID' argument comes from the firebase id of that particular recipe
var recipeId = getUrlParameter('recipeId');

if (recipeId != undefined) {
    //if we have a recipeID, then use that to pull values from firebase and fill in the fields. 
    //then run event handler on submit and send new recipe values to firebase

    //We provide the location in the db that we want to pull values from
    var recipeReference = database.ref('recipes/' + recipeId);

    //We want to read the data once as opposed to listening for a change, so we use .once. Then using the snapshot method, we can see what the data looks like at recipeReference.
    recipeReference.once('value').then(function(snapshot) {
      //Then from the snapshot of the data, we can pull the values for each part of the object. Then send that value to the HTML
      var formName = snapshot.val().name;
      var formPrep = snapshot.val().prepTime;
      var formCook = snapshot.val().cookTime;
      var formTotal = snapshot.val().totalTime;
      var formServes = snapshot.val().serves;
      var formIngredients = snapshot.val().ingredients;
      var formDirections = snapshot.val().directions;
      var formMealType = snapshot.val().mealType;
      $('#recipeName').val(formName);
      $('#prepTime').val(formPrep);
      $('#cookingTime').val(formCook);
      $('#totalTime').val(formTotal);
      $('#serves').val(formServes);
      $('#ingredients').val(formIngredients);
      $('#directions').val(formDirections);
      $('#mealType').val(formMealType);

    });
    //we need to run the event handler on submit now
    $('form').on('submit', function (e) {
      e.preventDefault(); // Prevent the page from reloading

      recipe.name = $('#recipeName').val(); // Grab the values the user entered into the input
      recipe.prepTime = $('#prepTime').val();
      recipe.cookTime = $('#cookingTime').val();
      recipe.totalTime = $('#totalTime').val();
      recipe.serves = $('#serves').val();
      recipe.ingredients = $('#ingredients').val();
      recipe.directions = $('#directions').val();
      recipe.mealType = $('#mealType').val();

      $('#recipeName').val(''); // Empty out the input field
      $('#prepTime').val('');
      $('#cookingTime').val('');
      $('#totalTime').val('');
      $('#serves').val('');
      $('#ingredients').val('');
      $('#directions').val('');
      $('#mealType').val('');

      
      //We provide the location in the db that we want to push new values to
      var recipeReference = database.ref('recipes/' + recipeId);

      //UPDATE the configured recipe object to your Firebase database using Firebase's .update() method
      var latestRecipe = recipeReference.update(recipe);

      recipeReference.once('value').then(function(snapshot) {
        //Then from the snapshot of the data, we can get the key of the recipe object and use that to redirect the user to the updated recipe page
        window.location = 'recipe.html?recipeId=' +snapshot.key;
      });
 
    });
} else {
    $('form').on('submit', function (e) {
      e.preventDefault(); // Prevent the page from reloading

      recipe.name = $('#recipeName').val(); // Grab the values the user entered into the input
      recipe.prepTime = $('#prepTime').val();
      recipe.cookTime = $('#cookingTime').val();
      recipe.totalTime = $('#totalTime').val();
      recipe.serves = $('#serves').val();
      recipe.ingredients = $('#ingredients').val();
      recipe.directions = $('#directions').val();
      recipe.mealType = $('#mealType').val();

      $('#recipeName').val(''); // Empty out the input field
      $('#prepTime').val('');
      $('#cookingTime').val('');
      $('#totalTime').val('');
      $('#serves').val('');
      $('#ingredients').val('');
      $('#directions').val('');
      $('#mealType').val('');

      //Create a section for recipes data in the database, 'recipes' will be our reference
      var recipesReference = database.ref('recipes');

       //POST the configured recipe object to your Firebase database using Firebase's .push() method
      var latestRecipe = recipesReference.push(recipe);
      //console.log('the latest recipe is ', latestRecipe.key);
      window.location = 'recipe.html?recipeId=' +latestRecipe.key;
 });
}

