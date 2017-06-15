// where 'recipeID' argument comes from the firebase id of that particular recipe
var recipeId = getUrlParameter('recipeId');


if (recipeId != undefined) {
    getRecipe(recipeId);
    
} else {
    // When page loads, get all recipes showing name only
    getRecipes();
    
}

/*
if (recipeId === undefined) {
	// When page loads, get all recipes showing name only
    getRecipes();
} else {
	getRecipe(recipeId);
} */