import * as actionTypes from "./actions";
import _ from "lodash";

const initialState = {
  isAuthenticated: false,
  username: "",
  isAuthChecked: false,
};

const setAuth = (state, value, payload) => {
  const newState = { ...state };
  newState.isAuthenticated = value;
  newState.isAuthChecked = true;
  newState.username = payload.username;
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH_TRUE:
      return setAuth(state, true, action.payload);
    case actionTypes.SET_AUTH_FALSE:
      return setAuth(state, false, { username: "" });
    default:
      return state;
  }
};

export default reducer;
