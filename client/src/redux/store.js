import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers/Main";
import {thunk} from "redux-thunk";

const Store = createStore(reducers,applyMiddleware(thunk));

export default Store;