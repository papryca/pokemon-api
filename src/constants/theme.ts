import { createTheme } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {main: "#838080"},
    secondary: {
      main: "#D0644B",
    },
    info: {
      main: "#ffbe9d",
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;
