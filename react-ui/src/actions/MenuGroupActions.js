import {
   SHOW_LOADER, REMOVE_LOADER, GET_MENU_GROUP_LIST_SUCCESS, GET_MENU_GROUP_LIST_FAIL
} from '../types';
import MenuGroupService from '../services/MenuGroupService';


/**
 * UserRole Action - For adding a new user in the system.
 *
 * @param {Object} roleId
 * @param {Function} callBack
 */
export const getMenuGroupByRoleId = (roleId, callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroups = await MenuGroupService.findByRoleId(roleId);
        if (menuGroups) {
            if (callBack) {
                callBack();
            }
            dispatch({ type: GET_MENU_GROUP_LIST_SUCCESS, payload: menuGroups });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_MENU_GROUP_LIST_FAIL, payload: null });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};

/**
 * UserRole Action - For adding a new user in the system.
 *
 * @param {Object} roleId
 * @param {Function} callBack
 */
export const getMenuGroupList = (callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroups = await MenuGroupService.getAll();
        if (menuGroups) {
            if (callBack) {
                callBack();
            }
            dispatch({ type: GET_MENU_GROUP_LIST_SUCCESS, payload: menuGroups });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_MENU_GROUP_LIST_FAIL, payload: null });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};
