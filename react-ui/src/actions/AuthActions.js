import {
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    SET_OWNER_ACCOUNT,
    GET_USER_MENU_GROUP_LIST_SUCCESS,
    SET_USER_ACCOUNT
} from '../types';
import AuthService from '../services/AuthService';

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
            dispatch({ type: LOGIN_SUCCESS, payload: token.data.token });
            if (_clearCredentials) {
                _clearCredentials();
            }
            dispatch(getUser(token.data.token));
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        let msg=error.error? error.error.message: "";
        dispatch({ type: LOGIN_FAIL, payload: msg });
        dispatch({ type: REMOVE_LOADER });
    }
};



// Action creator for logging out the user.
export const logout = () => {
    return { type: LOGOUT_SUCCESS };
};


/**
 * User Action - For logging user into the system.
 *
 * @param {Object} param0
 * @param {Function} _clearCredentials
 */
export const getUser = (token) => async dispatch => {
    try {
        if(!token){
           // dispatch({ type: LOGOUT_SUCCESS, payload: null });
            return ;
        }
        dispatch({ type: SHOW_LOADER });
        dispatch({ type: GET_USER_MENU_GROUP_LIST_SUCCESS, payload: []});
        const user = await AuthService.getUser(token);
        if (user) {
            dispatch({ type: GET_USER_SUCCESS, payload: user });
            dispatch({ type: SET_OWNER_ACCOUNT, payload: user.ownerId });
            dispatch({ type: SET_USER_ACCOUNT, payload: user.id });
            dispatch({ type: GET_USER_MENU_GROUP_LIST_SUCCESS, payload: user.userRole.roleMenuGroups });
        } else{
            dispatch({ type: GET_USER_FAIL, payload: user });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_USER_FAIL, payload: null });
        dispatch({ type: LOGOUT_SUCCESS, payload: null });
        dispatch({ type: LOGIN_FAIL, payload: null });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};
