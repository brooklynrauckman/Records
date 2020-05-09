import { createStore } from "redux";
import recordsReducer from "./app/reducers";

const store = createStore(recordsReducer);

export { store };
