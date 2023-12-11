import {
   SHOW_LOADER, 
   REMOVE_LOADER, 
   GET_MENU_ITEM_LIST_SUCCESS, 
   GET_MENU_ITEM_LIST_FAIL,
   GET_USER_MENU_ITEM_LIST_SUCCESS,
   GET_USER_MENU_ITEM_LIST_FAIL,
   ADD_MENU_ITEM_SUCCESS,
   UPDATE_MENU_ITEM_SUCCESS,
   DELETE_MENU_ITEM_SUCCESS,
   GET_MENU_ITEM_SUCCESS
} from '../types';
import MenuItemService from '../services/MenuItemService';


/**
 * UserRole Action - For adding a new user in the system.
 *
 * @param {Object} roleId
 * @param {Function} callBack
 */
export const getMenuItemByRoleId = (roleId, callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const menuItems = await MenuItemService.findByRoleId(roleId);
        if (menuItems) {
            if (callBack) {
                callBack();
            }
            dispatch({ type: GET_MENU_ITEM_LIST_SUCCESS, payload: menuItems });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_MENU_ITEM_LIST_FAIL, payload: null });
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
export const getMenuItemList = (callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const menuItems = await MenuItemService.getAll();
        if (menuItems) {
            if (callBack) {
                callBack();
            }
            dispatch({ type: GET_MENU_ITEM_LIST_SUCCESS, payload: menuItems });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_MENU_ITEM_LIST_FAIL, payload: null });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addMenuItem --<
export const addMenuItem = (data, refreshMenuItemList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const menuItem = await MenuItemService.add(data);

        if (menuItem) {
            dispatch({ type: ADD_MENU_ITEM_SUCCESS });
        }
        refreshMenuItemList && refreshMenuItemList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addMenuItem --<
export const editMenuItem = (id,data, refreshMenuItemList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const menuItem = await MenuItemService.update(id, data);

        if (menuItem) {
            dispatch({ type: UPDATE_MENU_ITEM_SUCCESS });
        }
        refreshMenuItemList && refreshMenuItemList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addMenuItem --<
export const deleteMenuItem = (id, refreshMenuItemList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const menuItem = await MenuItemService.delete(id);

        if (menuItem) {
            dispatch({ type: DELETE_MENU_ITEM_SUCCESS });
        }
        refreshMenuItemList && refreshMenuItemList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addMenuItem --<
export const getMenuItem = (id, refreshMenuItemList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const menuItem = await MenuItemService.delete(id);

        if (menuItem) {
            dispatch({ type: GET_MENU_ITEM_SUCCESS });
        }
        refreshMenuItemList && refreshMenuItemList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

