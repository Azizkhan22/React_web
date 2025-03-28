import { useState } from "react";
export default function Main() {

    const [ingredients, setIngredients] = useState([])

    function FormSubmit(event) {
        event.preventDefault();
        const formdata = new FormData(event.currentTarget)
        const ingredient = formdata.get("ingredient")
        setIngredients(prev => [...prev, ingredient])
    }

    var ingredientsList = ingredients.map(x => <li>{x}</li>)
    function showIngredientsSection() {
        return ingredientsList.length > 0 ? true : false
    }

    function showGetRecipe(){
        return ingredientsList.length > 3 ? true : false
    }
    return (
        <main>
            <form className="form" onSubmit={FormSubmit}>
                <input type="text" aria-label="Add Ingredient" placeholder="e.g. oregano" name="ingredient" />
                <button>Add Ingredient</button>
            </form>
            { showIngredientsSection() && <section className="ingredients-section">
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list">
                    {ingredientsList}
                </ul>
                { showGetRecipe() && <div className="get-recipe">
                    <div className="get-recipe-text">
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of Ingredients</p>
                    </div>
                    <div className="get-recipe-btn">
                        <button>Get a recipe</button>
                    </div>
                </div>}
            </section>}

        </main>
    )
}
