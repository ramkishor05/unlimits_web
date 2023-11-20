import {
     USERNAME_CHANGED, PASSWORD_CHANGED,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    GET_USER_SUCCESS,
    GET_USER_FAIL
} from '../types';
import AuthService from '../services/AuthService';
export const usernameChanged = payload => ({type: USERNAME_CHANGED, payload});

export const passwordChanged = payload => ({type: PASSWORD_CHANGED, payload});

const API_TOKEN="api_token"

/**
 * User Action - For logging user into the system.
 *
 * @param {Object} param0
 * @param {Function} _clearCredentials
 */
export const login = ({ username, password }, _clearCredentials) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const token = await AuthService.generateToken({ username, password });
        if (token) {
            localStorage.setItem(API_TOKEN, token);

            if (localStorage.getItem(API_TOKEN)) {
                dispatch({ type: LOGIN_SUCCESS, payload: token });

                if (_clearCredentials) {
                    _clearCredentials();
                }
            }
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        localStorage.removeItem(API_TOKEN);
        let msg=error.error? error.error.message: "";
        dispatch({ type: LOGIN_FAIL, payload: msg });
        dispatch({ type: REMOVE_LOADER });
    }
};



// Action creator for logging out the user.
export const logout = () => {
    localStorage.removeItem(API_TOKEN);
    return { type: LOGOUT_SUCCESS };
};


/**
 * User Action - For logging user into the system.
 *
 * @param {Object} param0
 * @param {Function} _clearCredentials
 */
export const getUser = (token, _clearCredentials) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const user = await AuthService.getUser(token);

        if (user) {
            dispatch({ type: GET_USER_SUCCESS, payload: user });
        } else{
            dispatch({ type: GET_USER_FAIL, payload: user });
            localStorage.removeItem(API_TOKEN);
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        let msg=error.error? error.error.message: "";
        dispatch({ type: LOGIN_FAIL, payload: msg });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Function for parsing error gotten from server.
const parseError = error => {
    return error;
};