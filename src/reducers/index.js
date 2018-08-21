import { combineReducers } from "redux";

//import people from "./people";
import prizes from "./prizes";
import adverts from "./adverts";
import searchBar from "./search-bar";
import exhibitions from "./exhibitions";
import auth from "./auth";

const rootReducer = combineReducers({
  //people,
  searchBar,
  prizes,
  exhibitions,
  adverts,
  auth
});

export default rootReducer;
