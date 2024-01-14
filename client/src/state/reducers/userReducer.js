import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS
} from '../constants/userConstant';

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case USER_DETAILS_REQUEST:

            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        default:
            return state;
    }
};
