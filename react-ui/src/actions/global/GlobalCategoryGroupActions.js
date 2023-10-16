import { 
   GET_ALL_GLOBAL_CATEGERY_GROUP_SUCCESS,
   GET_ALL_GLOBAL_CATEGERY_GROUP_FAIL,
   SHOW_GLOBAL_CATEGERY_GROUP_LOADER,
   REMOVE_GLOBAL_CATEGERY_GROUP_LOADER,
   ADD_GLOBAL_CATEGERY_GROUP_SUCCESS,
   EDIT_GLOBAL_CATEGERY_GROUP_SUCCESS,
   RENDER_GLOBAL_CATEGERY_GROUP_TO_EDIT
} from '../../types/Global/GlobalCategoryGroupTypes';
import GlobalCategoryGroupService from '../../services/GlobalCategoryGroupService';

// Action creator for getting all items --<
export const getGlobalCategoryGroupList = () => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_CATEGERY_GROUP_LOADER });
    console.log("coll")
    try {
        const globalCategoryGroupList = await GlobalCategoryGroupService.getAll();
        console.log("coll")
        if (globalCategoryGroupList) {
            dispatch({ type: GET_ALL_GLOBAL_CATEGERY_GROUP_SUCCESS, payload: globalCategoryGroupList });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_GROUP_LOADER });
        }
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_CATEGERY_GROUP_FAIL });
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_GROUP_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalCategoryGroup = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_CATEGERY_GROUP_LOADER });

    try {
        const globalCategoryGroup = await GlobalCategoryGroupService.add(data);

        if (globalCategoryGroup) {
            dispatch({ type: ADD_GLOBAL_CATEGERY_GROUP_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_GROUP_LOADER });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_GROUP_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderGlobalCategoryGroupToEdit = item => {
    return {
        type: RENDER_GLOBAL_CATEGERY_GROUP_TO_EDIT,
        payload: item,
    };
};

export const editGlobalCategoryGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_CATEGERY_GROUP_LOADER });

    try {
        const globalCategoryGroup = await GlobalCategoryGroupService.update(id, data);

        if (globalCategoryGroup) {
            dispatch({ type: EDIT_GLOBAL_CATEGERY_GROUP_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_GROUP_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_GROUP_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalCategoryGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_CATEGERY_GROUP_LOADER });

    try {
        const globalCategoryGroup = await GlobalCategoryGroupService.update(id, data);

        if (globalCategoryGroup) {
            dispatch({ type: EDIT_GLOBAL_CATEGERY_GROUP_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_CATEGERY_GROUP_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_CATEGERY_GROUP_LOADER });
        errorNotification && errorNotification();
    }
};

// Action creator for deleting football transaction from the system.
export const deleteGlobalCategoryGroup = (id, refresh) => async dispatch => {
    try {
        const deleted_global_category_group = await GlobalCategoryGroupService.delete(id);

        if (deleted_global_category_group) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};