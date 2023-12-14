import {
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    SET_OWNER_ACCOUNT
} from '../types';
import AuthService from '../services/AuthService';
import { getMenuGroupByRoleId } from './global/GlobalMenuGroupActions';

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
            dispatch({ type: LOGIN_SUCCESS, payload: token });
            if (_clearCredentials) {
                _clearCredentials();
            }
            //dispatch(getUser(token));
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
            return ;
        }
        dispatch({ type: SHOW_LOADER });
        console.log("token====", token)
        const user = await AuthService.getUser(token);
        console.log("user====", user)
        if (user) {
            dispatch({ type: GET_USER_SUCCESS, payload: user });
            dispatch({ type: SET_OWNER_ACCOUNT, payload: user.ownerId });
            dispatch(getMenuGroupByRoleId(user.userRole.id))
        } else{
            dispatch({ type: GET_USER_FAIL, payload: user });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_USER_FAIL, payload: null });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};
