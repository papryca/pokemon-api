import React, {useEffect, useState} from "react";
import styles from './pokemon-item.module.scss'
import Button from "../button/button";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import store from '../../createStore'
import {IPokemon} from "../../interfaces/pokemon";
import {useSelector} from "react-redux";
import useHttp from "../servises/http-hook";
import { selectFavorites} from "../../redux/rootReducer";
import {addFavorite, removeFavorite } from "../../redux/rootReducer.ts";

interface PokemonProps extends React.BaseHTMLAttributes<HTMLButtonElement> {
  id:string;
  name: string;
  url: string;
}

const Item: React.FC<PokemonProps> = ({id,name, url, ...props}) => {
  const favorites: IPokemon[] = useSelector(selectFavorites);
  console.log(favorites)
  const {request} = useHttp();

  const [pokemons, setPokemons] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request(
          url ?? '',
          'GET',
          null,
          {'Content-Type': 'application/json'}
        );
        setPokemons(data.sprites.front_default);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchData();
  }, [url]);


  const handleFavoriteClick = (isFavorite: boolean) => {
    if (isFavorite) {
      store.dispatch(addFavorite({id,name, pokemons, isFavorite: true}))
    } else {
      console.log(pokemons)
      store.dispatch(removeFavorite({pokemons}))
    }
  };

  return (
    <div className={styles.pokemon}>
      <div>{name}</div>
      <div>
        {Array.isArray(favorites) && !favorites.find((item) => item.name === name) ? (
          <FavoriteTwoToneIcon
            style={{color: 'gray'}}
            onClick={() => handleFavoriteClick(true)}
            className={styles.like}
          />
        ) : (
          <FavoriteTwoToneIcon
            style={{color: '#D0644B'}}
            onClick={() => handleFavoriteClick(false)}
            className={styles.like}
          />
        )}
        <img src={pokemons ?? ''} alt={`Image of ${name}`} className={styles.image}/>
      </div>
      <Button style={{margin: '0.5rem'}} children='Learn More' onClick={props.onClick}/>
    </div>
  );
}
export default Item;
