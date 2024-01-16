import buildClient, { sendMessageURL } from '../../utils/requestUrls';
import { SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from '../constants/messageConstants';


export const sendMessageAction = ({ chatId, content, onFail, onSuccess }) => async (dispatch) => {
    try {
        dispatch({ type: SEND_MESSAGE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                'access-control-allow-credentials': true
            },
            withCredentials: true
        };

        const { data } = await buildClient().post(sendMessageURL, { content, chatId }, config);
        dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data.currentUser });

        // Call the onSuccess callback if provided
        if (onSuccess) {
            onSuccess(data);
        }
    } catch (error) {
        console.log("error during sending message", error);
        const errorMessage = error?.response?.data?.errors?.length > 0
            ? error?.response?.data?.errors[0]
            : error?.response?.data?.message;

        dispatch({ type: SEND_MESSAGE_FAIL, payload: errorMessage });

        // Call the onFail callback if provided
        if (onFail) {
            onFail(errorMessage);
        }
    }
};