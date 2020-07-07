import { combineReducers } from "redux";
import { loadingReducer as loading } from "./loadingReducer";
import { loginReducer as user } from "./LoginReducer";
import { driversInfoReducer as drivers } from "./driversInfoReducer";

const rootReducer = combineReducers({ user, drivers, loading });

export default rootReducer;
