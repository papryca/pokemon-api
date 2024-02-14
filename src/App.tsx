import './App.css';
import Home from "./components/pages/home/home";
import MyFavourite from "./components/pages/my-favourite/my-favourite";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import theme from "./constants/theme";
import {ThemeProvider} from "@mui/material";
import {Provider} from 'react-redux';
import store from './createStore'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home/:page" element={<Home/>}/>
            <Route path="/myFavourite" element={<MyFavourite/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
