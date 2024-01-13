import { ACCESS_FAIL, ACCESS_REQUEST, ACCESS_SUCCESS, CHATS_FAIL, CHATS_REQUEST, CHATS_SUCCESS, CREATE_GROUP_CHAT_FAIL, CREATE_GROUP_CHAT_REQUEST, CREATE_GROUP_CHAT_SUCCESS, USER_CHATS_SEARCH_FAIL, USER_CHATS_SEARCH_REQUEST, USER_CHATS_SEARCH_SUCCESS } from '../constants/chatConstant';
import { accessChatUrl, chatSearchUserUrl, chatUrl, createGroupChatURL } from '../../utils/requestUrls';
import buildClient from '../../utils/requestUrls';

export const userChatList = ({ onSuccess, onFail }) => async (dispatch) => {
    try {
        dispatch({ type: CHATS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                'access-control-allow-credentials': true
            },
            withCredentials: true
        };

        const { data } = await buildClient().get(chatUrl, config);
        console.log("user chats list data", data)
        dispatch({ type: CHATS_SUCCESS, payload: data.userChats });

        // Call the onSuccess callback if provided
        if (onSuccess) {
            onSuccess(data);
        }
    } catch (error) {
        console.log("error during chats", error);
        const errorMessage = error?.response?.data?.errors?.length > 0
            ? error?.response?.data?.errors[0]
            : error?.response?.data?.message;

        dispatch({ type: CHATS_FAIL, payload: errorMessage });

        // Call the onFail callback if provided
        if (onFail) {
            onFail(errorMessage);
        }
    }
};





export const userSearch = ({ keyword, onSuccess, onFail }) => async (dispatch) => {
    try {
        dispatch({ type: USER_CHATS_SEARCH_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                'access-control-allow-credentials': true
            },
            withCredentials: true
        };

        const { data } = await buildClient().get(`${chatSearchUserUrl}/?search=${keyword}`, config);
        console.log("data", data)
        dispatch({ type: USER_CHATS_SEARCH_SUCCESS, payload: data.users });

        // Call the onSuccess callback if provided
        if (onSuccess) {
            onSuccess(data);
        }
    } catch (error) {
        console.log("error during chats", error);
        const errorMessage = error?.response?.data?.errors?.length > 0
            ? error?.response?.data?.errors[0]
            : error?.response?.data?.message;

        dispatch({ type: USER_CHATS_SEARCH_FAIL, payload: errorMessage });

        // Call the onFail callback if provided
        if (onFail) {
            onFail(errorMessage);
        }
    }
};


export const accessChat = ({ userId, onSuccess, onFail }) => async (dispatch) => {
    try {
        dispatch({ type: ACCESS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                'access-control-allow-credentials': true
            },
            withCredentials: true
        };

        const { data } = await buildClient().get(accessChatUrl, { userId }, config);
        console.log("data", data)
        dispatch({ type: ACCESS_SUCCESS, payload: data.FullChat });

        // Call the onSuccess callback if provided
        if (onSuccess) {
            onSuccess(data);
        }
    } catch (error) {
        console.log("error during creationn of chats", error);
        const errorMessage = error?.response?.data?.errors?.length > 0
            ? error?.response?.data?.errors[0]
            : error?.response?.data?.message;

        dispatch({ type: ACCESS_FAIL, payload: errorMessage });

        // Call the onFail callback if provided
        if (onFail) {
            onFail(errorMessage);
        }
    }
};


export const createGroupChat = ({ groupName, users, onSuccess, onFail }) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_GROUP_CHAT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                'access-control-allow-credentials': true
            },
            withCredentials: true
        };
        users = users.map((user) => user.id);
        const { data } = await buildClient().post(createGroupChatURL, { groupName, users }, config);
        console.log("data", data)
        dispatch({ type: CREATE_GROUP_CHAT_SUCCESS, payload: data.groupChat });
        dispatch(userChatList({
            onSuccess: (data) => {
                // Handle success logic, e.g., redirect or any other action
                console.log(data);
            },
            onFail: (errorMessage) => {
                // Handle failure logic, e.g., show an error message
                console.log(errorMessage)
            },
        }))
        // Call the onSuccess callback if provided
        if (onSuccess) {
            onSuccess(data);
        }
    } catch (error) {
        console.log("error during creationn of group chats", error);
        const errorMessage = error?.response?.data?.errors?.length > 0
            ? error?.response?.data?.errors[0]
            : error?.response?.data?.message;

        dispatch({ type: CREATE_GROUP_CHAT_FAIL, payload: errorMessage });

        // Call the onFail callback if provided
        if (onFail) {
            onFail(errorMessage);
        }
    }
};