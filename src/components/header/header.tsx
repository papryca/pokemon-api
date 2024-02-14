import {Badge, Box, Toolbar, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import pokemon from "../../assets/pokemon.svg";
import styles from "../pages/home/home.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Header = () => {
  const num = useSelector((state) => state.counter);
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor: '#fff'}}>
        <Toolbar sx={{justifyContent: 'space-between'}}>
          <Link to="/">
            <Box>
              <img src={pokemon} className={styles.label} alt="Pokemon label"/>
            </Box>
          </Link>
          <Typography variant="h6" component="div" color="primary" sx={{fontWeight: 'bold'}}>
            <Link to="/myFavourite" className={styles.link}>My Favourite</Link>
            <Badge badgeContent={String(num)} color="secondary">
              <FavoriteIcon color="primary"/>
            </Badge>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );

}
export default Header;
