require('dotenv').config()
const mongoose = require("mongoose");
const axios = require("axios");
const Recipe = require('../Models/RecipesModel');
const Diet = require('../Models/DietModel');
const { API_KEY, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6 } = process.env;

let apiKeys = [API_KEY6, API_KEY1, API_KEY2, API_KEY, API_KEY4, API_KEY5, API_KEY3];
let currentApiKeyIndex = 0;

const getApiData = async () => {
    const currentApiKey = apiKeys[currentApiKeyIndex];
    try {
        const apiUri = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${currentApiKey}&number=300&addRecipeInformation=true&instructionsRequired=true`)
        const apiInfo = apiUri.data.results.map((r) => {
            return {
                id: r.id,
                name: r.title,
                image: r.image,
                summary: r.summary,
                diets: r.diets.map(diet => diet[0].toUpperCase() + diet.slice(1)),
                health_score: r.healthScore,
                step_by_step: r.analyzedInstructions[0]?.steps.map((paso) => paso.step),
            }
        });
        return apiInfo
    } catch (error) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        throw new Error(error);
    }
}

const getDbInfo = async () => {
    try {
        const dbData = await Recipe.find().populate({
            path: 'diets',
            select: 'name',
            model: Diet,
        });
        const dbDataFormat = formatDiets(dbData)
        return dbDataFormat
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllInfo = async () => {
    try {
        const apiInfo = await getApiData();
        const dbInfo = await getDbInfo();
        const allInfo = apiInfo.concat(dbInfo);
        return allInfo;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getIdInfoApi = async (id) => {
    const currentApiKey = apiKeys[currentApiKeyIndex];
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${currentApiKey}`);
        return response;
    } catch (error) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        throw new Error(error.message);
    }
};

const getIdInfoDb = async (_id) => {
    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            // Realiza la búsqueda por _id
            const recipe = await Recipe.findById(_id).populate({
                path: 'diets',
                select: 'name',
                model: Diet,
            });
        
            if (recipe) {
                return recipe;
            } else {
             throw new Error({ message: 'Receta no encontrada' });
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

const formatDiets = (json) => {
    const dbInfoParsed = JSON.parse(JSON.stringify(json, null, 2))
    const dbInfoWithDiets = dbInfoParsed.map(r => {
        return {
            ...r,
            diets: r.diets.map(diet => diet.name[0].toUpperCase() + diet.name.slice(1)),
        }
    })
    return dbInfoWithDiets
}

module.exports = {
    getApiData,
    getDbInfo,
    getAllInfo,
    getIdInfoApi,
    getIdInfoDb,
    formatDiets,
};