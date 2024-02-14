import {IPokemon} from "../../interfaces/pokemon";
import axios from "axios";

export interface Response<T> {
  count: number;
  next: string;
  prev: string;

  results: T
}

export const getPokemons = async (offset:number,pokemonsOnThePage:number):Promise<Response<IPokemon[]>> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
      params: {
        limit: pokemonsOnThePage,
        offset: offset,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while reaching pokemons:", error)
    throw error;
  }
}
export default getPokemons;
