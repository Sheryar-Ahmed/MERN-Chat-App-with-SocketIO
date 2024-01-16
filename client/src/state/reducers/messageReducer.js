
import { SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from '../constants/messageConstants';

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
