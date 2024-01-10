import { CHATS_FAIL, CHATS_REQUEST, CHATS_SUCCESS } from '../constants/chatConstant';

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
