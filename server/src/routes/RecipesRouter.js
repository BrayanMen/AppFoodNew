const { Router } = require('express');
const { 
    getAllRecipes, 
    getRecipeById, 
    createNewRecipe, 
    editRecipe,
    getTopRecipes,
    getRandomRecipes, 
    deleteRecipeById,
    createReviewRecipe, 
} = require('../Controllers/RecipesController');
const { protect } = require('../Middlewares/Auth');
const router = Router();

//PUBLIC
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.get('/random/all', getRandomRecipes);
router.get('/rated/top', getTopRecipes);

//PRIVATE
router.post('/create', protect, createNewRecipe);
router.post('/:id/reviews', protect, createReviewRecipe);
router.put('/edit/:id', protect, editRecipe);
router.delete('/:id', protect, deleteRecipeById);



module.exports = router;