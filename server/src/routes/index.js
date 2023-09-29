const {Router} = require('express');
const router = Router();
const userRouter = require('./UsersRouter');
const recipeRouter = require('./RecipesRouter');
const dietsRouter = require('./DietRouter');

router.get("/prueba", (req, res)=>{
       return res.status(200).send('Servidor funcionando...')
});

router.use('/log/users', userRouter);
router.use('/recipes', recipeRouter);
router.use('/diets', dietsRouter);



module.exports = router;