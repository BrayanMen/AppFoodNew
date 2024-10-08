const mongoose = require("mongoose");
const Diet = require("../Models/DietModel");
const Recipe = require("../Models/RecipesModel");
const { getAllInfo, getIdInfoDb, getIdInfoApi, formatDiets } = require("../helpers");
const asyncHandler = require("express-async-handler");
//Public
//GETS "/RECIPES"
const getAllRecipes = asyncHandler(async (req, res, next) => {
    try {
        const { name, healthScore } = req.query;
        const filter = {};

        if (name) {
            filter.name = { $regex: new RegExp(name, "i") };
        }

        if (healthScore) {
            filter.health_score = healthScore;
        }

        const filteredData = await Recipe.find(filter);

        if (filteredData.length > 0) {
            return res.status(200).send(filteredData);
        } else {
            return res.status(404).send('Receta no encontrada');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
})
// "/RECIPES/:ID"
const getRecipeById = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;

        if (mongoose.Types.ObjectId.isValid(id)) {
            // Búsqueda en la base de datos
            const idDb = await getIdInfoDb(id);

            if (idDb) {
                return res.status(200).json(idDb);
            }
        }

        // Búsqueda en la API externa
        const idApi = await getIdInfoApi(id);

        if (idApi.data.id) {
            const recipeDetail = {
                id: idApi.data.id,
                name: idApi.data.title,
                image: idApi.data.image,
                summary: idApi.data.summary,
                diets: idApi.data.diets.map(diet => diet[0].toUpperCase() + diet.slice(1)),
                health_score: idApi.data.healthScore,
                step_by_step: idApi.data.analyzedInstructions[0]?.steps.map((paso) => paso.step),
            };

            return res.status(200).json(recipeDetail);
        } else {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
})

//GET "/RECIPE/RATED/TOP"
const getTopRecipes = asyncHandler(async (req, res, next) => {
    try {
        const recetasTop = await Recipe.find({}).sort({ 'reviews.rating': -1 }).limit(5); // Obtener las 5 recetas mejor valoradas basadas en reviews.rating

        if (recetasTop.length > 0) {
            return res.status(200).json(recetasTop);
        } else {
            return res.status(404).json({ message: 'No se encontraron recetas mejor valoradas' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

//GET "/RECIPE/RANDOM/all"
const getRandomRecipes = asyncHandler(async (req, res, next) => {
    try {
        const recipesRandom = await Recipe.aggregate([
            { $sample: { size: 5 } } // Obtener 5 recetas aleatorias
        ]);

        if (recipesRandom.length > 0) {
            return res.status(200).json(recipesRandom);
        } else {
            return res.status(404).json({ message: 'No se encontraron recetas aleatorias' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

//Private
//POST  protect "/RECIPE"
const createNewRecipe = asyncHandler(async (req, res, next) => {
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

        const recipeIds = req.recipe ? [req.recipe._id, req.recipe.id] : [];
        const recipeExist = await Recipe.findOne({
            $or: [
                { name },
                { _id: { $in: recipeIds } }
            ]
        });

        if (recipeExist) {
            res.status(400).send({ message: 'Ya existe esta receta' });
        }

        const newRecipes = Recipe.create({
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
                if (existingDiet) {
                    dietIds.push(existingDiet._id);
                } else {
                    console.log(`La dieta "${dietName}" no existe en la base de datos.`);
                }
            }
            newRecipes.diets = dietIds;
        }

        const recipeNew = (await newRecipes).save();

        if (recipeNew) {
            res.status(201).json({
                _id: recipeNew._id,
                name: recipeNew.name,
                summary: recipeNew.summary,
                image: recipeNew.image,
                health_score: recipeNew.health_score,
                step_by_step: recipeNew.step_by_step,
                createdInDb: recipeNew.createdInDb,
            });
        } else {
            return res.status(400).json({ message: 'Receta Invalida' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
})
//PUT  protect "/RECIPE/EDIT"
const editRecipe = asyncHandler(async (req, res, next) => {
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
});

//DELETE protect "/RECIPE"
const deleteRecipeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    try {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const recipeDelete = await Recipe.findById(id).exec();

            if (!recipeDelete) {
                return res.status(404).json({ message: 'Receta no encontrada' });
            }

            if (req.user.isAdmin || recipeDelete.createdBy.equals(userId)) {
                await recipeDelete.deleteOne();
                return res.status(200).json({ message: 'Receta eliminada correctamente' });
            } else {
                return res.status(403).json({ message: 'No tienes permiso para eliminar esta receta' });
            }
        } else {
            return res.status(400).json({ message: 'ID de receta no válido' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

//POST PROTECT /REVIEWS
const createReviewRecipe = asyncHandler(async (req, res) => {
    const { _id, id } = req.params;
    if(!_id && !id){
        return res.status(400).send('ID is required')
    }
    const {rating, comment} = req.body;
    try {
        const recipeReview = await Recipe.findById(_id || id);
        if (recipeReview) {
            const alreadyReview = recipeReview.reviews.find(
                (r) => r.userId.toString() === req.user._id.toString()
            );
            if (alreadyReview) {
                res.status(400).json('You already reviews this recipe')
            }
            const review = {
                userName: req.user.fullName,
                userImage: req.user.image,
                userId: req.user._id,
                rating: Number(rating),
                comment,
            }
            recipeReview.reviews.push(review)
            recipeReview.numberOfReview = recipeReview.reviews.length
            
            recipeReview.rate =
            recipeReview.reviews.reduce((acum, item)=> item.rating + acum, 0) /
            recipeReview.reviews.length;

            await recipeReview.save();
            
            res.status(201).send('Review Added')
        } else {
            res.status(404).send('Movie not found');
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = {
    getAllRecipes,
    getRecipeById,
    createNewRecipe,
    editRecipe,
    deleteRecipeById,
    getTopRecipes,
    getRandomRecipes,
    createReviewRecipe,
}