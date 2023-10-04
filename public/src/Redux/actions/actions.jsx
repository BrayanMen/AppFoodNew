import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";

export function getRecipes() {
    return async function (dispatch){
        let json = await axios.get('')
        return dispatch({type: GET_RECIPES, payload:json.data});
    };
}