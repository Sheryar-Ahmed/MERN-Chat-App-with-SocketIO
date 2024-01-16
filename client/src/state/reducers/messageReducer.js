
import { GET_ALL_MESSAGES_FAIL, GET_ALL_MESSAGES_REQUEST, GET_ALL_MESSAGES_SUCCESS, SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from '../constants/messageConstants';

export const messageSendReducer = (state = { message: {} }, action) => {
    switch (action.type) {
        case SEND_MESSAGE_REQUEST:
            return {
                loading: true,
                message: {},
            };
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
                error: null,
            };
        case SEND_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                message: {},
                error: action.payload
            };
        default:
            return state;
    }
};

export const getAllMessagesReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case GET_ALL_MESSAGES_REQUEST:
            return {
                loading: true,
                messages: [],
            };
        case GET_ALL_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.payload,
                error: null,
            };
        case GET_ALL_MESSAGES_FAIL:
            return {
                ...state,
                loading: false,
                messages: [],
                error: action.payload
            };
        default:
            return state;
    }
};
