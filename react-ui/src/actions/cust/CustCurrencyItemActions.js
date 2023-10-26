import { 
   GET_ALL_CUST_CURRENCY_ITEM_SUCCESS,
   GET_ALL_CUST_CURRENCY_ITEM_FAIL,
   SHOW_CUST_CURRENCY_ITEM_LOADER,
   REMOVE_CUST_CURRENCY_ITEM_LOADER,
   ADD_CUST_CURRENCY_ITEM_SUCCESS,
   EDIT_CUST_CURRENCY_ITEM_SUCCESS,
   RENDER_CUST_CURRENCY_ITEM_TO_EDIT
} from '../../types';
import CustCurrencyItemService from '../../services/CustCurrencyItemService';

// Action creator for getting all items --<
export const getCustCurrencyItemList = () => async dispatch => {
    dispatch({ type: SHOW_CUST_CURRENCY_ITEM_LOADER });
    try {
        const globalCategoryList = await CustCurrencyItemService.getAll();
        if (globalCategoryList) {
            dispatch({ type: GET_ALL_CUST_CURRENCY_ITEM_SUCCESS, payload: globalCategoryList });
            dispatch({ type: REMOVE_CUST_CURRENCY_ITEM_LOADER });
        }
    } catch(error) {
        dispatch({ type: GET_ALL_CUST_CURRENCY_ITEM_FAIL });
        dispatch({ type: REMOVE_CUST_CURRENCY_ITEM_LOADER });
        //console.log(error);
    }
};

// Action creator for adding item --<
export const addCustCurrencyItem = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_CURRENCY_ITEM_LOADER });

    try {
        const globalCategory = await CustCurrencyItemService.add(data);

        if (globalCategory) {
            dispatch({ type: ADD_CUST_CURRENCY_ITEM_SUCCESS });
            dispatch({ type: REMOVE_CUST_CURRENCY_ITEM_LOADER });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_CUST_CURRENCY_ITEM_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderCustCurrencyItemToEdit = item => {
    return {
        type: RENDER_CUST_CURRENCY_ITEM_TO_EDIT,
        payload: item,
    };
};

export const editCustCurrencyItem = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_CURRENCY_ITEM_LOADER });

    try {
        const globalCategory = await CustCurrencyItemService.update(id, data);

        if (globalCategory) {
            dispatch({ type: EDIT_CUST_CURRENCY_ITEM_SUCCESS });
            dispatch({ type: REMOVE_CUST_CURRENCY_ITEM_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_CURRENCY_ITEM_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustCurrencyItem = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_CURRENCY_ITEM_LOADER });

    try {
        const globalCategory = await CustCurrencyItemService.update(id, data);

        if (globalCategory) {
            dispatch({ type: EDIT_CUST_CURRENCY_ITEM_SUCCESS });
            dispatch({ type: REMOVE_CUST_CURRENCY_ITEM_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_CURRENCY_ITEM_LOADER });
        errorNotification && errorNotification();
    }
};

// Action creator for deleting football transaction from the system.
export const deleteCustCurrencyItem = (id, refresh) => async dispatch => {
    try {
        const deleted_global_category = await CustCurrencyItemService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};