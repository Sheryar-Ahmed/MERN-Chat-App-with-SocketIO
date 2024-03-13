import { SET_NOTIFICATION_REQUEST, SET_NOTIFICA_FAIL, SET_NOTIFICA_SUCCESS, REMOVE_NOTIFICATIONS } from "../constants/notification";
// import { getAllMessagesAction } from "./chatActions";

export const setNotification = ({ newMessageReceived, notification, onSuccess, onFail }) => async (dispatch) => {
    try {
        dispatch({ type: SET_NOTIFICATION_REQUEST });
        dispatch({ type: SET_NOTIFICA_SUCCESS, payload: [newMessageReceived, ...notification] });


        // dispatch(getAllMessagesAction({
        //     chatId,
        //     onSuccess: (data) => {
        //         // Handle success logic, e.g., redirect or any other action
        //         console.log("get all messages data", data);
        //     },
        //     onFail: (errorMessage) => {
        //         // Handle failure logic, e.g., show an error message
        //         console.log(errorMessage)
        //     },
        // }))
        // Call the onSuccess callback if provided
        if (onSuccess) {
            onSuccess(newMessageReceived);
        }
    } catch (error) {
        console.log("Error during setting of notification", error);
        const errorMessage = error.message || "An error occurred";

        dispatch({ type: SET_NOTIFICA_FAIL, payload: errorMessage });

        // Call the onFail callback if provided
        if (onFail) {
            onFail(errorMessage);
        }
    }
};


export const removeNotifications = (chatId) => {
    return {
        type: REMOVE_NOTIFICATIONS,
        payload: chatId
    };
};