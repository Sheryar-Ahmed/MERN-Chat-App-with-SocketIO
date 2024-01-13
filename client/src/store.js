import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from "./state/reducers/userReducer";
import { accessChatReducer, chatUsersSearch, chatsReducers, createGroupChatReducer } from "./state/reducers/chatReducer";

const reducer = combineReducers({
    user: userReducer,
    chats: chatsReducers,
    searchUsers: chatUsersSearch,
    accessChat: accessChatReducer,
    creategroupChat: createGroupChatReducer
});


let intialState = {};
const middleware = [thunk];

export const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)));