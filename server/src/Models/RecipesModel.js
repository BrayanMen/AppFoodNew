const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    summary: {
        type: String,
        require: true,
    },
    health_score: {
        type: Number,
        min: 0,
        max: 100,
        require: true,
    },
    step_by_step: [{
        type: String
    },],
    createdInDb: {
        type: Boolean,
        default: true,
        required: true,
    },
},
{
    timestamps :true ,
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;