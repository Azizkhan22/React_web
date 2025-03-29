const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

async function postIngredients (ingredients){
    const token = process.env.API_KEY ;
    const client = new OpenAI({
        baseURL: "https://models.inference.ai.azure.com",
        apiKey: token
      })
      
      const content = `give a recipe step by step with the ingredients mentioned\n ${ingredients} \n just give a heading in one line and the steps in each line`      

      const response = await client.chat.completions.create({
        messages: [
          { role:"system", content: "" },
          { role:"user", content: content }
        ],
        model: "gpt-4o",
        temperature: 1,
        max_tokens: 4096,
        top_p: 1
      })      
      return response.choices[0].message.content;      
}

module.exports = { postIngredients };