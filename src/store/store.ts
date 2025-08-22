import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import favoriteReducer from "./favorite/favoriteSlice";
import locationsReducer from "./locations/locationsSlice";
import campersReducer from "./campers/campersSlice";
import filtersReducer from "./filtersSlice/filtersSlice";

const persistConfig = {
  key: "TravelTrucks",
  version: 1,
  storage,
  blacklist: ["filters"],
};

const rootReducer = {
  favorite: favoriteReducer,
  locations: locationsReducer,
  campers: campersReducer,
  filters: filtersReducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
