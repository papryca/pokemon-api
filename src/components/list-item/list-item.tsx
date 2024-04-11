import Item from "../pokemon-item/pokemon-item";
import styles from './list-item.module.scss'
import {IPokemon} from "../../interfaces/pokemon";
import {Modal} from "@mui/material";
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import {useState} from "react";
import useHttp from "../servises/http-hook";

interface ListItemProps {
  pokemons: IPokemon[]
}

interface ModelParams {
  url: string,
  name: string,
}

const ListItem = ({pokemons}: ListItemProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [abilityName, setAbilityName] = useState([]);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [name, setName] = useState('');
  const [sprite, setSprite] = useState('');
  const [types, setTypes] = useState([]);
  const {request} = useHttp();
  const openModal = async (params: ModelParams) => {
    try {
      const result = await request(params.url);
      const { abilities, height, weight } = result;
      setAbilityName(abilities);
      setHeight(height);
      setWeight(weight);
      setModalOpen(true);
      setName(params.name);
      setSprite(result.sprites.front_default)
      const pokemonInfo = await request(`https://pokeapi.co/api/v2/pokemon/${params.name}`, "GET");
      const types = pokemonInfo.types.map((type: { type: { name: string } }) => type.type.name);
      setTypes(types);
      console.log(types);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.pokemons}>
        {pokemons.map((pokemon, index) => (
          <Item key={index} {...pokemon} id={pokemon.id ?? ""} name={pokemon.name ?? ""} url={pokemon.url ?? ""}  onClick={() => openModal({
            url: pokemon.url ?? "",
            name: pokemon.name?? ""
          })}/>
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
                <div className={styles.flex}>
                  <div className={styles.flexName}>
                    <img src={sprite} className={styles.image} alt='pokemon image'/>
                    <h3>{name}</h3>
                  </div>
                  <div className={styles.flexAbility}>
                    {types.map((type, index) => (
                      <div key={index} style={{ backgroundColor: type === 'grass' ? '#a6f5a6' : type === 'poison' ? '#deb7be' : type === 'fire' ? "#f1b23d" : type === 'water' ? "#7070ef" : type === 'bug' ? "#c25959":  type === 'flying' ? "#a27aa2": type === 'normal' ? "rgba(197, 126, 63, 0.3)": type === 'electric' ? "#dcdc77": type === 'fairy' ? "#e368e3":"#232121" }} className={styles.type}>
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.flex}>
                  <div>
                    <p className={styles.abilities}>Abilities: </p>
                    {abilityName.map((value: { ability: { name: string } }, index) => (
                      <div key={index}>- {value.ability.name}</div>
                    ))}
                  </div>
                  <div>
                    <p className={styles.abilities}>Height: </p>
                    <span>- {height}</span>
                  </div>
                  <div>
                    <p className={styles.abilities}>Weight: </p>
                    <span>- {weight}</span>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
      </div>
    </>
  );
}
export default ListItem;
