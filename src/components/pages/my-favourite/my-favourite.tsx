import Header from "../../header/header";
import {useSelector} from "react-redux";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Button from "../../button/button";
import {IPokemon} from "../../../interfaces/pokemon";
import styles from '../../pokemon-item/pokemon-item.module.scss'
import store from "../../../createStore";
import {deleteLike} from "../../../redux/actions";

const MyFavourite = () => {
  const favorites: IPokemon[] = useSelector(state => state.favorites);
  const handleRemove = (item: IPokemon) => (
    store.dispatch(deleteLike(item))
  )

  return (
    <div className={styles.main}>
      <Header/>
      {favorites.length === 0 ? (
        <p className={styles.message}>No favorite Pokémons yet!</p>
      ) : (
        <div className={styles.pokemons}>
          {favorites.map((item, index) => (
            <div className={styles.pokemon} key={index}>
              <div>
                <div>{item.name}</div>
                <div>
                  <FavoriteTwoToneIcon
                    style={{color: '#D0644B'}}
                    className={styles.like}
                  />
                  <img src={item.pokemons ?? ''} alt={`Image of ${item.name}`} className={styles.image}/>
                </div>
                <Button style={{margin: '5px'}}>Learn More</Button>
              </div>
              <p className={styles.remove} onClick={() => handleRemove(item)}>Remove</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyFavourite;
