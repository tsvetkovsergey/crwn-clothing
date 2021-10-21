// root-reducer.js
// Represents all of the State of our application
// Combines all of our states together
import { combineReducers } from "redux";

// Allows us to persist reducers
import { persistReducer } from "redux-persist";

// Local Storage == window.localeStorage
import storage from "redux-persist/lib/storage";
// You can also use Session Storage
// (persist until you close browser tab)

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

// Object that contians configuration that we want
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

// Modified version of root reducer with persist capabilities
export default persistReducer(persistConfig, rootReducer);
