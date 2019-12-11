import { combineReducers } from "redux";
import employee from "./employee";
import company from "./company";

export default combineReducers({
  employee,
  company
});

