const Diet = require("../Models/DietModel");

const getDiets = async (req, res, next) => {
    try {
        const diets = await Diet.find();
        if(diets){
            res.status(200).json(diets);
        }else{
            res.status(400).json('Dietas no encontradas');
        }
    } catch (error) {
        res.status(500).json({message: 'Problema del Servidor'});
    }
};

module.exports = getDiets;