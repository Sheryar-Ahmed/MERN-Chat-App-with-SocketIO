import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from "./state/reducers/userReducer";
import { SelectedChat, accessChatReducer, chatUsersSearch, chatsReducers, createGroupChatReducer, selectChatIDReducer } from "./state/reducers/chatReducer";
import { getAllMessagesReducer, messageSendReducer } from './state/reducers/messageReducer';
import { setNotificationReducer } from "./state/reducers/notification";

const reducer = combineReducers({
    user: userReducer,
    chats: chatsReducers,
    selectedChat: SelectedChat,
    searchUsers: chatUsersSearch,
    accessChat: accessChatReducer,
    creategroupChat: createGroupChatReducer,
    messageSend: messageSendReducer,
    allMessages: getAllMessagesReducer,
    notification: setNotificationReducer,
    selectChat: selectChatIDReducer
});


let intialState = {};
const middleware = [thunk];

export const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)));