import { 
   GET_ALL_CUST_CURRENCY_GROUP_SUCCESS,
   GET_ALL_CUST_CURRENCY_GROUP_FAIL,
   SHOW_CUST_CURRENCY_GROUP_LOADER,
   REMOVE_CUST_CURRENCY_GROUP_LOADER,
   ADD_CUST_CURRENCY_GROUP_SUCCESS,
   EDIT_CUST_CURRENCY_GROUP_SUCCESS,
   RENDER_CUST_CURRENCY_GROUP_TO_EDIT
} from '../../types';
import CustCurrencyGroupService from '../../services/CustCurrencyGroupService';

// Action creator for getting all items --<
export const getCustCurrencyGroupList = () => async dispatch => {
    dispatch({ type: SHOW_CUST_CURRENCY_GROUP_LOADER });
    console.log("coll")
    try {
        const globalCategoryGroupList = await CustCurrencyGroupService.getAll();
        console.log("coll")
        if (globalCategoryGroupList) {
            dispatch({ type: GET_ALL_CUST_CURRENCY_GROUP_SUCCESS, payload: globalCategoryGroupList });
            dispatch({ type: REMOVE_CUST_CURRENCY_GROUP_LOADER });
        }
    } catch(error) {
        dispatch({ type: GET_ALL_CUST_CURRENCY_GROUP_FAIL });
        dispatch({ type: REMOVE_CUST_CURRENCY_GROUP_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addCustCurrencyGroup = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_CURRENCY_GROUP_LOADER });

    try {
        const globalCategoryGroup = await CustCurrencyGroupService.add(data);

        if (globalCategoryGroup) {
            dispatch({ type: ADD_CUST_CURRENCY_GROUP_SUCCESS });
            dispatch({ type: REMOVE_CUST_CURRENCY_GROUP_LOADER });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_CUST_CURRENCY_GROUP_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderCustCurrencyGroupToEdit = item => {
    return {
        type: RENDER_CUST_CURRENCY_GROUP_TO_EDIT,
        payload: item,
    };
};

export const editCustCurrencyGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_CURRENCY_GROUP_LOADER });

    try {
        const globalCategoryGroup = await CustCurrencyGroupService.update(id, data);

        if (globalCategoryGroup) {
            dispatch({ type: EDIT_CUST_CURRENCY_GROUP_SUCCESS });
            dispatch({ type: REMOVE_CUST_CURRENCY_GROUP_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_CURRENCY_GROUP_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustCurrencyGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_CURRENCY_GROUP_LOADER });

    try {
        const globalCategoryGroup = await CustCurrencyGroupService.update(id, data);

        if (globalCategoryGroup) {
            dispatch({ type: EDIT_CUST_CURRENCY_GROUP_SUCCESS });
            dispatch({ type: REMOVE_CUST_CURRENCY_GROUP_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_CURRENCY_GROUP_LOADER });
        errorNotification && errorNotification();
    }
};

// Action creator for deleting football transaction from the system.
export const deleteCustCurrencyGroup = (id, refresh) => async dispatch => {
    try {
        const deleted_global_category_group = await CustCurrencyGroupService.delete(id);

        if (deleted_global_category_group) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};