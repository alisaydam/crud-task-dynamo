import { createStore, combineReducers } from "redux";
import {
  selectedCurrency,
  categoryReducer,
  cartReducer,
} from "./reducers/reducer";

export const rootReducer = combineReducers({
  selectedCurrency,
  category: categoryReducer,
  cartStore: cartReducer,
});

export const store = createStore(rootReducer);
