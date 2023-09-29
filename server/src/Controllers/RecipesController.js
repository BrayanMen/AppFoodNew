const Diet = require("../Models/DietModel");
const Recipe = require("../Models/RecipesModel");
const { getAllInfo, getIdInfoDb, getIdInfoApi, formatDiets } = require("../helpers");

//GETS "/RECIPES"
const getAllRecipes = async (req, res, next) => {
    try {
        const { name, healthScore } = req.query;
        const allInfo = await getAllInfo();

        if (!name && !healthScore) {
            return res.status(200).send(allInfo)
        }
        const filteredData = allInfo.filter((recipe) => {
            const lowerName = name ? name.toString().toLowerCase() : "";
            const matchName = name ? recipe.name.toLowerCase().includes(lowerName) : true;
            const matchHealthScore = healthScore ? recipe.health_score == healthScore : true;
            return matchName && matchHealthScore;
        });
        if (filteredData.length > 0) {
            return res.status(200).send(filteredData);
        } else {
            return res.status(404).send('Receta no encontrada');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}
// "/RECIPES/:ID"
const getRecipeById = async (req, res, next) => {
    try {
        const { id } = req.params

        if (id.length > 12) {
            const idDb = await getIdInfoDb(id);
            if (idDb) {
                res.status(200).send(idDb)
            } else {
                res.status(404).send({ message: "Error al obtener la receta" })
            }
        } else {
            const idApi = await getIdInfoApi(id);
            if (idApi.data.id) {
                const recipeDetail = {
                    id: idApi.data.id,
                    name: idApi.data.title,
                    image: idApi.data.image,
                    summary: idApi.data.summary,
                    diets: idApi.data.diets.map(diet => diet[0].toUpperCase() + diet.slice(1)).join(', '),
                    health_score: idApi.data.healthScore,
                    step_by_step: idApi.data.analyzedInstructions[0]?.steps.map((paso) => paso.step),
                }
                return res.status(200).json(recipeDetail);
            } else {
                return res.status(404).json({ message: 'Receta no encontrada' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
//POST  protect "/RECIPE"
const createNewRecipe = async (req, res, next) => {
    try {
        const {
            name,
            summary,
            image,
            health_score,
            step_by_step,
            createdInDb,
            diets,
        } = req.body;

        const createdBy = req.user._id;

        if (!name) {
            return res.status(400).json({ message: 'El nombre de la receta es obligatorio' });
        }
        if (!summary) {
            return res.status(400).json({ message: 'La reseña de la receta es obligatorio' });
        }

        const imageValidate = image || "https://static.educalingo.com/img/en/800/food.jpg";

        const recipeExist = await Recipe.findById({ $or: [{ name }, { _id: req.recipe._id || req.recipe.id }] })
        if (recipeExist) {
            res.status(400).send({ message: 'Ya existe esta receta' })
        }

        const newRecipes = new Recipe({
            name,
            summary,
            image: imageValidate,
            health_score,
            step_by_step,
            createdBy,
            createdInDb,
        });

        if (diets && diets.length > 0) {
            const dietIds = [];
            for (const dietName of diets) {
                const existingDiet = await Diet.findOne({ name: dietName });
                // let dietFormat = formatDiets(existingDiet)
                if (existingDiet) {
                    dietIds.push(existingDiet._id);
                } else {
                    console.log(`La dieta "${dietName}" no existe en la base de datos.`);
                }
            }
            newRecipes.diets = dietIds;
        }

        await newRecipes.save();

        if (newRecipes) {
            res.status(201).json({
                _id: newRecipes.id,
                name: newRecipes.name,
                summary: newRecipes.summary,
                image: newRecipes.image,
                health_score: newRecipes.health_score,
                step_by_step: newRecipes.step_by_step,
                createdInDb: newRecipes.createdInDb,
            })
        } else {
            return res.status(400).json({ message: 'Receta Invalida' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}
//PUT  protect "/RECIPE/EDIT"
const editRecipe = async (req, res, next) => {
    const { _id, id } = req.params;
    const {
        name,
        summary,
        image,
        health_score,
        step_by_step,
        createdInDb,
        diets,
    } = req.body;
    try {
        const recipeEdit = await Recipe.findById(_id || id);
        if (!recipeEdit) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        if (name) {
            recipeEdit.name = name;
        }
        if (summary) {
            recipeEdit.summary = summary;
        }
        if (image) {
            recipeEdit.image = image;
        }
        if (health_score !== undefined) {
            recipeEdit.health_score = health_score;
        }
        if (step_by_step) {
            recipeEdit.step_by_step = step_by_step;
        }
        if (createdInDb !== undefined) {
            recipeEdit.createdInDb = createdInDb;
        }
        if (diets && diets.length > 0) {
            const dietIds = [];
            for (const dietName of diets) {
                const existingDiet = await Diet.findOne({ name: dietName });
                if (existingDiet) {
                    dietIds.push(existingDiet._id);
                } else {
                    console.log(`La dieta "${dietName}" no existe en la base de datos.`);
                }
            }
            recipeEdit.diets = dietIds;
        }

        await recipeEdit.save();

        return res.status(200).json({ message: 'Receta actualizada correctamente', recipe: recipeEdit });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

//DELETE protect "/RECIPE"
const deleteRecipeById = async (req, res) => {
    const { _id, id } = req.params;
    const userId = req.user._id; 
    try {
        const recipeDelete = await Recipe.findOne({ $or: [{ _id }, { id }]});

        if(!recipeDelete){
            res.status(404).json({message: 'Receta no encontrada'});
        }

        // Verifica si el usuario es administrador o el creador de la receta
        if (req.user.isAdmin || recipeDelete.createdBy.equals(userId)) {
            await recipeDelete.remove();
            return res.status(200).json({ message: 'Receta eliminada correctamente' });
        } else {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta receta' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    createNewRecipe,
    editRecipe,
    deleteRecipeById,
}