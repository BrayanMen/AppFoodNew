import { GET_RECIPES } from "../actions/actions";

const initialState = {
    recipes: [],
    copyRecipes: [],
    details: [],
    diets: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES: {
            return{
                ...state,
                recipes: action.payload,
                copyRecipes: action.payload,
                details: []
            }}
        default:
            return state;
    }
}

export default rootReducer;