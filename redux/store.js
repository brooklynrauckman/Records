import { createStore } from "redux";
import recordsReducer from "./app/reducers";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, recordsReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
