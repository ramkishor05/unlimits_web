import { 
   GET_ALL_GLOBAL_CATEGERY_SUCCESS,
   GET_ALL_GLOBAL_CATEGERY_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_CATEGERY_SUCCESS,
   EDIT_GLOBAL_CATEGERY_SUCCESS,
   RENDER_GLOBAL_CATEGERY_TO_EDIT
} from '../../types';
import GlobalTagItemService from '../../services/GlobalTagItemService';

// Action creator for getting all items --<
export const getGlobalTagItemList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagItemList = await GlobalTagItemService.getAll();
        if (globalTagItemList) {
            dispatch({ type: GET_ALL_GLOBAL_CATEGERY_SUCCESS, payload: globalTagItemList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_CATEGERY_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalTagItem = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagItem = await GlobalTagItemService.add(data);

        if (globalTagItem) {
            dispatch({ type: ADD_GLOBAL_CATEGERY_SUCCESS });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderGlobalTagItemToEdit = item => {
    return {
        type: RENDER_GLOBAL_CATEGERY_TO_EDIT,
        payload: item,
    };
};

export const editGlobalTagItem = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagItem = await GlobalTagItemService.update(id, data);

        if (globalTagItem) {
            dispatch({ type: EDIT_GLOBAL_CATEGERY_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalTagItem = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagItem = await GlobalTagItemService.update(id, data);

        if (globalTagItem) {
            dispatch({ type: EDIT_GLOBAL_CATEGERY_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

// Action creator for deleting football transaction from the system.
export const deleteGlobalTagItem = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category = await GlobalTagItemService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
    }
};