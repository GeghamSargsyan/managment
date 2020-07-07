import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getFirebase } from "react-redux-firebase";
import rootReducer from "./reducers";

// Note: this API requires redux@>=3.1.0
const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk.withExtraArgument(getFirebase)))
);

export default store;
