// root-reducer.js
// Represents all of the State of our application
// Combines all of our states together
import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";

export default combineReducers({
  user: userReducer,
});
