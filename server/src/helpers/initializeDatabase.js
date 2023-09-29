const Recipe = require("../Models/RecipesModel");
const { getApiData, getDbInfo } = require(".");

const fillDatabase = async () => {
    try {
        // Obtener datos de la API
        const apiData = await getApiData();

        // Obtener datos de DB
        const dbData = await getDbInfo();

        // Combinar datos de la API y DB
        const allData = apiData.concat(dbData);

        for (const data of allData) {
            const { name, image, summary, diets, health_score, step_by_step } = data;
            const existingRecipe = await Recipe.findOne({ name });

            if (!existingRecipe) {
                const newRecipe = new Recipe({
                    name,
                    image,
                    summary,
                    diets: diets.split(', ').map((diet) => diet.trim()),
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

module.exports= fillDatabase;