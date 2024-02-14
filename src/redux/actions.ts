import {ADD,DELETE} from "./types";
import {IPokemon} from "../interfaces/pokemon";

export function add(p: { name: string; pokemons: string | null;isFavorite:boolean }) {
  return {
    type: ADD,
    payload: p,
  }
}
export function deleteLike(p: IPokemon) {
  return {
    type: DELETE,
    payload: p,
  }
}
