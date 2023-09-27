const { Router } = require('express')
const router = Router();
const {
    registerUser,
    loginUser,
    updateUserProfile, 
    deleteUserProfile} = require('../Controllers/UserController');
const { protect } = require('../Middlewares/Auth');

// Public
router.post('/', registerUser)
router.post('/login', loginUser)

//Private
router.put('/', protect, updateUserProfile)
router.delete('/', protect, deleteUserProfile)



module.exports = router;