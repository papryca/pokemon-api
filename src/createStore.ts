import pokemonReducer from './redux/rootReducer';
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { combineReducers} from "redux";

export const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

const persistConfig = {
  key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
export  default store;

