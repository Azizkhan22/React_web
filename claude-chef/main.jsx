import { useState } from "react";

export default function Main() {

    const [ingredients, setIngredients] = useState([])
    const [loading, setLoading] = useState(false)
    const [recipe, setRecipe] = useState(false)

    function FormSubmit(event) {
        event.preventDefault();
        const formdata = new FormData(event.currentTarget)
        const ingredient = formdata.get("ingredient")
        document.getElementById("input").value = "";
        setIngredients(prev => [...prev, ingredient])
    }

    async function fetchRecipe() {
        setLoading(true);
        try {
            const response = await fetch(
                'http://localhost:3000/getRecipe',
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },  // Set headers
                    body: JSON.stringify({ ingredients: ingredients })
                }
            );
            const data = await response.json();
            const fetchedRecipe = data['message'];
            setRecipe(fetchedRecipe);
        } catch (error) {
            console.log("Error: ", error);
        } finally {
            setLoading(false);
        }
        console.log(recipe);
    }

    var ingredientsList = ingredients.map(x => <li className="list-item">{x}</li>)
    function showIngredientsSection() {
        return ingredientsList.length > 0 ? true : false
    }

    function showGetRecipe() {
        return ingredientsList.length > 3 ? true : false
    }
    const loadingTemplate = (<div className="loading-container">
        <div className="loading"></div>
    </div>)

    function scrollToBottom() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }

    function showRecipe() {
        const structured = recipe.split(/\d+\.\s/).filter(step => step.trim() !== "");
        const heading = structured[0].replace(/^#+/, "");
        const headingTag = <h2 className="recipe-heading">{heading}</h2>
        structured.shift();
        const recipe_steps = structured.map(step => <li>{step}</li>)
        return (
            <div className="recipe-container">
                {headingTag}
                <ol>
                    {recipe_steps}
                </ol>
            </div>
        )
    }

    return (
        <main>
            <form className="form" onSubmit={FormSubmit}>
                <input type="text" id="input" aria-label="Add Ingredient" placeholder="e.g. oregano" name="ingredient" />
                <button>Add Ingredient</button>
            </form>
            {showIngredientsSection() && (
                <section className="ingredients-section">
                    <h2 className="heading">Ingredients on hand:</h2>
                    <ul className="ingredients-list">
                        {ingredientsList}
                    </ul>
                    {loading ? (
                        loadingTemplate
                    ) : (
                        recipe ? showRecipe() : (
                            showGetRecipe() && (  // ✅ No extra `{}` around the condition
                                <div className="get-recipe">
                                    <div className="get-recipe-text">
                                        <h3>Ready for a recipe?</h3>
                                        <p>Generate a recipe from your list of Ingredients</p>
                                    </div>
                                    <div className="get-recipe-btn">
                                        <button onClick={fetchRecipe}>Get a recipe</button>
                                    </div>
                                </div>
                            )
                        )
                    )}
                </section>
            )}


        </main>
    )
}
