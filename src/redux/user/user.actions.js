// user.actions.js
// Create action-creator function
// This function just creates an object in the correct format

import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
