import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "../createStore.ts";
import {IPokemon} from "../interfaces/pokemon.ts";


interface PokemonState {
    counter: number;
    favorites: IPokemon[];
}

const initialPokemonState: PokemonState = {
    counter: 0,
    favorites: [],
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: initialPokemonState,
    reducers: {
        addFavorite(state, action: PayloadAction<IPokemon>) {
            state.favorites.push(action.payload);
            state.counter += 1;
        },
        removeFavorite(state, action: PayloadAction<IPokemon>) {
            state.favorites = state.favorites.filter(pokemon => pokemon.pokemons !== action.payload.pokemons);
            state.counter -= 1;
        },
    },
});

export const { addFavorite, removeFavorite } = pokemonSlice.actions;
export const selectCount = (state: RootState) => state.pokemon.counter;
export const selectFavorites = (state: RootState) => state.pokemon.favorites;

export default pokemonSlice.reducer

