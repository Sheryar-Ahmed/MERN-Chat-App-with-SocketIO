import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from '../constants/userConstant';
import { loginURL, registerURL, userDetailsURL } from '../../utils/requestUrls';
import buildClient from '../../utils/requestUrls';

export const userLogin = ({ email, password, onSuccess, onFail }) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'access-control-allow-credentials': true
      },
      withCredentials: true
    };

    const { data } = await buildClient().post(loginURL, { email, password }, config);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });

    // Call the onSuccess callback if provided
    if (onSuccess) {
      onSuccess(data);
    }
  } catch (error) {
    console.log("error during login", error);
    const errorMessage = error?.response?.data?.errors?.length > 0
      ? error?.response?.data?.errors[0]
      : error?.response?.data?.message;

    dispatch({ type: LOGIN_FAIL, payload: errorMessage });

    // Call the onFail callback if provided
    if (onFail) {
      onFail(errorMessage);
    }
  }
};


export const userRegister = ({ username, email, password, onSuccess, onFail }) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'access-control-allow-credentials': true
      },
      withCredentials: true
    };

    const { data } = await buildClient().post(registerURL, { username, email, password }, config);
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });

    // Call the onSuccess callback if provided
    if (onSuccess) {
      onSuccess(data);
    }
  } catch (error) {
    console.log("error during login", error);
    const errorMessage = error?.response?.data?.errors?.length > 0
      ? error?.response?.data?.errors[0]
      : error?.response?.data?.message;

    dispatch({ type: REGISTER_FAIL, payload: errorMessage });

    // Call the onFail callback if provided
    if (onFail) {
      onFail(errorMessage);
    }
  }
};



export const userDetails = ({onFail, onSuccess}) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'access-control-allow-credentials': true
      },
      withCredentials: true
    };

    const { data } = await buildClient().get(userDetailsURL, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.currentUser });

    // Call the onSuccess callback if provided
    if (onSuccess) {
      onSuccess(data);
    }
  } catch (error) {
    console.log("error during getting user details", error);
    const errorMessage = error?.response?.data?.errors?.length > 0
      ? error?.response?.data?.errors[0]
      : error?.response?.data?.message;

    dispatch({ type: USER_DETAILS_FAIL, payload: errorMessage });

    // Call the onFail callback if provided
    if (onFail) {
      onFail(errorMessage);
    }
  }
};