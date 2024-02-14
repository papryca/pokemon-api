import Item from "../pokemon-item/pokemon-item";
import styles from './list-item.module.scss'
import {IPokemon} from "../../interfaces/pokemon";
import {Modal} from "@mui/material";
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import {useState} from "react";

interface ListItemProps {
  pokemons: IPokemon[]
}

const ListItem = ({pokemons}: ListItemProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [abilityName, setAbilityName] = useState([]);
  const [height, setHeight] = useState(0);
  const [id, setId] = useState(0);
  const [weight, setWeight] = useState(0);
  const openModal = (url: string) => {
    fetch(url ?? '').then(function (response) {
      return response.json();
    }).then(function (result) {
      setAbilityName(result.abilities);
      setHeight(result.height)
      setId(result.id)
      setWeight(result.weight)
      setModalOpen(true);
      console.log(result)
    })
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.pokemons}>
        {pokemons.map((pokemon, index) => (
          <Item key={index} {...pokemon} onClick={() => openModal(pokemon.url)}/>
        ))}
      </div>
      <div>
          <Modal
            open={isModalOpen}
            onClose={closeModal}
            className={styles.modal}
          >
            <div className={styles.container}>
              <div className={styles.cross}>
                <CloseTwoToneIcon
                  fontSize="large"
                  className={styles.close}
                  onClick={closeModal}
                />
              </div>

              <div>
                <p className={styles.abilities}>Abilities: </p>
                {abilityName.map((value, index) => (
                    <div key={index}>- {value.ability.name}</div>
                ))}
                <p className={styles.abilities}>Height: </p>
                  <span>- {height}</span>
                <p className={styles.abilities}>Id: </p>
                  <span>- {id}</span>
                <p className={styles.abilities}>Weight: </p>
                  <span>- {weight}</span>
              </div>
            </div>
          </Modal>
      </div>
    </>
  );
}
export default ListItem;
