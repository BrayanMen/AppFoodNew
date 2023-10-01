const Recipe = require("../Models/RecipesModel");
const axios = require("axios");
const { getApiData, getDbInfo } = require(".");
const Diet = require("../Models/DietModel");
const { API_KEY, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6 } = process.env;

const apiKeys = [API_KEY5, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY, API_KEY6];
let currentApiKeyIndex = 0;

const fillDatabase = async () => {
    try {
        // Obtener datos de la API
        const apiData = await getApiData();

        // Obtener datos de DB
        const dbData = await getDbInfo();

        // Combinar datos de la API y DB
        const allData = apiData.concat(dbData);

        for (const data of allData) {
            const { id, name, image, summary,diets, health_score, step_by_step } = data;
            const existingRecipe = await Recipe.findById( _id || id );

            if (!existingRecipe) {
                const dietReferences = await Diet.find({ name: { $in: diets } });
                const newRecipe = new Recipe({
                    id,
                    name,
                    image,
                    summary,
                    diets: dietReferences,
                    health_score,
                    step_by_step,
                });
                await newRecipe.save();
            }
        }
        console.log('Base de datos llenada exitosamente.');
    } catch (error) {
        console.error('Error al llenar la base de datos:', error.message);
    }
};

const fillDietCollection = async (req, res) => {
    const currentApiKey = apiKeys[currentApiKeyIndex];
    try {
        // Obtener datos de la API
        const dietList = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${currentApiKey}&number=60&addRecipeInformation=true`
        );

        const dietsFromAPI = dietList.data?.results.map((d) => d.diets).flat(1);

        // Procesar y guardar en la base de datos solo las dietas que no existen aún
        for (const dietName of dietsFromAPI) {
            const existingDiet = await Diet.findOne({ name: dietName });

            if (!existingDiet) {
                const newDiet = new Diet({ name: dietName });
                await newDiet.save();
            }
        }

        console.log('Colección Diet llenada exitosamente.');
    } catch (err) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        console.error('Error al llenar la colección Diet:', err.message);
    }
};

const fetchDataAndFillDatabase = async () => {
    try {
        // Llenar colección Diet
        await fillDatabase();
        // Llenar modelos de recetas
        await fillDietCollection();

        console.log('Base de datos llenada exitosamente.');
    } catch (error) {
        console.error('Error al llenar la base de datos:', error.message);
    }
};

module.exports = {
    fillDatabase,
    fillDietCollection,
    fetchDataAndFillDatabase
};