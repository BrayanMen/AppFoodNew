const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userName: { type: String, require: true },
    userImage: { type: String, },
    rating: { type: Number, require: true },
    comment: { type: String, require: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }
},
    {
        timestamps: true,
    });

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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    diets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Diet',
        },
    ],
    numberOfReview: {
        type: Number,
        require: true,
        default: 0
    },
    reviews: [reviewSchema]
},
    {
        timestamps: true,
    });

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;