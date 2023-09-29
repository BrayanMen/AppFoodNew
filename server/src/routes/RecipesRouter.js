const { Router } = require('express');
const { 
    getAllRecipes, 
    getRecipeById, 
    createNewRecipe, 
    editRecipe, 
    deleteRecipeById 
} = require('../Controllers/RecipesController');
const { protect } = require('../Middlewares/Auth');
const router = Router();

//PUBLIC
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);

//PRIVATE
router.post('/create', protect, createNewRecipe);
router.put('/edit/:id', protect, editRecipe);
router.delete('/:id', protect, deleteRecipeById)



module.exports = router;