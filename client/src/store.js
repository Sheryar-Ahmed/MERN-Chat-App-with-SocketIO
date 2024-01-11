import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from "./state/reducers/userReducer";
import { chatUsersSearch, chatsReducers } from "./state/reducers/chatReducer";

const reducer = combineReducers({
    user: userReducer,
    chats: chatsReducers,
    searchUsers: chatUsersSearch
});


let intialState = {};
const middleware = [thunk];

export const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)));