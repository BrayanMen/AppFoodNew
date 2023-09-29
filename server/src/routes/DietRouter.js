const {Router} = require('express');
const getDiets = require('../Controllers/DietController');
const router = Router();

router.get('/', getDiets)

module.exports = router;