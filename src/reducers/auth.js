import {
  AUTH_SET_TOKEN,
  AUTH_DISCARD_TOKEN,
  AUTH_GET_TOKEN
} from "../constants/constants";

const initialState = {
  token: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    // saves the token into the state
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    // discards the current token (logout)
    case AUTH_DISCARD_TOKEN:
      return {};
    // saves the current user
    case AUTH_GET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    // as always, on default do nothing
    default:
      return state;
  }
}
