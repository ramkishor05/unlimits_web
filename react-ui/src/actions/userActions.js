import {
     USERNAME_CHANGED, PASSWORD_CHANGED,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER, GET_USERS_SUCCESS,
    GET_USER_SUCCESS, GET_ROLES_FAIL,
    USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    OPEN_ADD_USER_MODAL, OPEN_EDIT_USER_MODAL, OPEN_DELETE_USER_MODAL,USER_TO_EDIT
} from '../types';
import UserService from '../services/UserService';


/**
 * User Action - For adding a new user in the system.
 *
 * @param {Object} data
 * @param {Function} refresh
 * @param {Function} resetInput
 */
export const addUser = (data, refresh, resetInput) => async dispatch => {
    try {
        const user = await UserService.register(data);
        if (user) {
            if (refresh) {
                refresh();
            }

            if (resetInput) {
                resetInput();
            }
        }
    } catch (error) {
        console.log(error);
    }
};


/**
 * User Action - For updating the user details in the system.
 *
 * @param {Number} id
 * @param {Object} data
 * @param {Function} resetPassword
 */
export const updateUser = (id, data, resetPassword) => async dispatch => {
    try {
        const user = await UserService.update(id, data);

        if (user) {
            dispatch({ type: USER_UPDATE_SUCCESS, payload: user });

            if (resetPassword) {
                resetPassword();
            }
        }
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: parseError(error) });
        console.log(error);
    }
};

/**
 * User Action - For deleting a user from the system.
 *
 * @param {Number} id
 * @param {Function} refresh
 */
export const deleteUser = (id, refresh) => async dispatch => {
    try {
        const result = await UserService.delete(id);

        if (result) {
            if (refresh) {
                refresh();
            }
        }
    } catch (error) {
        console.log(error);
    }
};

// Action creator for getting all users.
export const getUsers = () => async dispatch => {
    try {
        const users = await UserService.getAll();

        if (users) {
            dispatch({ type: GET_USERS_SUCCESS, payload: users });
        }
    } catch (error) {
        console.log(error);
    }
};

// Action creator for opening the Add User modal.
export const openAddUserModal = payload => ({type: OPEN_ADD_USER_MODAL, payload });

// Action creator for opening the Edit User modal.
export const openEditUserModal = payload => ({type: OPEN_EDIT_USER_MODAL, payload});

// Action creator for opening the Delete User modal.
export const openDeleteUserModal = payload => ({type: OPEN_DELETE_USER_MODAL, payload});

// Function for parsing error gotten from server.
const parseError = error => {
    return error;
};

export const renderToUserEdit = user => {
    return {
        type: USER_TO_EDIT,
        payload: user,
    };
};