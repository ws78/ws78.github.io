//create object literal which will hold user input
var recipe = {};


// where 'recipeID' argument comes from the firebase id of that particular recipe
var recipeId = getUrlParameter('recipeId');

if (recipeId != undefined) {
    //if we have a recipeID, then use that to pull values from firebase and fill in the fields. 
    //then run event handler on submit and send new recipe values to firebase
    console.log(recipeId);




     // find recipe whose recipeId is equal to the id we're searching with
     //var recipeReference = database.ref('recipes/' + recipeId);

    firebase.database().ref('recipes/' + recipeId).once('value').then(function(snapshot) {
      console.log(snapshot.val().name);
    });
     



    //https://recipe-test-2279d.firebaseio.com/-KkI3zGYxvUBwO1xAjKt

   // $('#recipeName').val(database.ref(recipeId/name));
    //https://recipe-test-2279d.firebaseio.com/recipeId/name


    //$('#prepTime').val(database.ref(recipeId/prepTime));
} else {
    // When page loads, run event handler on submit and send new recipe values to firebase
    $('form').on('submit', function (e) {
      e.preventDefault(); // Prevent the page from reloading

      recipe.name = $('#recipeName').val(); // Grab the values the user entered into the input
      recipe.prepTime = $('#prepTime').val();

      $('#recipeName').val(''); // Empty out the input field
      $('#prepTime').val('');

      //Create a section for recipes data in the database, 'recipes' will be our reference
      var recipesReference = database.ref('recipes');

       //POST the configured recipe object to your Firebase database using Firebase's .push() method
      var latestRecipe = recipesReference.push(recipe);
      //console.log('the latest recipe is ', latestRecipe.key);
      window.location = 'recipe.html?recipeId=' +latestRecipe.key;
 });
}