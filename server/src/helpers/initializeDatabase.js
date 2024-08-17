const Recipe = require("../Models/RecipesModel");
const mongoose = require("mongoose");
const { getApiData, getDbInfo } = require(".");
const Diet = require("../Models/DietModel");


const fillDatabase = async () => {
    try {
        // Obtener datos de la API
        const apiData = await getApiData();

        // Obtener datos de DB
        const dbData = await getDbInfo();

        // Combinar datos de la API y DB
        const allData = apiData.concat(dbData);

        for (const data of allData) {
            const { id, name, image, summary, diets, health_score, step_by_step } = data;
            // const objectId = mongoose.Types.ObjectId(id);
            const existingRecipe = await Recipe.findOne({ name });

            if (!existingRecipe) {
                const existingRecipeByApiId = await Recipe.findOne({ id });

                if (!existingRecipeByApiId) {
                    const dietIds = [];

                    for (const dietName of diets) {
                        // Verificar si la dieta ya existe en la base de datos
                        const existingDiet = await Diet.findOne({ name: dietName });

                        if (existingDiet) {
                            // Asignar el ID existente de la dieta
                            dietIds.push(existingDiet._id);
                        } else {
                            // Crear una nueva dieta si no existe
                            const newDiet = new Diet({ name: dietName });
                            await newDiet.save();
                            dietIds.push(newDiet._id);
                        }
                    }


                    const newRecipe = new Recipe({
                        name,
                        image,
                        summary,
                        diets: dietIds,
                        health_score,
                        step_by_step,
                    });
                    await newRecipe.save();
                }
            }
        }
    } catch (error) {
        console.error('Error al llenar la base de datos:', error);
    }
};

// const fillDietCollection = async (req, res) => {
//     const currentApiKey = apiKeys[currentApiKeyIndex];
//     try {
//         // Obtener datos de la API
//         const dietList = await axios.get(
//             `https://api.spoonacular.com/recipes/complexSearch?apiKey=${currentApiKey}&number=60&addRecipeInformation=true`
//         );

//         const dietsFromAPI = dietList.data?.results.map((d) => d.diets).flat(1);

//         // Procesar y guardar en la base de datos solo las dietas que no existen aún
//         for (const dietName of dietsFromAPI) {
//             const existingDiet = await Diet.findOne({ name: dietName });

//             if (!existingDiet) {
//                 const newDiet = new Diet({ name: dietName });
//                 await newDiet.save();
//             }
//         }

//         console.log('Colección Diet llenada exitosamente.');
//     } catch (err) {
//         currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
//         console.error('Error al llenar la colección Diet:', err.message);
//     }
// };

const fetchDataAndFillDatabase = async () => {
    try {
        // Llenar colección Diet
        await fillDatabase();
        // Llenar modelos de recetas
        // await fillDietCollection();

        console.log('Base de datos llenada exitosamente.');
    } catch (error) {
        console.error('Error al llenar la base de datos:', error.message);
    }
};

module.exports = {
    // fillDatabase,
    // fillDietCollection,
    fetchDataAndFillDatabase
};