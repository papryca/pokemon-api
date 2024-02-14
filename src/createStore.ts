import { createStore } from 'redux';
import {rootReducer} from './redux/rootReducer';

const store = createStore(rootReducer,{ counter: 0 });

export default store;
