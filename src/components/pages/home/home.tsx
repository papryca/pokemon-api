import Button from "../../button/button";
import Input from "../../input/input";
import ListItem from "../../list-item/list-item";
import {useEffect, useState} from "react";
import styles from "./home.module.scss";
import {IPokemon} from "../../../interfaces/pokemon";
import {useParams} from "react-router-dom";
import {getPokemons, Response} from "../../servises/getPockemons";
import ItemPerPage from "../../item-per-page/item-per-page";
import {useHttp} from "../../servises/http-hook";
import {ButtonVariant} from "../../../interfaces/button";
import Header from "../../header/header";
import Loader from "../../loader/loader";

const Home = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentInputValue, setCurrentInputValue] = useState<string>('');
  const [filteredPokemons, setFilteredPokemons] = useState<IPokemon[]>([]);
  const [pokemonsOnThePage, setPokemonsOnThePage] = useState(10);
  const [pokemonsQuantity, setPokemonsQuantity] = useState(0);
  const {request, loading} = useHttp();

  const {page} = useParams();
  const [pageValue, setPageValue] = useState(Number(page) || 1);

  const updateHistory = (value: string) => {
    const updatedHistory = [...history, value];
    setHistory(updatedHistory);
    let storageHistory = JSON.stringify(updatedHistory);
    localStorage.setItem("history", storageHistory);
  }

  const update = async () => {
    const offset = (pageValue - 1) * pokemonsOnThePage;
    let pokemons: IPokemon[] = [];
    let totalLength: number = 0;
    let quantity: number = 0;

    const input = inputValue.trim();

    try {
      let limit = pokemonsOnThePage;
      if (input !== "") {
        const countResponse = await request(`https://pokeapi.co/api/v2/pokemon`, "GET");
        limit = countResponse.count;
      }

      const params = new URLSearchParams({limit: limit.toString(), offset: offset.toString()});
      const requestUrl = `https://pokeapi.co/api/v2/pokemon?${params.toString()}`;
      const response = await request(requestUrl, "GET");

      pokemons = response.results;
      totalLength = response.count;

      if (input !== "") {
        pokemons = pokemons.filter(
          (pokemon: IPokemon) => pokemon.name.includes(input.toLowerCase())
        )
        totalLength = pokemons.length;
        pokemons = pokemons.slice(offset, pageValue * pokemonsOnThePage);

        updateHistory(inputValue);
        if (input !== currentInputValue) {
          setCurrentInputValue(inputValue);
          setPageValue(1);
        }
      }

      quantity = totalLength / pokemonsOnThePage;
      if (totalLength % pokemonsOnThePage > 0) {
        quantity = quantity + 1;
      }
    } catch (error) {
      console.error("Error fetching count:", error);
    }

    setPokemonsQuantity(quantity);
    setFilteredPokemons(pokemons);
  }

  useEffect(() => {
    update().catch()
  }, [page, pageValue, pokemonsOnThePage, pokemonsQuantity]);
  const handleReset = () => {
    setInputValue('');
    setPageValue(1);
    setPokemonsQuantity(0);
  }

  const handlePage = (direction: 'prev' | 'next') => {
    setPageValue(direction === 'prev' ? Math.max(pageValue - 1, 1) : pageValue + 1);
  }

  return (
    <div className={styles.main}>
      <Header/>
      <div className={styles.container}>
        <div className={styles.search}>
          <Input value={inputValue} setValue={setInputValue}></Input>
          <Button children='Search' onClick={update}/>
          <Button children='Reset' onClick={handleReset}/>
          <ItemPerPage onChange={(value) => {
            setPokemonsOnThePage(Number(value))
          }}></ItemPerPage>
        </div>
        {loading ? (
          <div className={styles.loader}>
            <Loader/>
          </div>
        ) : (
          <div className={styles.grid}>
            <ListItem pokemons={filteredPokemons}></ListItem>
          </div>
        )}
        <Button variant={ButtonVariant.round} children='<' onClick={() => handlePage('prev')}
                disabled={pageValue <= 1 || loading}></Button>
        <Button variant={ButtonVariant.round} children={pageValue}></Button>
        <Button children='>' variant={ButtonVariant.round} onClick={() => handlePage('next')}
                disabled={pageValue >= pokemonsQuantity - 1 || loading}></Button>
      </div>
      <div>

      </div>
    </div>

  )
}
export default Home;
