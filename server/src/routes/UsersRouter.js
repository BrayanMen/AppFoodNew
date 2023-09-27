const { Router } = require('express')
const router = Router();
const {
    registerUser,
    loginUser,
    updateUserProfile, 
    deleteUserProfile,
    changeUserPassword,
    getLikesRecipes,
    addLikedRecipes,
    deleteLikerecipes,
    getUsers,
    deleteUser} = require('../Controllers/UserController');
const { protect, admin } = require('../Middlewares/Auth');

// Public
router.post('/', registerUser);
router.post('/login', loginUser);

//Private
router.put('/', protect, updateUserProfile);
router.put('/password', protect, changeUserPassword);
router.delete('/', protect, deleteUserProfile);

router.get('/favorites', protect, getLikesRecipes);
router.post('/favorites', protect, addLikedRecipes);
router.delete('/favorites', protect, deleteLikerecipes);

//ADMIN
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, deleteUser);


module.exports = router;