import { combineReducers } from "redux";
import { idTokenReducer } from "./idTokenReducer";
import { pollsDataReducer } from "./pollsDataReducer";
import { userProfileReducer } from "./userProfileReducer";

export const reducers = combineReducers({ idTokenReducer, pollsDataReducer, userProfileReducer });
