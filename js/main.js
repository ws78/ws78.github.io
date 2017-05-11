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

//Create a recipe object that takes user input for its values

//constructor function to create recipe object
//Each recipe will have a name, prep time, cooking time...
//Each recipe will also have a showRecipe method associated with it that logs a message to the console 

/*
var recipe = function(name, prepTime, cookingTime) {
  this.name = name;
  this.prepTime = prepTime;
  this.cookingTime = cookingTime;
  this.showRecipe = function () {
    console.log("name is " + this.name + "./nprep time is " + this.prepTime + "./n cooking time is " + this.cookingTime);
  };
};
*/

//create object literal which will hold user input
var recipe = {};

$('form').on('submit', function (e) {
  e.preventDefault(); // Prevent the page from reloading

  recipe.name = $('#recipeName').val(); // Grab the values the user entered into the input
  recipe.prepTime = $('#prepTime').val();

  $('#recipeName').val(''); // Empty out the input field
  $('#prepTime').val('');

  //post, or send, this reservation info to our Firebase database.
  //Create a section for recipes data in the database
  var recipesReference = database.ref('recipes');

   //POST the configured recipe object to your Firebase database using Firebase's .push() method
  recipesReference.push(recipe);

  alert("recipe successfully added!");
 });

//add a visual confirmation for the user letting them know if their recipe was added successfully or not. Create a function getRecipes after the form submit event.
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
        prepTime: allRecipes[recipe].prepTime,
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

var recipeId = getUrlParameter('recipeId');

if (recipeId != undefined) {
    getRecipe(recipeId);
} else {
    // When page loads, get all recipes
    getRecipes();
}

function getRecipe(id) {
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

/*


 //constructor function to create a template for recipe objects
 var recipeObject = function(name, prepTime) {
 	this.name = name;
 	this.prepTime = prepTime;

	//not sure if this is in the right place =========================
	//code for working with the handlebars template
	var source = $("#entry-template").html();

	//Compile the template using the Handlebars.compile() method, passing in the HTML for the template (stored in the variable source) as the parameter:
	var template = Handlebars.compile(source);

	//Create an object literal with any data we want to add to the template.
	//For this object, we are setting the receipeName (the name we used in the template) to the description that the user entered into the input field with the id newRecipeName
	var data = {receipeName: this.name }; //$('#newRecipeName').val()
	//console.log("testing var data", data);

	//Add that data to the template we compiled (var newRecipeHTML = template(data);).
	//Now we want to pass in this data to the template we compiled in step 2 that is stored in the variable template:
	var newRecipeHTML = template(data);

	//Then add the new content to the DOM using a method like append() or html()
	//finally, we can now append each new recipe item that uses the template to the page
	$('#recipeData').append(newRecipeHTML);
	console.log("testing handlebars ", newRecipeHTML);
	//======================================================

//let the user know that the recipe was successfully created
 	console.log(this.name + " recipe created!");



//create an instance of the recipe object for the recipe submitted by the user
var newRecipe = new recipeObject(name, prepTime);
console.log("testing new recipe values", newRecipe);
});


*/










