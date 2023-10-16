import { 
   GET_ALL_GLOBAL_CATEGERY_SUCCESS,
   GET_ALL_GLOBAL_CATEGERY_FAIL,
   SHOW_GLOBAL_CATEGERY_LOADER,
   REMOVE_GLOBAL_CATEGERY_LOADER,
   ADD_GLOBAL_CATEGERY_SUCCESS,
   EDIT_GLOBAL_CATEGERY_SUCCESS,
   RENDER_GLOBAL_CATEGERY_TO_EDIT
} from '../types';
import GlobalCategoryService from '../services/GlobalCategoryService';

// Action creator for getting all items --<
export const getGlobalCategoryList = () => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_CATEGERY_LOADER });
    console.log("coll globalCategoryList 1 ")
    try {
        const globalCategoryList = await GlobalCategoryService.getAll();
        console.log("coll globalCategoryList 2")
        if (globalCategoryList) {
            dispatch({ type: GET_ALL_GLOBAL_CATEGERY_SUCCESS, payload: globalCategoryList });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        }
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_CATEGERY_FAIL });
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        //console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalCategory = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_CATEGERY_LOADER });

    try {
        const globalCategory = await GlobalCategoryService.add(data);

        if (globalCategory) {
            dispatch({ type: ADD_GLOBAL_CATEGERY_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderGlobalCategoryToEdit = item => {
    return {
        type: RENDER_GLOBAL_CATEGERY_TO_EDIT,
        payload: item,
    };
};

export const editGlobalCategory = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_CATEGERY_LOADER });

    try {
        const globalCategory = await GlobalCategoryService.update(id, data);

        if (globalCategory) {
            dispatch({ type: EDIT_GLOBAL_CATEGERY_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalCategory = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_CATEGERY_LOADER });

    try {
        const globalCategory = await GlobalCategoryService.update(id, data);

        if (globalCategory) {
            dispatch({ type: EDIT_GLOBAL_CATEGERY_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_LOADER });
        errorNotification && errorNotification();
    }
};

// Action creator for deleting football transaction from the system.
export const deleteGlobalCategory = (id, refresh) => async dispatch => {
    try {
        const deleted_global_category = await GlobalCategoryService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};