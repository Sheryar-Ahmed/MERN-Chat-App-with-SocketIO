import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import { userReducer } from "./state/reducers/userReducer";

const reducer = combineReducers({
    user: userReducer
});


let intialState = {};
const middleware = [thunk];

export const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)));