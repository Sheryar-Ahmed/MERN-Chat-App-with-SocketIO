import { CHATS_FAIL, CHATS_REQUEST, CHATS_SUCCESS } from '../constants/chatConstant';
import { chatUrl } from '../../utils/requestUrls';
import buildClient from '../../utils/requestUrls';

export const userChatList = ({ email, password, onSuccess, onFail }) => async (dispatch) => {
    try {
        dispatch({ type: CHATS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                'access-control-allow-credentials': true
            },
            withCredentials: true
        };

        const { data } = await buildClient().get(chatUrl, { email, password }, config);
        console.log("data", data)
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