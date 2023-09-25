const { Router } = require('express')
const router = Router();
const {
    registerUser,
    loginUser,
    updateUserProfile } = require('../Controllers/UserController');
const { protect } = require('../Middlewares/Auth');

// Public
router.post('/', registerUser)
router.post('/login', loginUser)

//Private
router.put('/', protect, updateUserProfile)


module.exports = router;