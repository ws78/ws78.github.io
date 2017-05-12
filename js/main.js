/*
$(function() {
    $('.multiselect-ui').multiselect({
        includeSelectAllOption: true
    });
});
*/

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDe0jZeAVhFFLg7au3mGFsxO8smZ1m9caA",
    authDomain: "recipe-test-2279d.firebaseapp.com",
    databaseURL: "https://recipe-test-2279d.firebaseio.com",
    projectId: "recipe-test-2279d",
    storageBucket: "recipe-test-2279d.appspot.com",
    messagingSenderId: "49097963838"
  };
  firebase.initializeApp(config);

//Connect to database
var database = firebase.database();


//create object literal which will hold user input
var recipe = {};

$('form').on('submit', function (e) {
  e.preventDefault(); // Prevent the page from reloading

  recipe.name = $('#recipeName').val(); // Grab the values the user entered into the input
  recipe.prepTime = $('#prepTime').val();

  $('#recipeName').val(''); // Empty out the input field
  $('#prepTime').val('');

  //post, or send, this reservation info to our Firebase database.
  //Create a section for recipes data in the database, 'recipes' will be our reference
  var recipesReference = database.ref('recipes');

   //POST the configured recipe object to your Firebase database using Firebase's .push() method
  recipesReference.push(recipe);

  //the function here should take ONLY the last recipe and display the linked name
  function getOneRecipe() {
    recipesReference.on('child_added', function(recipe, prevChildKey) {
      var newRecipe = recipe.val();
      console.log("new recipe Name: " + newRecipe.name);

      //remove any recipes that are currently being displayed in the .recipeData div so that we can later update the div using Handlebars
      $('.recipeData').empty();

       // Create an object literal with the data we'll pass to Handlebars
      var context = {
        recipeName: newRecipe.name,
        recipeId: recipe
      };

      console.log('this is recipeID for last recipe', recipeId);

      getRecipe(recipeId);
/*
      //code for working with the handlebars template
      var source = $("#entry-template").html();

      //Compile the template using the Handlebars.compile() method, passing in the HTML for the template (stored in the variable source) as the parameter:
      var template = Handlebars.compile(source);

      //Add that data to the template we compiled (var newRecipeHTML = template(data);).
      //Now we want to pass in this data to the template we compiled in step 2 that is stored in the variable template:
      var newRecipeHTML = template(context);

      //Then add the new content to the DOM using a method like append() or html()
      //finally, we can now append each new recipe item that uses the template to the page
      $('#recipeData').append(newRecipeHTML);
*/

    });
  }

  
 });

//add a visual confirmation for the user letting them know if their recipe was added successfully or not. Create a function getRecipes after the form submit event.
//'recipes' is the db reference we create here
//this function will get the list of recipes showing only the names of the recipes
function getRecipes(){
  var recipesReference = database.ref('recipes');

  //event handler to listen for any changes to the Firebase database
  recipesReference.on('value', function (results) {

  	// get all recipes stored in the results we received back from Firebase 
    var allRecipes = results.val();

    //remove any recipes that are currently being displayed in the .recipeData div so that we can later update the div using Handlebars
    $('.recipeData').empty();

    // for loop to iterate through each recipe in the allRecipes object. create an object named context using an object literal. After you've created the context object, log the name from the context object to the console.
    // iterate (loop) through all recipes coming from database call
    // syntax for using a for loop to iterate through an object is for (itemName in objectName)
    for (var recipe in allRecipes) {
    
    // Create an object literal with the data we'll pass to Handlebars
      var context = {
        recipeName: allRecipes[recipe].name,
        //prepTime: allRecipes[recipe].prepTime,
        recipeId: recipe
      };

      //get the html from the Handlebars template, compile the template, and then append the newly created list item to the list that has a class of .recipeData

      //code for working with the handlebars template
  	  var source = $("#entry-template").html();

  	  //Compile the template using the Handlebars.compile() method, passing in the HTML for the template (stored in the variable source) as the parameter:
  	  var template = Handlebars.compile(source);

  	  //Add that data to the template we compiled (var newRecipeHTML = template(data);).
  	  //Now we want to pass in this data to the template we compiled in step 2 that is stored in the variable template:
  	  var newRecipeHTML = template(context);

  	  //Then add the new content to the DOM using a method like append() or html()
  	  //finally, we can now append each new recipe item that uses the template to the page
  	  $('#recipeData').append(newRecipeHTML);
  	}

  });
}




// where 'recipeID' argument comes from the firebase id of that particular recipe
var recipeId = getUrlParameter('recipeId');
console.log('this is the recipeID ', recipeId);

if (recipeId != undefined) {
    getRecipe(recipeId);
} else {
    // When page loads, get all recipes
    getRecipes();
}

//where the id passed in is the recipeId from above (ie. firebase id of the recipe)
//so if we have an id, we can display the entire recipe, otherwise we do like above where we only display the title of the recipe
function getRecipe(id) {
  //this pulls the recipe located at recipes/id from firebase
  var recipesReference = database.ref('recipes/' + id);
  recipesReference.once('value').then(function (result) {
    var context = {
      recipeName: result.val().name,
      prepTime: result.val().prepTime,
      recipeId: id
    };
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var newRecipeHTML = template(context);
    //here we can add an append to various element id's so that either we display a link on one page, the full recipe on another or a link and header on a third
    $('#recipeData').append(newRecipeHTML);
  });
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}





