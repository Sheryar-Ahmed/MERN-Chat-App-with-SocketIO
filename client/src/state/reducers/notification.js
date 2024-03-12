import { SET_NOTIFICATION_REQUEST, SET_NOTIFICA_FAIL, SET_NOTIFICA_SUCCESS } from "../constants/notification";


export const setNotificationReducer = (state = { notification: [] }, action) => {
    switch (action.type) {
        case SET_NOTIFICATION_REQUEST:
            return {
                loading: true,
                notification: [],
            };
        case SET_NOTIFICA_SUCCESS:
            return {
                ...state,
                loading: false,
                notification: action.payload,
                error: null,
            };
        case SET_NOTIFICA_FAIL:
            return {
                ...state,
                loading: false,
                notification: [],
                error: action.payload
            };
        default:
            return state;
    }
};
