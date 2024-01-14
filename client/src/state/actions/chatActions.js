import { ACCESS_FAIL, ACCESS_REQUEST, ACCESS_SUCCESS, CHATS_FAIL, CHATS_REQUEST, CHATS_SUCCESS, CREATE_GROUP_CHAT_FAIL, CREATE_GROUP_CHAT_REQUEST, CREATE_GROUP_CHAT_SUCCESS, SELECTED_CHAT_FAIL, SELECTED_CHAT_REQUEST, SELECTED_CHAT_SUCCESS, USER_CHATS_SEARCH_FAIL, USER_CHATS_SEARCH_REQUEST, USER_CHATS_SEARCH_SUCCESS } from '../constants/chatConstant';
import { accessChatUrl, addMembersToGroupURL, chatSearchUserUrl, chatUrl, createGroupChatURL, removeFromGroupURL, renameGroupURL } from '../../utils/requestUrls';
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

        const { data } = await buildClient().post(accessChatUrl, { userId }, config);
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


export const selectedChatAction = ({ chatId, chats, onSuccess, onFail }) => async (dispatch) => {
    try {
        dispatch({ type: SELECTED_CHAT_REQUEST });

        // Find the chat with the specified chatId
        const selectedChat = chats.find(chat => chat._id === chatId);

        if (!selectedChat) {
            // If chat is not found, handle the error
            throw new Error("Chat not found");
        }

        // Assuming data.groupChat is a placeholder, modify it based on your actual data structure
        dispatch({ type: SELECTED_CHAT_SUCCESS, payload: selectedChat });

        // Call the onSuccess callback if provided
        if (onSuccess) {
            onSuccess(selectedChat);
        }
    } catch (error) {
        console.log("Error during selection of chat", error);
        const errorMessage = error.message || "An error occurred";

        dispatch({ type: SELECTED_CHAT_FAIL, payload: errorMessage });

        // Call the onFail callback if provided
        if (onFail) {
            onFail(errorMessage);
        }
    }
};


export const AddNewMembersToGroupAction = ({ groupInfo, currentUserId, chatId, userId, onSuccess, onFail }) => async (dispatch) => {
    try {
        if (groupInfo.groupAdmin._id !== currentUserId) {
            throw new Error("only admins can add to group.");
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                'access-control-allow-credentials': true
            },
            withCredentials: true
        };
        const { data } = await buildClient().post(addMembersToGroupURL, { chatId, userId }, config);
        console.log("user added to group", data)
        // Call the onSuccess callback if provided
        if (onSuccess) {
            onSuccess(data);
        }
    } catch (error) {
        console.log("error during addition of group member", error);
        const errorMessage = error?.response?.data?.errors?.length > 0
            ? error?.response?.data?.errors[0]
            : error?.response?.data?.message;

        // Call the onFail callback if provided
        if (onFail) {
            onFail(errorMessage);
        }
    }
};


export const removeFromGroup = ({ groupInfo, currentUserId, chatId, userId, onSuccess, onFail }) => async (dispatch) => {
    try {
        if (groupInfo.groupAdmin._id !== currentUserId && userId !== currentUserId) {
            throw new Error("only admins can remove.");
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                'access-control-allow-credentials': true
            },
            withCredentials: true
        };
        const { data } = await buildClient().delete(`${removeFromGroupURL}/${chatId}/${userId}`, config);
        console.log("user removed from group", data)
        // Call the onSuccess callback if provided
        if (onSuccess) {
            onSuccess(data);
        }
    } catch (error) {
        console.log("error during deletion of group member", error);
        const errorMessage = error?.response?.data?.errors?.length > 0
            ? error?.response?.data?.errors[0]
            : error?.response?.data?.message;

        // Call the onFail callback if provided
        if (onFail) {
            onFail(errorMessage);
        }
    }
};

export const renameGroupName = ({ groupInfo, currentUserId, chatId, groupName, onSuccess, onFail }) => async (dispatch) => {
    try {
        if (groupInfo.groupAdmin._id !== currentUserId) {
            throw new Error("only admins can rename this group.");
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                'access-control-allow-credentials': true
            },
            withCredentials: true
        };
        const { data } = await buildClient().put(renameGroupURL, { chatId, groupName }, config);
        console.log("Group name updated", data)
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
        console.log("error during updation of group name", error);
        const errorMessage = error?.response?.data?.errors?.length > 0
            ? error?.response?.data?.errors[0]
            : error?.response?.data?.message;

        // Call the onFail callback if provided
        if (onFail) {
            onFail(errorMessage);
        }
    }
};



export const LeftGroupAction = ({ chatId, userId, onSuccess, onFail }) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'access-control-allow-credentials': true
            },
            withCredentials: true
        };
        const { data } = await buildClient().delete(`${removeFromGroupURL}/${chatId}/${userId}`, config);
        console.log("Left group", data);
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
        console.log("error during Left group", error);
        const errorMessage = error?.response?.data?.errors?.length > 0
            ? error?.response?.data?.errors[0]
            : error?.response?.data?.message;

        // Call the onFail callback if provided
        if (onFail) {
            onFail(errorMessage);
        }
    }
};