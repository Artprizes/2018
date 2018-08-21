import { TOGGLE_SEARCH_BAR } from "../constants/constants";

export default (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SEARCH_BAR:
      return !state;

    default:
      return state;
  }
};
