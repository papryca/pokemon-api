import React, {useEffect, useState} from "react";
import styles from './pokemon-item.module.scss'
import Button from "../button/button";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import store from '../../createStore'
import {add, deleteLike} from "../../redux/actions";
import {IPokemon} from "../../interfaces/pokemon";
import {useSelector} from "react-redux";
import useHttp from "../servises/http-hook";

interface PokemonProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  name: string;
  url: string;
}

const Item: React.FC<PokemonProps> = ({name, url, ...props}) => {
  const favorites: IPokemon[] = useSelector(state => state.favorites);
  const { request } = useHttp();

  const [pokemons, setPokemons] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request(
          url ?? '',
          'GET',
          null,
          { 'Content-Type': 'application/json' }
        );
        setPokemons(data.sprites.front_default);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchData();
  }, [url]);


  const handleFavoriteClick = (isFavorite:boolean) => {
    if (isFavorite){
      store.dispatch(add({ name, pokemons, isFavorite:true }))
    }else {
      store.dispatch(deleteLike({ name, pokemons, isFavorite:false }))
    }

  };

  return (
    <div className={styles.pokemon}>
      <div>{name}</div>
      <div>
        {!favorites.find((item) => item.name === name) ? (
          <FavoriteTwoToneIcon
            style={{ color: 'gray' }}
            onClick={() => handleFavoriteClick(true)}
            className={styles.like}
          />
        ) : (
          <FavoriteTwoToneIcon
            style={{ color: '#D0644B' }}
            onClick={() => handleFavoriteClick(false)}
            className={styles.like}
          />
        )}
        <img src={pokemons ?? ''} alt={`Image of ${name}`} className={styles.image}/>
      </div>
      <Button style={{margin: '5px'}} children='Learn More' onClick={props.onClick}/>
    </div>
  );
}
export default Item;
