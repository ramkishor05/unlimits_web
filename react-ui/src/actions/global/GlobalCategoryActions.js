import { 
   GET_ALL_GLOBAL_CATEGERY_SUCCESS,
   GET_ALL_GLOBAL_CATEGERY_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_CATEGERY_SUCCESS,
   EDIT_GLOBAL_CATEGERY_SUCCESS,
   RENDER_GLOBAL_CATEGERY_TO_EDIT
} from '../../types';
import GlobalCategoryService from '../../services/GlobalCategoryService';

// Action creator for getting all items --<
export const getGlobalCategoryList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategoryList = await GlobalCategoryService.getAll();
        if (globalCategoryList) {
            dispatch({ type: GET_ALL_GLOBAL_CATEGERY_SUCCESS, payload: globalCategoryList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_CATEGERY_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};


// Action creator for getting all items --<
export const getGlobalCategoryPageList = (pageNumber,pageCount) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategoryGroupList = await GlobalCategoryService.getPageList(pageNumber,pageCount);
        if (globalCategoryGroupList) {
            dispatch({ type: GET_ALL_GLOBAL_CATEGERY_GROUP_SUCCESS, payload: globalCategoryGroupList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_CATEGERY_GROUP_FAIL });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for adding item --<
export const addGlobalCategory = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategory = await GlobalCategoryService.add(data);

        if (globalCategory) {
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

export const renderGlobalCategoryToEdit = item => {
    return {
        type: RENDER_GLOBAL_CATEGERY_TO_EDIT,
        payload: item,
    };
};

export const editGlobalCategory = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategory = await GlobalCategoryService.update(id, data);

        if (globalCategory) {
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

export const updateGlobalCategory = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategory = await GlobalCategoryService.update(id, data);

        if (globalCategory) {
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
export const deleteGlobalCategory = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category = await GlobalCategoryService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
    }
};