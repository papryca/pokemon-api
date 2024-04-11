import Header from "../../header/header";
import {useSelector} from "react-redux";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Button from "../../button/button";
import {IPokemon} from "../../../interfaces/pokemon";
import styles from '../../pokemon-item/pokemon-item.module.scss'
import store from "../../../createStore";
import {selectFavorites} from "../../../redux/rootReducer.ts";
import { removeFavorite } from "../../../redux/rootReducer.ts";

const MyFavourite = () => {
  const favorites: IPokemon[] = useSelector(selectFavorites);
  const handleRemove = (pokemons:string|null) => {
    store.dispatch(removeFavorite({pokemons}))
  }

  return (
    <div className={styles.main}>
      <Header/>
      {favorites.length === 0 ? (
        <p className={styles.message}>No favorite Pokémons yet!</p>
      ) : (
        <div className={styles.favouritePokemons}>
          {favorites.map((item, index) => (
            <div className={styles.pokemon} key={index}>
              <div>
                <div>{item.name}</div>
                <div>
                  <FavoriteTwoToneIcon
                    style={{color: '#D0644B'}}
                    className={styles.like}
                    fontSize={"large"}
                  />
                  <img src={item.pokemons ?? ''} alt={`Image of ${item.name}`} className={styles.image}/>
                </div>
                <Button style={{margin: '0.5rem'}}>Learn More</Button>
              </div>
              <p className={styles.remove} onClick={() => handleRemove(item.pokemons)}>Remove</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyFavourite;
