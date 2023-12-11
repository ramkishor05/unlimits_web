import {
   SHOW_LOADER, REMOVE_LOADER, GET_ROLE_MENU_ITEM_LIST_SUCCESS, GET_ROLE_MENU_ITEM_LIST_FAIL
} from '../types';
import RoleMenuItemService from '../services/RoleMenuItemService';


/**
 * UserRole Action - For adding a new user in the system.
 *
 * @param {Object} roleId
 * @param {Function} callBack
 */
export const getRoleMenuItemByRoleId = (roleId, callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroups = await RoleMenuItemService.findByRoleId(roleId);
        if (menuGroups) {
            if (callBack) {
                callBack();
            }
            dispatch({ type: GET_ROLE_MENU_ITEM_LIST_SUCCESS, payload: menuGroups });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_ROLE_MENU_ITEM_LIST_FAIL, payload: null });
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
export const getRoleMenuItemList = (callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroups = await RoleMenuItemService.getAll();
        if (menuGroups) {
            if (callBack) {
                callBack();
            }
            dispatch({ type: GET_ROLE_MENU_ITEM_LIST_SUCCESS, payload: menuGroups });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_ROLE_MENU_ITEM_LIST_FAIL, payload: null });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};
