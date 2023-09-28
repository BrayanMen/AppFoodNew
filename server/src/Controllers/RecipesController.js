require('dotenv').config();
const axios = require("axios");
const { API_KEY, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6 } = process.env;

const apiKeys = [API_KEY, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6 ];
let currentApiKeyIndex = 0; 

const getApiData = async () => {
    const currentApiKey = apiKeys[currentApiKeyIndex];
    try {
        const apiUri = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${currentApiKey}&number=100&addRecipeInformation=true`)
        const apiInfo = apiUri.data.results.map((r) => {
            return {
                name: r.title,
                image: r.image,
                summary: r.summary,
                diets: r.diets.map(diet => diet[0].toUpperCase() + diet.slice(1)).join(', '),
                health_score: r.healthScore,
                step_by_step: r.analyzedInstructions[0]?.steps.map((paso) => {paso.step}),
                diets: r.diets,
            }
        });
        return apiInfo
    } catch (error) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        res.status(400).json({ message: error.message })
    }
}