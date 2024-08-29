const SearchBox = document.querySelector(".SearchBox");
const SearchBtn = document.querySelector(".SearchBtn");
const recipeContainer = document.querySelector(".recipeContainer");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");




const FetchRecipe = async (query)=>{ 
    recipeContainer.innerHTML = "<h2>Searching your recipe..</h2>";
    try {

        const data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        
        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML=`
            <img src="${meal.strMealThumb}">   
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);
    
            button.addEventListener('click', ()=>{
                openRecipePopup(meal);
    
            });
    
    
            recipeContainer.appendChild(recipeDiv);
        });
        
    } catch (error) {

        recipeContainer.innerHTML = '<h2>Opps.. No result found</h2>';
    }

}


//Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for(let i = 1;i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure  = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}  </li>`
        }
        else{
            break;
        }
    }
   return ingredientsList;;
}


const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML = 
    ` 
    <h2 class="recipename">${meal.strMeal}<h2>    
    <h3 class="ingredients">Ingredients:</h3>    
    <ul>${fetchIngredients(meal)}</ul>   
    <div class="Instructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";

}


recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display="none";
});

SearchBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    const searchInput = SearchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the Meal in the search box</h2>`;
        return;
    }
    FetchRecipe(searchInput);

})




function refreshImage() {
    const imageElement = document.getElementById('foodLogo');
    
    // Create a new Image object to reload the image
    const newImage = new Image();
    newImage.src = imageElement.src.split('?')[0] + "?t=" + new Date().getTime();
    
    // Replace the existing image with the new one
    newImage.onload = function() {
        imageElement.src = newImage.src;
    };
}