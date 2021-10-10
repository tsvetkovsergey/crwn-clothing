// user.actions.js
// Create action-creator function
// This function just creates an object in the correct format

export const setCurrentUser = (user) => ({
  type: "SET_CURRENT_USER",
  payload: user,
});
