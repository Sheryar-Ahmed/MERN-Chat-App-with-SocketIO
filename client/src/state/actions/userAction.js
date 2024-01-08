import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants/userConstant';
import { loginURL } from '../../utils/requestUrls';
import buildClient from '../../utils/requestUrls';

export const userLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json", 'access-control-allow-credentials': true }, withCredentials: true };
        console.log("called");
        const { data } = await buildClient().post(loginURL, { email, password }, config);
        dispatch({ type: LOGIN_SUCCESS, payload: data.user })
    } catch (error) {
        console.log("error during login", error);
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
};