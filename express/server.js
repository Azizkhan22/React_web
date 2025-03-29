const express = require("express");  // Import Express
const app = express();  // Initialize Express
const { postIngredients } = require("./recipe.js");
const cors = require("cors");

const PORT = 3000;  // Define Port

// Middleware to parse JSON (Optional)
app.use(express.json());
app.use(cors()); 

// Simple Route
app.post("/getRecipe", async (req, res) => {
    const data = req.body;
    const ingredients = data['ingredients'];    
    const gptResponse = await postIngredients(ingredients);
    res.json({message : gptResponse});
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
