import {Action, combineReducers} from "redux";
import {ADD,DELETE} from "./types";

function counterReducer(state=0, action:Action) {
    if (action.type ===  ADD){
        return state + 1
    }else if (action.type ===  DELETE) {
        return state - 1
    }
    return state

}

function favoritesReducer(state = [], action:Action) {
    switch (action.type) {
        case ADD:
            console.log(action);
            return [...state, action.payload];
        case DELETE:
            return state.filter((pokemon) => pokemon.pokemons !== action.payload.pokemons);
        default:
            return state;
    }
}
export const rootReducer = combineReducers({
    counter: counterReducer,
    favorites: favoritesReducer,
});


