import { 
   GET_ALL_CUST_CATEGERY_GROUP_SUCCESS,
   GET_ALL_CUST_CATEGERY_GROUP_FAIL,
   SHOW_CUST_CATEGERY_GROUP_LOADER,
   REMOVE_CUST_CATEGERY_GROUP_LOADER,
   ADD_CUST_CATEGERY_GROUP_SUCCESS,
   EDIT_CUST_CATEGERY_GROUP_SUCCESS,
   RENDER_CUST_CATEGERY_GROUP_TO_EDIT
} from '../../types';
import CustCategoryGroupService from '../../services/CustCategoryGroupService';

// Action creator for getting all items --<
export const getCustCategoryGroupList = () => async dispatch => {
    dispatch({ type: SHOW_CUST_CATEGERY_GROUP_LOADER });

    try {
        const custCategoryGroupList = await CustCategoryGroupService.getAll();

        if (custCategoryGroupList) {
            dispatch({ type: GET_ALL_CUST_CATEGERY_GROUP_SUCCESS, payload: custCategoryGroupList });
            dispatch({ type: REMOVE_CUST_CATEGERY_GROUP_LOADER });
        }
    } catch(error) {
        dispatch({ type: GET_ALL_CUST_CATEGERY_GROUP_FAIL });
        dispatch({ type: REMOVE_CUST_CATEGERY_GROUP_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addCustCategoryGroup = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_CATEGERY_GROUP_LOADER });

    try {
        const custCategoryGroup = await CustCategoryGroupService.add(data);

        if (custCategoryGroup) {
            dispatch({ type: ADD_CUST_CATEGERY_GROUP_SUCCESS });
            dispatch({ type: REMOVE_CUST_CATEGERY_GROUP_LOADER });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_CUST_CATEGERY_GROUP_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderCustCategoryGroupToEdit = item => {
    return {
        type: RENDER_CUST_CATEGERY_GROUP_TO_EDIT,
        payload: item,
    };
};

export const editCustCategoryGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_CATEGERY_GROUP_LOADER });

    try {
        const custCategoryGroup = await CustCategoryGroupService.update(id, data);

        if (custCategoryGroup) {
            dispatch({ type: EDIT_CUST_CATEGERY_GROUP_SUCCESS });
            dispatch({ type: REMOVE_CUST_CATEGERY_GROUP_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_CATEGERY_GROUP_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustCategoryGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_CATEGERY_GROUP_LOADER });

    try {
        const custCategoryGroup = await CustCategoryGroupService.update(id, data);

        if (custCategoryGroup) {
            dispatch({ type: EDIT_CUST_CATEGERY_GROUP_SUCCESS });
            dispatch({ type: REMOVE_CUST_CATEGERY_GROUP_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_CATEGERY_GROUP_LOADER });
        errorNotification && errorNotification();
    }
};

// Action creator for deleting football transaction from the system.
export const deleteCustCategoryGroup = (id, refresh) => async dispatch => {
    try {
        const deleted_cust_category_group = await CustCategoryGroupService.delete(id);

        if (deleted_cust_category_group) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};