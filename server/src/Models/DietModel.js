const mongoose = require('mongoose')

const DietSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
},
    {
        timestamps: false
    });

const Diet = mongoose.model('Diet', DietSchema)

module.exports = Diet;