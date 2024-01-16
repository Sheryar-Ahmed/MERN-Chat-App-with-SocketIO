import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from "./state/reducers/userReducer";
import { SelectedChat, accessChatReducer, chatUsersSearch, chatsReducers, createGroupChatReducer } from "./state/reducers/chatReducer";
import { messageSendReducer } from './state/reducers/messageReducer';

const reducer = combineReducers({
    user: userReducer,
    chats: chatsReducers,
    selectedChat: SelectedChat,
    searchUsers: chatUsersSearch,
    accessChat: accessChatReducer,
    creategroupChat: createGroupChatReducer,
    messageSend: messageSendReducer
});


let intialState = {};
const middleware = [thunk];

export const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)));