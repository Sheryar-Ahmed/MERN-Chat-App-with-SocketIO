import { ACCESS_FAIL, ACCESS_REQUEST, ACCESS_SUCCESS, CHATS_FAIL, CHATS_REQUEST, CHATS_SUCCESS, USER_CHATS_SEARCH_FAIL, USER_CHATS_SEARCH_REQUEST, USER_CHATS_SEARCH_SUCCESS } from '../constants/chatConstant';

export const chatsReducers = (state = { chats: [] }, action) => {
    switch (action.type) {
        case CHATS_REQUEST:
            return {
                loading: true,
                chats: [],
            };
        case CHATS_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: action.payload
            };
        case CHATS_FAIL:
            return {
                ...state,
                loading: false,
                chats: [],
                error: action.payload
            };
        default:
            return state;
    }
};


export const chatUsersSearch = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_CHATS_SEARCH_REQUEST:
            return {
                loading: true,
                users: [],
            };
        case USER_CHATS_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        case USER_CHATS_SEARCH_FAIL:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            };
        default:
            return state;
    }
};


export const accessChatReducer = (state = { FullChat: [] }, action) => {
    switch (action.type) {
        case ACCESS_REQUEST:
            return {
                loading: true,
                FullChat: [],
            };
        case ACCESS_SUCCESS:
            return {
                ...state,
                loading: false,
                FullChat: action.payload
            };
        case ACCESS_FAIL:
            return {
                ...state,
                loading: false,
                FullChat: [],
                error: action.payload
            };
        default:
            return state;
    }
};
