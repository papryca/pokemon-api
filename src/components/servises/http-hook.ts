// import {IPokemon} from "../../interfaces/pokemon";
// import axios from "axios";
import {useCallback, useState} from "react";
// export const getAllPokemons = async (): Promise<{ response: IPokemon[]; loading: boolean }> => {
//   const [loading, setLoading] =   useState(true);
//   const requiest =
//   try {
//     const countResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
//       params: {
//         limit: 1,
//       },
//     });
//
//     const totalCount = countResponse.data.count;
//
//     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
//       params: {
//         limit: totalCount,
//       },
//     });
//     setLoading(false);
//     return  response.data
//   } catch (error) {
//     setLoading(false);
//     console.error("Error while reaching all pokemons:", error);
//     throw error;
//   }
// };
// export default getAllPokemons;

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const request = useCallback(async (url:string, method = 'GET', body: string | null = null, headers: Record<string, string> = {}) => {
    setLoading(true);
    try {
      headers['Content-Type'] = 'application/JSON';
      if (body) {
        body = JSON.stringify(body);
      }

      const response = await fetch(url, {method, body, headers});
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }
      setLoading(false);
      return data
    } catch (e) {
      setLoading(false);
      throw e;
    }
  }, []);
  return {loading, request}
}
export default useHttp;
